<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnResultatphase1ResultatfinalAttestattion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('attestation', function (Blueprint $table) {
            $table->string('numero')->nullble()->change();
            $table->integer('resultat_phase_une')->default(1);
            $table->integer('resultat_final')->default(1);
            $table->date('signature_ecole_phase_une')->nullable();
            $table->date('signature_eleve_phase_une')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('attestation', function (Blueprint $table) {
            //
        });
    }
}
