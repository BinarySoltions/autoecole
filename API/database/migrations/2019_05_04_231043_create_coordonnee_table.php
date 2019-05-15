<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoordonneeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coordonnee', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('eleve_id');
            $table->string('telephone',20)->nullable();
            $table->string('telephone_autre',20)->nullable();
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
        Schema::dropIfExists('coordonnee');
    }
}
