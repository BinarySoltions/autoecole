<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//create module
Route::post('module','ModuleController@store');

//create phase
Route::post('phase','PhaseController@store');

//create eleve
Route::post('eleve','EleveController@store');
//get all eleves
Route::get('eleves','EleveController@index');
//get eleve
Route::get('eleve/{id}','EleveController@show');

//create ecole
Route::post('ecole','EcoleController@store');

//create attestation
Route::post('attestation','AttestationController@store');

//get attestation
Route::get('attestation','AttestationController@index');




