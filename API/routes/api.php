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

//get modules
Route::get('modules','ModuleController@index');
//create eleve module
Route::post('module_eleves','ModuleController@store_module_eleve');
//create phase
Route::post('phase','PhaseController@store');
//get phase
Route::get('phases','PhaseController@index');
//create eleve
Route::post('eleve','EleveController@store');
//get all eleves
Route::get('eleves','EleveController@index');

//get all eleves
Route::get('eleves_seulement','EleveController@seulement');
//get eleve
Route::get('eleve/{id}','EleveController@show');

//create ecole
Route::post('ecole','EcoleController@store');
//get ecole
Route::get('ecoles','EcoleController@index');

//get personne responsable
Route::get('personnes','PersonneResponsableController@index');
//get ecole
Route::post('personne','PersonneResponsableController@store');
//create attestation
Route::post('attestation','AttestationController@store');

//get attestation
Route::get('attestations','AttestationController@index');




