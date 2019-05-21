<?php

namespace App\Services\Eleve;
use Illuminate\Http\Request;
use App\Http\Requests;

interface IEleveService
{
    public function sauvegarderEleve(Request $requete);
    public function obtenirListeEleves();
    public function obtenirListeElevesSeulement();
}