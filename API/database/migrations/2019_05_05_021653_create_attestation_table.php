<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAttestationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attestation', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('eleve_id');
            $table->bigInteger('ecole_id');
            $table->bigInteger('personne_responsable_id');
            $table->integer('numero')->nullble();
            $table->date('signature_responsable')->nullable();
            $table->date('signature_eleve')->nullable();
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
        Schema::dropIfExists('attestation');
    }
}
