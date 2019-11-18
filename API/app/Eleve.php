<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Eleve extends Model
{
    use SoftDeletes;

    protected $table = 'eleve';

    protected $hidden = [
        'created_at', 'updated_at','deleted_at'
    ];

    public function adresse(){
        return $this->hasOne('App\Adresse');
    }

    public function coordonnee(){
        return $this->hasOne('App\Coordonnee');
    }
    public function modules(){
        return $this->belongsToMany('App\Module','eleve_module','eleve_id','module_id')
        ->orderBy('module.numero')
        ->as('eleve_module')
        ->withPivot('date_complete')
        ->withTimestamps();
    }

    public function attestation(){
        return $this->hasOne('App\Attestation');
    }

    public function payements(){
        return $this->belongsToMany('App\Payement')
        ->orderBy('payement.date_payement');
    }
}
