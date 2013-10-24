<?php

use Illuminate\Database\Migrations\Migration;

class CreateComposers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('composers', function($table)
        {
            $table->increments( 'id' );
            $table->string( 'firstName' );
            $table->string( 'lastName' );
            $table->string( 'picUrl' );
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop( 'composers' );
	}

}