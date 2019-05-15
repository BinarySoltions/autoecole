<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\EleveResource;
use App\Eleve;
use App\Adresse;
use App\Coordonnee;
use App\Module;

class EleveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $eleves = Eleve::with('adresse','coordonnee','modules')
                ->get();
        return EleveResource::Collection($eleves);
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
        $eleve = new Eleve;
       
        //save eleve
        $eleve->prenom = $request->prenom;
        $eleve->nom = $request->nom;
        $eleve->numero_contrat = $request->numero_contrat;
        
        $adresse = new Adresse;
        $adresse->numero = $request->adresse['numero'];
        $adresse->rue = $request->adresse['rue'];
        $adresse->appartement = $request->adresse['appartement'];
        $adresse->municipalite = $request->adresse['municipalite'];
        $adresse->province = $request->adresse['province'];
        $adresse->code_postal = $request->adresse['code_postal'];

        $coordonnee = new Coordonnee;
        $coordonnee->telephone = $request->coordonnee['telephone'];
        $coordonnee->telephone_autre = $request->coordonnee['telephone_autre'];
        
       //module eleve
       $modules = Module::orderBy('numero','asc')->get('id');
      
       //save all
       $eleve->save();
       $eleve->adresse()->save($adresse);
       $eleve->coordonnee()->save($coordonnee);
       $eleve->modules()->sync($modules,false);
       
       return $eleve;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $eleves = Eleve::with('adresse','coordonnee','modules')
                ->find($id);
        return  new EleveResource($eleves); 
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
