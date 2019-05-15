<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PersonneResponsable extends Model
{
    protected $table = 'personne_responsable';

    protected $hidden = [
        'created_at', 'updated_at','deleted_at'
    ];

    public function attestation(){
        return $this->hasOne('App\Attestation');
    }
}
