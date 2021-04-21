<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ErreurSortie extends Model
{
    protected $table = 'erreur_sortie';

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
