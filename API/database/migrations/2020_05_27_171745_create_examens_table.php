<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExamensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examens', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('eleve_id');
            $table->string('numero',50);
            $table->text('resultat')->nullable();
            $table->integer('actif')->nullable();
            $table->date('date_examen');
            $table->string('langue',20);
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
        Schema::dropIfExists('examens');
    }
}
