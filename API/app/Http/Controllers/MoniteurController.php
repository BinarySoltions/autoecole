<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Moniteur;
use App\Http\Resources\MoniteurResource;

class MoniteurController extends Controller
{
    //
    public function index(){
        $moniteurs = Moniteur::get();
        return MoniteurResource::collection($moniteurs);
    }

    public function ajouter(Request $request){
        $moniteur = new Moniteur();
        $moniteur->prenom  = $request->prenom;
        $moniteur->nom = $request->nom;
        $moniteur->numero = $request->numero;

        $moniteur->save();

        $moniteurs = Moniteur::get();

        return MoniteurResource::collection($moniteurs);
    }

    public function supprimer(Request $request){
        $id = $request->all()[0];
        $moniteur = Moniteur::find($id);

        $moniteur->delete();

        $moniteurs = Moniteur::get();

        return MoniteurResource::collection($moniteurs);
    }
}
