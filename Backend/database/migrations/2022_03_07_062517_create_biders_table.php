<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('biders', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_id');
            $table->string('bid_price');
            $table->string('bid_deadline');
            $table->string('bid_description');
            $table->string('bider_id');
            $table->string('bider_url');
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
        Schema::dropIfExists('biders');
    }
}
