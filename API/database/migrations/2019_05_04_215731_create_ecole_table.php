<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEcoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ecole', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('numero',10);
            $table->string('raison_social',100)->nullable();
            $table->string('nom',100)->nullable();
            $table->string('email',100)->nullable();
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
        Schema::dropIfExists('ecole');
    }
}
