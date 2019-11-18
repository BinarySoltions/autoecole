<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\PayementResource;
use App\Payement;
use App\Eleve;

class PayementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $payements = Payement::with('eleve')
        ->orderBy('created_at','desc')->get();
        return PayementResource::Collection($payements);
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
        return $this->index();
    }

}
