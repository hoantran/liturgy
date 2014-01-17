<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// Route::get('/', function()
// {
// 	return View::make('hello');
// });

Route::get('/', function()
{
	// return View::make('liturgy');
	return View::make('marionette');
});

Route::get('auto', function()
{
	return View::make('auto');
});

Route::resource('/test-js/liturgies', 'LiturgyController');
Route::resource('liturgies', 'LiturgyController');
Route::resource('song', 'SongController');
