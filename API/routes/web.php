<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome',['title'=>"École de conduite Pconduite -
    La passion de former des conducteurs"]);
});

Route::get('/tarifs', function () {
    return view('tarifs',['title'=>"Tarifs - École de conduite Pconduite"]);
});

Route::get('/formation', function () {
    return view('formation',['title'=>"Formation - École de conduite Pconduite"]);
});

Route::get('/contactez-nous', function () {
    return view('contactezNous',['title'=>"Contactez-nous - École de conduite Pconduite"]);
});
Route::get('/liens-utiles', function () {
    return view('lienUtile',['title'=>"Liens utiles - École de conduite Pconduite"]);
});
Route::get('/perfectionnement', function () {
    return view('perfectionnement',['title'=>"Perfectionnement - École de conduite Pconduite"]);
});
//get attestation
Route::get('attestation','AttestationController@index');