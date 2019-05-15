<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class EleveModule extends Pivot
{
    protected $table = 'eleve_module';
    public $incrementing = true;
}
