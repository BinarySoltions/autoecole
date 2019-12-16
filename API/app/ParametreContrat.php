<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParametreContrat extends Model
{
    protected $table = 'parametre_contrat';

    protected $hidden = [
        'created_at', 'updated_at'
    ];

}
