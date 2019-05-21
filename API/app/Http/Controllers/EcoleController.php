<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\EcoleResource;
use App\Ecole;
use App\AdresseEcole;

class EcoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $ecole = Ecole::with('adresse')->first();
        return new EcoleResource($ecole);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $adresse = null;
            if($request->id){
                $ecole = Ecole::find($request->id);
                $adresse = Ecole::find($request->id)->adresse;
            }else{
                 $ecole= new Ecole;
            }
            $ecole->nom = $request->nom;
            $ecole->numero = $request->numero;
            $ecole->raison_social =  $request->raison_social;
            $ecole->email =  $request->email;

            if(!$adresse){
                $adresse = new AdresseEcole;
            }
            
            $adresse->numero = $request->adresse['numero'];
            $adresse->rue = $request->adresse['rue'];
            $adresse->appartement = $request->adresse['appartement'];
            $adresse->municipalite = $request->adresse['municipalite'];
            $adresse->province = $request->adresse['province'];
            $adresse->code_postal = $request->adresse['code_postal'];

            $ecole->save();
            $ecole->adresse()->save($adresse);

            $ecole = Ecole::with('adresse')->first();
            return new EcoleResource($ecole);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
