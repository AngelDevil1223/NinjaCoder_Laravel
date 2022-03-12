<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLeaderBoardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('leader_boards', function (Blueprint $table) {
            $table->id();
            $table->string('Leader_id');
            $table->string('Leader_Name');
            $table->string('Leader_budget');
            $table->string('Leader_success');
            $table->string('Leader_avatar');
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
        Schema::dropIfExists('leader_boards');
    }
}
