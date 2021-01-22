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
    Route::get('refus', 'AuthController@refus');
    Route::post('authenticate', 'AuthController@login');
    Route::post('register', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});
 //export registre
 Route::post('exporter_registre','EleveController@export')->middleware('auth:api');
//get users
Route::get('users','AuthController@users')->middleware('auth:api');
//create module
Route::post('module','ModuleController@store')->middleware('auth:api');

//get modules
Route::get('modules','ModuleController@index')->middleware('auth:api');
//get sortie
Route::get('sorties','ModuleController@driving');
Route::post('evenement','EleveController@saveEvent');
//create eleve module
Route::post('module_eleves','ModuleController@store_module_eleve')->middleware('auth:api');
//create phase
Route::post('phase','PhaseController@store')->middleware('auth:api');
//get phase
Route::get('phases','PhaseController@index')->middleware('auth:api');
//create eleve
Route::post('eleve','EleveController@store')->middleware('auth:api');
Route::post('inscrire','EleveController@store');
//get all eleves
Route::get('eleves','EleveController@index')->middleware('auth:api');

//get all eleves
Route::get('eleves/{limit}','EleveController@partialStudents')->middleware('auth:api');

//get all eleves
Route::get('eleves_seulement','EleveController@seulement')->middleware('auth:api');
//get eleve
Route::get('eleve/{id}','EleveController@show')->middleware('auth:api');
//get eleve
Route::delete('eleve/{id}','EleveController@destroy')->middleware('auth:api');
//ger search eleves
Route::get('recherche/{term}','EleveController@search')->middleware('auth:api');
//get expire eleves
Route::get('expiration','EleveController@notify')->middleware('auth:api');
//print payment
Route::post('printPayment','EleveController@printPayment')->middleware('auth:api');
//print exam
Route::post('printExam','EleveController@printExam')->middleware('auth:api');
//post contrat
Route::post('printContrat','EleveController@printContrat')->middleware('auth:api');
//post attestation
Route::post('printAttestation','EleveController@printAttestation')->middleware('auth:api');
 
//create ecole
Route::post('ecole','EcoleController@store')->middleware('auth:api');
//get ecole
Route::get('ecoles','EcoleController@index')->middleware('auth:api');

//create parametre contrat
Route::post('parametre/contrat','ParametreContratController@store')->middleware('auth:api');
//get parametre contrat
Route::get('parametres/contrat','ParametreContratController@index')->middleware('auth:api');

//get personne responsable
Route::get('personnes','PersonneResponsableController@index')->middleware('auth:api');
//get ecole
Route::post('personne','PersonneResponsableController@store')->middleware('auth:api');
//create attestation
Route::post('attestation','AttestationController@store')->middleware('auth:api');
//create attestation
Route::get('attestation/{id}','AttestationController@show')->middleware('auth:api');

//get attestation
Route::get('attestations','AttestationController@index')->middleware('auth:api');
//store payement
Route::post('payer','PayementController@store')->middleware('auth:api');
//get payement
Route::get('payements/{id}','PayementController@index')->middleware('auth:api');
//get payement
Route::post('payements','PayementController@totalPayement')->middleware('auth:api');

//post test
Route::post('pass','EleveController@pass')->middleware('auth:api');
//post test
Route::get('obtenirExamen/{id}','EleveController@getTest')->middleware('auth:api');
//post test
Route::get('obtenirExamenById/{id}','EleveController@getTestById')->middleware('auth:api');
//post test
Route::post('enregistrerExamen','EleveController@updateTest')->middleware('auth:api');
//get test
Route::get('examen/{numero}','ExamenController@show');
//post test
Route::post('examen','ExamenController@store');




