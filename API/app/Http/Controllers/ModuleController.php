<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Module;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\PhaseResource;
use App\Eleve;
use App\Phase;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $modules = Module::orderBy('numero')->get();
        return ModuleResource::Collection($modules);
    }
    public function driving()
    {
        $modules = Module::where('type','P')->orderBy('numero')->get();
        return ModuleResource::Collection($modules);
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
                $phase = Phase::where('numero',$request->numero)->first();
                $module = null;
                if(!$phase){
                    $phase = new Phase;
                }
                $phase->nom = $request->nom;
                $phase->numero = $request->numero;
                $phase->save();
                
                $module = Module::where('numero',$request->numero_module)
                    ->where('phase_id',$phase->id)->first();
                
                
                if(!$module){
                    $module = new Module;
                    $module->phase_id = $phase->id;
                }
                $module->nom = $request->nom_module;
                $module->type = $request->type;
                $module->numero = $request->numero_module;
               //save module
                $module->save();
           
        $modules = Phase::with('modules')->get(); 
        return PhaseResource::Collection($modules);
    }
    
     public function store_module_eleve(Request $request){
        if($request->date_complete)
            $request->date_complete = date('Y-m-d', strtotime($request->date_complete));

        //retrieve data
        $module = Eleve::whereIn('id',$request->eleves)
        ->with(['modules' => function ($query) use ($request) {      
            $query->where('module_id', '=', $request->id_module);
        }])->get();

        $valid = true;
        //update
        foreach($module as $md){
            $res = $md->modules()->updateExistingPivot($request->id_module,
            ['date_complete' => $request->date_complete,'sans_objet'=> $request->sans_objet]);
            if(!$res){
                $valid = false;
            }
        }

       return response()->json([
        'valid' => $valid
        ]);
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
