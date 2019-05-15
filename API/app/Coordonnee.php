<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coordonnee extends Model
{
    use SoftDeletes;

    protected $table = 'coordonnee';

    protected $hidden = [
        'created_at', 'updated_at','deleted_at'
    ];

    public function eleve(){
        return $this->belongsTo('App\Eleve');
    }
}
