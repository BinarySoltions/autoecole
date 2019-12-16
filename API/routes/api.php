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

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('authenticate', 'AuthController@login');
    Route::post('register', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});
//get users
Route::get('users','AuthController@users');

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
//get eleve
Route::delete('eleve/{id}','EleveController@destroy');
//export registre
Route::post('exporter_registre','EleveController@export');

//create ecole
Route::post('ecole','EcoleController@store');
//get ecole
Route::get('ecoles','EcoleController@index');

//create parametre contrat
Route::post('parametre/contrat','ParametreContratController@store');
//get parametre contrat
Route::get('parametres/contrat','ParametreContratController@index');

//get personne responsable
Route::get('personnes','PersonneResponsableController@index');
//get ecole
Route::post('personne','PersonneResponsableController@store');
//create attestation
Route::post('attestation','AttestationController@store');
//create attestation
Route::get('attestation/{id}','AttestationController@show');

//get attestation
Route::get('attestations','AttestationController@index');
//store payement
Route::post('payer','PayementController@store');
//get payement
Route::get('payements/{id}','PayementController@index');
//get payement
Route::post('payements','PayementController@totalPayement');




