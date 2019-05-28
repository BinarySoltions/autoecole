<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnPers2TableAttestation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('attestation', function (Blueprint $table) {
            $table->bigInteger('personne_responsable_id')->nullable()->change();
            $table->bigInteger('personne_responsable2_id')->nullable();
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
