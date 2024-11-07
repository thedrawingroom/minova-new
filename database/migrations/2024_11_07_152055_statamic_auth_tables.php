<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class StatamicAuthTables extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Add a new column for UUID
            $table->uuid('uuid')->nullable();
        });

        // Fill the new UUID column with unique values
        DB::table('users')->update(['uuid' => DB::raw('uuid_generate_v4()')]);

        Schema::table('users', function (Blueprint $table) {
            // Make UUID the primary key and drop the old id column
            $table->dropPrimary();  // Drop the existing primary key
            $table->dropColumn('id');  // Drop the existing id column
            $table->renameColumn('uuid', 'id');  // Rename the uuid column to id
        });

        Schema::table('users', function (Blueprint $table) {
            // Set the renamed 'id' column as the primary key
            $table->primary('id');

            $table->boolean('super')->default(false);
            $table->string('avatar')->nullable();
            $table->json('preferences')->nullable();
            $table->timestamp('last_login')->nullable();
            $table->string('password')->nullable()->change();
        });

        Schema::create('role_user', function (Blueprint $table) {
            $table->id('id');
            $table->uuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('role_id');
        });

        Schema::create('group_user', function (Blueprint $table) {
            $table->id('id');
            $table->uuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('group_id');
        });

        Schema::create('password_activation_tokens', function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['super', 'avatar', 'preferences', 'last_login']);
            $table->string('password')->nullable(false)->change();
        });

        Schema::dropIfExists('role_user');
        Schema::dropIfExists('group_user');
        Schema::dropIfExists('password_activation_tokens');
    }
}
