<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEleveModuleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eleve_module', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('eleve_id');
            $table->bigInteger('module_id');
            $table->date('date_complete');
            $table->foreign('eleve_id')->references('id')->on('eleve');
            $table->foreign('module_id')->references('id')->on('module');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eleve_module');
    }
}
