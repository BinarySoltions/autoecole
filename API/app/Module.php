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
        return $this->belongsToMany('App\Eleve','eleve_module','module_id','eleve_id')
            ->as('eleve_module')
            ->withPivot('date_complete','sans_objet','note','moniteur')
            ->withTimestamps();
    }
    public function phase(){
        return $this->belongsTo('App\Phase');
    }
}
