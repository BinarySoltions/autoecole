<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\ErreurSortieResource;
use App\ErreurSortie;

class ErreurSortieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions = ErreurSortie::get();
        return  ErreurSortieResource::collection($questions);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $requests)
    {
        $data = [];
        $result = $requests->all();

        foreach ($result as $request) {
            array_push($data, [
                'texte' => $request['texte'],
                'langue' => $request['langue']
            ]);
        }

        ErreurSortie::insert($data);

        return $this->index();
    }

}
