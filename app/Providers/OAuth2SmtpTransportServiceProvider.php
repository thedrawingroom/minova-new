<?php

namespace App\Providers;

use App\Mailer\Transport\OAuth2SmtpTransport;
use Exception;
use Illuminate\Support\ServiceProvider;
use League\OAuth2\Client\Provider\GenericProvider;
use League\OAuth2\Client\Token\AccessToken;
use RuntimeException;
use Symfony\Component\Mailer\Mailer;
use Throwable;

class OAuth2SmtpTransportServiceProvider extends ServiceProvider
{
    public function register(): void
    {

    }

    public function boot(): void {
      $this->app->extend('mailer', function ($mailer, $app) {
        $config = config('mail.mailers.smtp');

        // Retrieve an access token from Azure AD.
        $accessToken = $this->getAzureAccessToken();

        // Create an instance of our custom transport.
        $transport = new OAuth2SmtpTransport(
          $config['host'],
          $config['port'],
          $config['username'],
          $accessToken->getToken(),
          $config['encryption']
        );

        // Create a new Symfony Mailer instance with our custom transport.
        $symfonyMailer = new Mailer($transport);
        // Assume your mailer manager supports swapping the underlying Symfony Mailer.
        $mailer->setSymfonyMailer($symfonyMailer);

        return $mailer;
      });
    }

  /**
   * Retrieve an OAuth2 access token from Azure AD.
   *
   * Adjust parameters as needed for your scenario (client credentials or refresh token flow).
   */
    public function getAzureAccessToken(): ?AccessToken {
      $provider = new GenericProvider([
        'clientId' => config('services.azure.client_id'),
        'clientSecret' => config('services.azure.client_secret'),
        'urlAuthorize' => config('services.azure.url_authorize'),
        'urlAccessToken' => config( 'services.azure.url_access_token'),
        'urlResourceOwnerDetails' => config('services.azure.url_resource_owner_details'),
        'scope' => config('services.azure.scope')
      ]);

      try {
        $accessToken = $provider->getAccessToken('client_credentials');

        if (!$accessToken) {
          throw new RuntimeException('Unable to retrieve OAuth2 access token.');
        }

        return $accessToken;
      } catch (Throwable $e) {
        report($e);
      }

      return null;
    }
}
