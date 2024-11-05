@servers(['web' => $user.'@'.$host, 'localhost' => '127.0.0.1'])

@setup
    // Sanity checks
    if (empty($host)) {
        exit('ERROR: $host var empty or not defined');
    }
    if (empty($user)) {
        exit('ERROR: $user var empty or not defined');
    }
    if (empty($path)) {
        exit('ERROR: $path var empty or not defined');
    }
    if (empty($build)) {
        exit('ERROR: $build var empty or not defined');
    }
    if (empty($commit)) {
        exit('ERROR: $commit var empty or not defined');
    }

    if (file_exists($path) || is_writable($path)) {
        exit("ERROR: cannot access $path");
    }

    // Ensure given $path is a potential web directory (/home/* or /var/www/*)
    if (!(preg_match("/(\/home\/|\/var\/www\/)/i", $path) === 1)) {
        exit('ERROR: $path provided doesn\'t look like a web directory path?');
    }

    $current_release_dir = $path . '/current';
    $releases_dir = $path . '/releases';
    $new_release_dir = $releases_dir . '/' . $build . '_' . $commit;
    $shared_dir = $path . '/shared';

    $remote = $user . '@' . $host . ':' . $new_release_dir;

    // Command or path to invoke PHP
    $php = empty($php) ? 'php' : $php;
@endsetup

@story('deploy')
    assets
    create_release_dir
    rsync
    manifest_file
    setup_symlinks
    autodump
    verify_install
    activate_release
    migrate
    optimise
    restart_queues
    cleanup
    set_permissions
@endstory

@task('debug', ['on' => 'localhost'])
    ls -la {{ $dir }}
@endtask

@task('assets', ['on' => 'localhost'])
    echo "* Publishing assets *"
    {{ $php }} artisan vendor:publish --tag=laravel-assets --ansi --force
@endtask

@task('create_release_dir', ['on' => 'web'])
    if [ ! -d {{ $releases_dir }} ]; then
        echo "* Creating releases directory *"
        sudo -S mkdir -p {{ $releases_dir }}
    fi
@endtask

@task('rsync', ['on' => 'localhost'])
    echo "* Deploying code from {{ $dir }} to {{ $remote }} *"
    # https://explainshell.com/explain?cmd=rsync+-zrSlh+--exclude-from%3Ddeployment-exclude-list.txt+.%2F.+%7B%7B+%24remote+%7D%7D
    rsync -zrSlh --stats --exclude-from=.deployignore --rsync-path="sudo rsync" {{ $dir }}/ {{ $remote }}
@endtask

@task('manifest_file', ['on' => 'web'])
    echo "* Writing deploy manifest file *"
    sudo -S sh -c 'printf "{\"build\":\""{{ $build }}"\", \"commit\":\""{{ $commit }}"\", \"branch\":\""{{ $branch }}"\"}" > {{ $new_release_dir }}/deploy-manifest.json'
@endtask

@task('setup_symlinks', ['on' => 'web'])
    if [ ! -d {{ $shared_dir }}/storage ]; then
        echo "* Creating shared storage directory structure *"
        sudo -S mkdir -p {{ $shared_dir }}/storage/app/public
        sudo -S mkdir -p {{ $shared_dir }}/storage/framework/cache/data
        sudo -S mkdir -p {{ $shared_dir }}/storage/framework/sessions
        sudo -S mkdir -p {{ $shared_dir }}/storage/framework/testing
        sudo -S mkdir -p {{ $shared_dir }}/storage/framework/views
        sudo -S mkdir -p {{ $shared_dir }}/storage/logs
    fi

    echo "* Linking .env file to new release dir ({{ $shared_dir }}/.env -> {{ $new_release_dir }}/.env) *"
    sudo -S ln -nfs {{ $shared_dir }}/.env {{ $new_release_dir }}/.env

    if [ -f {{ $new_release_dir }}/storage ]; then
        echo "* Moving existing storage dir *"
        sudo -S mv {{ $new_release_dir }}/storage {{ $new_release_dir }}/storage.orig 2>/dev/null
    fi

    echo "* Linking storage directory to new release dir ({{ $shared_dir }}/storage -> {{ $new_release_dir }}/storage) *"
    sudo -S ln -nfs {{ $shared_dir }}/storage {{ $new_release_dir }}/storage
@endtask

@task('autodump')
    cd {{ $new_release_dir }}
    sudo -S composer run-script post-autoload-dump
@endtask

@task('verify_install', ['on' => 'web'])
    echo "* Verifying install ({{ $new_release_dir }}) *"
    cd {{ $new_release_dir }}
    sudo -S {{ $php }} -r "file_put_contents('./config/statamic/eloquent-driver.php', str_replace('\'driver\' => \'file\'', '\'driver\' => \'eloquent\'', file_get_contents('./config/statamic/eloquent-driver.php')));"
    sudo -S {{ $php }} artisan --version
@endtask

@task('activate_release', ['on' => 'web'])
    echo "* Activating new release ({{ $new_release_dir }} -> {{ $current_release_dir }}) *"
    sudo -S ln -nfs {{ $new_release_dir }} {{ $current_release_dir }}
@endtask

@task('migrate', ['on' => 'web'])
    echo '* Running migrations *'
    cd {{ $new_release_dir }}
    sudo -S {{ $php }} artisan migrate --force
@endtask

@task('optimise', ['on' => 'web'])
    echo '* Clearing cache and optimising *'
    cd {{ $new_release_dir }}

    sudo -S {{ $php }} artisan optimize:clear
    sudo -S {{ $php }} artisan optimize

    echo '* Reloading php-fpm *'
    sudo -S service php8.3-fpm reload

    echo '* Reloading apache2 *'
    sudo -S service apache2 reload
@endtask

@task('restart_queues', ['on' => 'web'])
    echo '* Restarting queues *'
    cd {{ $new_release_dir }}

    sudo -S {{ $php }} artisan queue:restart
@endtask

@task('cleanup', ['on' => 'web'])
    echo "* Executing cleanup command in {{ $releases_dir }} *"
    sudo -S ls -dt {{ $releases_dir }}/*/ | sudo -S tail -n +6 | sudo -S xargs rm -rf
@endtask

@task('set_permissions', ['on' => 'web'])
    echo "* Executing set permissions command in {{ $path }} *"
    sudo -S chown -R www-data:www-data {{ $path }}
@endtask
