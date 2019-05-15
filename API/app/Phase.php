<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Phase extends Model
{
    use SoftDeletes;

    protected $table = 'phase';

    protected $hidden = [
        'created_at', 'updated_at','deleted_at'
    ];

    public function eleve(){
        return $this->hasMany('App\Module');
    }
}
