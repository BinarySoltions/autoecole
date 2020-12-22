<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\ParametreContratResource;
use App\ParametreContrat;

class ParametreContratController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $parametre_contrat = ParametreContrat::first();
        return new ParametreContratResource($parametre_contrat);
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
        $parametre_contrat = ParametreContrat::first();

        if(!$parametre_contrat)
            $parametre_contrat = new ParametreContrat;
        //$df = preg_replace('/<p[^>]*>/', '', $request->description_formation);
       // $df = preg_replace('/<\/p>/', '<br />', $df);
        $parametre_contrat->description_formation =  $request->description_formation;
        $parametre_contrat->cout_formation =  $request->cout_formation;
        $parametre_contrat->modalite_payement_un =  $request->modalite_payement_un;
        $parametre_contrat->modalite_payement_deux =  $request->modalite_payement_deux;
        $parametre_contrat->modalite_payement_trois =  $request->modalite_payement_trois;
        $parametre_contrat->acceptation_condition_un =  $request->acceptation_condition_un;
        $parametre_contrat->acceptation_condition_anglais =  $request->acceptation_condition_anglais;
        $parametre_contrat->acceptation_condition_deux =  $request->acceptation_condition_deux;
        $parametre_contrat->acceptation_condition_trois =  $request->acceptation_condition_trois;
        $parametre_contrat->save();
          
        $parametre_contrat = ParametreContrat::first();
        return new ParametreContratResource($parametre_contrat);
    }
}
