<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParametreContratTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parametre_contrat', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('description_fromation')->nullable();
            $table->text('modalite_payement_un')->nullable();
            $table->text('modalite_payement_deux')->nullable();
            $table->text('modalite_payement_trois')->nullable();
            $table->text('acceptation_condition_un')->nullable();
            $table->text('acceptation_condition_anglais')->nullable();
            $table->text('acceptation_condition_deux')->nullable();
            $table->text('acceptation_condition_trois')->nullable();
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
        Schema::dropIfExists('parametre_contrat');
    }
}
