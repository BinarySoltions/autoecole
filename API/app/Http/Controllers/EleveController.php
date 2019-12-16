<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Services\Eleve\IEleveService;
use App\Services\Eleve\EleveRequete;
use App\Http\Resources\EleveResource;
use App\Eleve;
use App\Adresse;
use App\Coordonnee;
use App\Module;

class EleveController extends Controller
{
    protected $serviceEleve;

    public function __construct(IEleveService $eleveService){
        $this->serviceEleve = $eleveService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->serviceEleve->obtenirListeEleves();
    }

    public function seulement()
    {
        return $this->serviceEleve->obtenirListeElevesSeulement();
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
        return $this->serviceEleve->sauvegarderEleve($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $eleves = Eleve::with('adresse','coordonnee','modules.phase')
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
        $eleve = Eleve::find($id);
        $valid = false;
        if($eleve){
            Eleve::where('id','=',$id)->delete();
            $valid = true;
        }
           
        return response()->json([
            'valid' => $valid
            ]);
    }
    public function export(Request $request)
    {
        if($request){
            $valeurSup = $request->trimestre*3;
            $valeurInf = $valeurSup+3;
            $dateInf = date("Y-m-d", strtotime("-".$valeurInf." months"));
            $dateSup = date("Y-m-d", strtotime("-".$valeurSup." months"));

        $eleves = Eleve::leftJoin('adresse', 'eleve.id', '=', 'adresse.eleve_id')
        ->leftJoin('coordonnee', 'eleve.id', '=', 'coordonnee.eleve_id')
        ->leftJoin('attestation', 'eleve.id', '=', 'attestation.eleve_id')
        ->whereDate('date_inscription','<=',$dateSup)
        ->whereDate('date_inscription','>',$dateInf)
        ->select('eleve.date_inscription','eleve.nom','eleve.prenom',
        'adresse.numero as numero_adresse','adresse.rue','adresse.municipalite','adresse.code_postal',
        'eleve.email','coordonnee.telephone','eleve.date_naissance','eleve.numero_permis','eleve.numero_contrat as numero_contrat_theorie'
        ,'eleve.numero_contrat as numero_contrat_pratique','attestation.numero')
        ->get();
        return  new EleveResource($eleves);    
        }
        
    }
}
