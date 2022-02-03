<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Moniteur extends Model
{
    protected $table = 'moniteur';

    protected $hidden = [
        'created_at', 'updated_at'
    ];
}
