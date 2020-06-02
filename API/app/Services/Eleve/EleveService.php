<?php

namespace App\Services\Eleve;

use Illuminate\Http\Request;
use App\Http\Requests;

use App\Http\Resources\EleveResource;
use App\Eleve;
use App\Adresse;
use App\Coordonnee;
use App\Module;

class EleveService implements IEleveService
{

    public function sauvegarderEleve(Request $requete){

        if($requete->id != 0){
           return $this->modifierEleve($requete);
        }else{
            return $this->ajouterEleve($requete);
        }
    }

    public function ajouterEleve($request){
        $eleve = new Eleve;
        
        //save eleve
        $eleve->prenom = $request->prenom;
        $eleve->nom = $request->nom;
        $eleve->numero_contrat = $request->numero_contrat;
        if($request->date_inscription)
            $eleve->date_inscription = date('Y-m-d', strtotime($request->date_inscription));
        if($request->date_naissance)
            $eleve->date_naissance = date('Y-m-d', strtotime($request->date_naissance));
        if($request->date_contrat){
            $eleve->date_contrat = date('Y-m-d', strtotime($request->date_contrat));
            $eleve->date_fin_contrat = date('Y-m-d', strtotime("+18 months",strtotime($eleve->date_contrat)));
        }
        if($request->date_fin_permis)
            $eleve->date_fin_permis = date('Y-m-d', strtotime($request->date_fin_permis));
        $eleve->email = $request->email;
        $eleve->numero_permis = $request->numero_permis;
        $eleve->frais_inscription = $request->frais_inscription;
        
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
       
       $eleves = Eleve::with('adresse','coordonnee','modules.phase')
       ->find($eleve->id);
       return  new EleveResource($eleves); 
    }
    public function modifierEleve($request){

        $eleve = Eleve::find($request->id);
        $adresse = Eleve::find($request->id)->adresse;
        $coordonnee = Eleve::find($request->id)->coordonnee;
        //save eleve
        $eleve->prenom = $request->prenom;
        $eleve->nom = $request->nom;
        $eleve->numero_contrat = $request->numero_contrat;
        if($request->date_inscription)
            $eleve->date_inscription = date('Y-m-d', strtotime($request->date_inscription));
        if($request->date_naissance)
            $eleve->date_naissance = date('Y-m-d', strtotime($request->date_naissance));
        if($request->date_contrat){
            $eleve->date_contrat = date('Y-m-d', strtotime($request->date_contrat));
            $eleve->date_fin_contrat = date('Y-m-d', strtotime("+18 months",strtotime($eleve->date_contrat)));
        }
        if($request->date_fin_permis)
            $eleve->date_fin_permis = date('Y-m-d', strtotime($request->date_fin_permis));
        $eleve->email = $request->email;
        $eleve->numero_permis = $request->numero_permis;
        $eleve->frais_inscription = $request->frais_inscription;
        
        $adresse->numero = $request->adresse['numero'];
        $adresse->rue = $request->adresse['rue'];
        $adresse->appartement = $request->adresse['appartement'];
        $adresse->municipalite = $request->adresse['municipalite'];
        $adresse->province = $request->adresse['province'];
        $adresse->code_postal = $request->adresse['code_postal'];

        $coordonnee->telephone = $request->coordonnee['telephone'];
        $coordonnee->telephone_autre = $request->coordonnee['telephone_autre'];
        
       //module eleve
       //$modules = Module::orderBy('numero','asc')->get('id');
     
       //save all
       $eleve->save();
       $eleve->adresse()->save($adresse);
       $eleve->coordonnee()->save($coordonnee);
       //$eleve->modules()->sync($modules,false);
       
       $eleves = Eleve::with('adresse','coordonnee','modules.phase')
       ->find($eleve->id);
       return  new EleveResource($eleves); 
    }

    public function obtenirListeEleves(){
        $dateJour = date('Y-m-d');
        $eleves = Eleve::with('adresse','coordonnee','modules','attestation','examens')
        ->where(function($query) use ($dateJour)
        {
            $query->whereDate('date_fin_permis','>=',$dateJour)
            ->orwhereNull('date_fin_permis');
        })
        ->orWhere(function($query) use ($dateJour)
        {
            $query->whereDate('date_fin_contrat','>=',$dateJour)
            ->orwhereNull('date_fin_contrat');
        })
        ->orderBy('created_at','desc')->get();
        return EleveResource::Collection($eleves);
    }
    public function obtenirListeElevesSeulement(){
        $eleves = Eleve::orderBy('created_at','desc')->get();
        return EleveResource::Collection($eleves);
    }
}