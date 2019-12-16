<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\PayementResource;
use App\Payement;
use App\Eleve;
use App\Http\Resources\EleveResource;
use App\Adresse;
use App\Coordonnee;

class PayementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $eleves = Eleve::with('adresse','coordonnee','payements')
        ->find($id);
        return  new EleveResource($eleves); 
    }
     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $payement = new Payement();
        $payement->montant = $request->montant;
        $payement->eleve_id = $request->eleve_id;
        $payement->type =  $request->type;
        $payement->date_payement =  $request->date_payement;

            
        $payement->save();
        return $this->index($payement->eleve_id);
    }

    public function totalPayement(Request $request)
    {
        $payement = Payement::whereDate('date_payement','>=',$request->dateDebut)
                    ->whereDate('date_payement','<=',$request->dateFin)
                    ->select('montant')->sum('montant');
        
        return response()->json([
                        'montant' => $payement,
                        'dateDebut' => $request->dateDebut,
                        'dateFin'=> $request->dateFin
                    ]);
        
    }

}
