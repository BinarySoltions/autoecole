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
    public function modifierEleve($request){

        $eleve = Eleve::find($request->id);
        $adresse = $eleve->adresse();
        $coordonnee = $eleve->coordonnee();

        //save eleve
        $eleve->prenom = $request->prenom;
        $eleve->nom = $request->nom;
        $eleve->numero_contrat = $request->numero_contrat;
        
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
       
       return $eleve;
    }

    public function obtenirListeEleves(){
        $eleves = Eleve::with('adresse','coordonnee','modules')
        ->get();
        return EleveResource::Collection($eleves);
    }
}