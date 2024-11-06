<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Site;

class HomeController extends Controller
{
  /**
   * Handle the incoming request.
   */
  public function __invoke(Request $request)
  {
    /**
     * TODO: Determine solution to use for home redirect
     *
     * Currently, this gets the home URL for the Americas
     * site and performs a 301 redirect to it.
     *
     * The commented-out code below is a potential way
     * to get the handle of the site the user has
     * previously selected, and redirect to it instead.
     *
     * The old site does not have any checks to do a
     * conditional redirect, so we should be cautious
     * about introducing this based on potential impact
     * to SEO.
     */
    /*
    $sites = Site::all();

    $site = $sites->get($request->cookie('site')) ?? $sites->get('americas');
    */

    $site = Site::get('americas');

    return response()->redirectTo($site->url(), 301);
  }
}