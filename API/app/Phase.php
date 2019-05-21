<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Phase extends Model
{

    protected $table = 'phase';

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function modules(){
        return $this->hasMany('App\Module');
    }
}
