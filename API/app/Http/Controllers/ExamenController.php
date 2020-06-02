<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ExamenResource;
use App\Eleve;
use App\Examen;

class ExamenController extends Controller
{
    //
    public function show($numero)
    {
        $examen = Examen::where('numero','=',$numero)
        ->where('actif','=',NULL)
        ->first();
        if($examen){
            return  new ExamenResource($examen); 
        } else {
            return NULL;
        }
    }

    public function store(Request $request)
    {
        if($request) {
            $examen = Examen::where('numero','=',$request->numero)
            ->where('actif','=',NULL)
            ->first();
            if($examen){
                $examen->resultat = $request->resultat;
                $examen->actif = 1;
                $examen->date_examen = date('Y-m-d', strtotime($request->date_examen));
                $examen->langue = $request->langue;
                $examen->save();
                return response()->json([
                    'isValid' => true
                ]);
            } else {
                return response()->json([
                    'isValid' => false
                ]);
            }
        } else {
            return response()->json([
                'isValid' => false
            ]);
        }
        
    }
}
