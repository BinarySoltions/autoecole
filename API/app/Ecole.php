<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ecole extends Model
{

    protected $table = 'ecole';

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function attestation(){
        return $this->hasOne('App\Attestation');
    }

    public function adresse(){
        return $this->hasOne('App\AdresseEcole');
    }
}
