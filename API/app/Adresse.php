<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Adresse extends Model
{
    use SoftDeletes;

    protected $table = 'adresse';

    protected $hidden = [
        'created_at', 'updated_at','deleted_at'
    ];

    public function eleve(){
        return $this->belongsTo('App\Eleve');
    }
}
