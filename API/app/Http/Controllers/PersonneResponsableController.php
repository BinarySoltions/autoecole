<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Htpp\Requests;
use App\Http\Resources\PersonneResponsableResource;
use App\PersonneResponsable;

class PersonneResponsableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $personne = PersonneResponsable::orderBy('created_at','desc')->get();
        return PersonneResponsableResource::Collection($personne);
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
            if($request->id){
                $personne =PersonneResponsable::find($request->id);
            }else{
                $personne= new PersonneResponsable;
            }
            $personne->nom = $request->nom;

            $personne->save();
           
            $personnes = PersonneResponsable::orderBy('created_at','desc')->get();
            return PersonneResponsableResource::Collection($personnes);
    }

}
