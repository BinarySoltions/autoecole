<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdresseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adresse', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('eleve_id');
            $table->integer('numero')->nullable();
            $table->string('rue',250)->nullable();
            $table->string('appartement',10)->nullable();
            $table->string('municipalite',250)->nullable();
            $table->string('province',100)->nullable();
            $table->string('code_postal')->nullable();
            $table->foreign('eleve_id')->references('id')->on('eleve');
            $table->softDeletes();
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
        Schema::dropIfExists('adresse');
    }
}
