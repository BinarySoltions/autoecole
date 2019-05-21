<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdresseEcole extends Model
{
    protected $table = 'adresse_ecole';

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function ecole(){
        return $this->belongsTo('App\Ecole');
    }
}
