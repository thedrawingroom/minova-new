<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class);

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);
