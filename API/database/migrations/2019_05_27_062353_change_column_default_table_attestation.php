<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeColumnDefaultTableAttestation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('attestation', function (Blueprint $table) {
            $table->integer('resultat_phase_une')->default(0)->change();
            $table->integer('resultat_final')->default(0)->change();
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
