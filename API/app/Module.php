<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $table = 'module';

    protected $hidden = [
        'created_at', 'updated_at','deleted_at'
    ];

    public function eleves(){
        return $this->belongsToMany('App\Eleve','eleve_module','eleve_id','module_id')
            ->as('eleve_module')
            ->withPivot('date_complete')
            ->withTimestamps();
    }
}
