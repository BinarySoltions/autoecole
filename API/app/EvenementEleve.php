<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EvenementEleve extends Model
{
    protected $table = 'evenement_eleve';

    protected $hidden = [
        'created_at','updated_at'
    ];
}
