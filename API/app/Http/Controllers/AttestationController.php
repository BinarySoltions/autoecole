<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade as PDF;
use DNS1D;
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
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
