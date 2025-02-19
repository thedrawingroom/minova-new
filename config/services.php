<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'azure' => [
        'client_id' => env('AZURE_CLIENT_ID'),
        'client_secret' => env('AZURE_CLIENT_SECRET'),
        'url_authorize' => env('AZURE_URL_AUTHORIZE', 'https://login.microsoftonline.com/9cbf82cc-0d11-4d72-8073-ef83a037a953/oauth2/v2.0/authorize'),
        'url_access_token' => env('AZURE_URL_ACCESS_TOKEN', 'https://login.microsoftonline.com/9cbf82cc-0d11-4d72-8073-ef83a037a953/oauth2/v2.0/token'),
        'url_resource_owner_details' => env('AZURE_URL_RESOURCE_OWNER_DETAILS', ''),
        'scope' => env('AZURE_SCOPE', 'https://outlook.office365.com/.default')
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'fontawesome' => [
        'key' => env('FONTAWESOME_PACKAGE_TOKEN'),
    ]

];
