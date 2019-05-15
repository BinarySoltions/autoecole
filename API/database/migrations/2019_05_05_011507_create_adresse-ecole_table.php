<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdresseEcoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adresse_ecole', function (Blueprint $table) {
        $table->bigInteger('ecole_id');
        $table->integer('numero')->nullable();
        $table->string('rue',250)->nullable();
        $table->string('appartement',10)->nullable();
        $table->string('municipalite',250)->nullable();
        $table->string('province',100)->nullable();
        $table->string('code_postal')->nullable();
        $table->foreign('ecole_id')->references('id')->on('ecole');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
