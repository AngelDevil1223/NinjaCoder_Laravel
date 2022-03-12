<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_name');
            $table->string('ticket_description');
            $table->string('ticket_price');
            $table->string('ticket_deadline');
            $table->string('ticket_skills');
            $table->string('ticket_upload');
            $table->string('ticket_status');
            $table->string('ticket_winner');
            $table->float('ticket_budget');
            $table->string('winner_avatar');
            $table->string('winner_deadline');
            $table->string('feedback');
            $table->string('review');
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
        Schema::dropIfExists('tickets');
    }
}
