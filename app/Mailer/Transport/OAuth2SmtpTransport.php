<?php

namespace App\Mailer\Transport;

use Symfony\Component\Mailer\Transport\Smtp\EsmtpTransport;
use Symfony\Component\Mailer\Exception\TransportException;

class OAuth2SmtpTransport extends EsmtpTransport
{
  /**
   * The constructor accepts the usual SMTP parameters.
   * Note that we pass an empty password since we’re using OAuth2.
   */
  public function __construct(
    protected string $host,
    protected string $username,
    protected string $accessToken,
    protected int $port = 25,
    protected ?string $encryption = null,
    protected float $timeout = 30
  )
  {
    parent::__construct($host, $port, $encryption, authenticators: []);
  }

  /**
   * Allow updating the access token (for example, after a refresh).
   */
  public function setAccessToken(string $accessToken): void
  {
    $this->accessToken = $accessToken;
  }

  /**
   * Override the authentication method to perform XOAUTH2.
   *
   * This method is invoked during the SMTP handshake.
   */
  protected function handleAuth(): void
  {
    if (! $this->accessToken) {
      throw new TransportException('No OAuth2 access token provided.');
    }

    $accessTokenSubStr = substr($this->accessToken, 0, 50);

    // Build the XOAUTH2 authentication string.
    // Format: base64("user=" {user} "\x01auth=Bearer " {access_token} "\x01\x01")
    $authString = base64_encode("user={$this->username}\x01auth=Bearer {$accessTokenSubStr}\x01\x01");

    // Send the AUTH XOAUTH2 command.
    $this->executeCommand(sprintf("AUTH XOAUTH2 %s", $authString), [235]);
  }

  public function __toString(): string
  {
    return 'smtpoauth2';
  }
}
