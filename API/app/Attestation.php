<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attestation extends Model
{
    use SoftDeletes;

    protected $table = 'attestation';

    protected $hidden = [
        'created_at', 'updated_at','deleted_at'
    ];

    public function eleve(){
        return $this->belongsTo('App\Eleve');
    }
    public function ecole(){
        return $this->belongsTo('App\Ecole');
    }

    public function personneResponsable(){
        return $this->belongsTo('App\PersonneResponsable');
    }
}
