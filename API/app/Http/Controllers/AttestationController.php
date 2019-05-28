<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade as PDF;
use DNS1D;
use App\Attestation;
use App\Http\Resources\AttestationResource;

class AttestationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //\Storage::disk('public')->put('test.png',base64_decode(DNS1D::getBarcodePNG('00597587', 'C128C',3,33)));
       // DNS1D::getBarcodePNG('00597587', 'C128C',3,33);
       $data = [];
       // // Send data to the view using loadView function of PDF facade
        $pdf = PDF::loadView('pdf', $data);
       // // If you want to store the generated pdf to the server then you can use the store function
       $pdf->save(storage_path().'\filename.pdf');
       // // Finally, you can download the file using download function
        return $pdf->stream('customers.pdf');
      // return PDF::loadFile(public_path().'\pdf.html')->save(public_path().'\my_stored_file.pdf')->stream('download.pdf');
        
    }
    public function some_code(){
        
       
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attestation = Attestation::where('eleve_id','=',$request->eleve_id)->first();
        if(!$attestation){
            $attestation = new Attestation();
            $attestation->eleve_id = $request->eleve_id;
            $attestation->ecole_id = $request->ecole_id;
        }
        if($request->phase_une){
            $attestation->numero = $request->numero;
            $attestation->resultat_phase_une = $request->resultat_phase_une;
            $attestation->signature_eleve_phase_une = date("Y-m-d H:i:s");
            $attestation->signature_ecole_phase_une = date("Y-m-d H:i:s");
            $attestation->personne_responsable_id = $request->personne_responsable_id;
        }else{
            $attestation->resultat_final = $request->resultat_final;
            $attestation->signature_responsable = date("Y-m-d H:i:s");
            $attestation->signature_eleve = date("Y-m-d H:i:s");
            $attestation->personne_responsable2_id = $request->personne_responsable2_id;
        }
        $attestation->save();
        $att = Attestation::find($attestation->id);

        return new AttestationResource($att);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $attestation = Attestation::where('eleve_id','=',$id)->first();
        return new AttestationResource($attestation);
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
