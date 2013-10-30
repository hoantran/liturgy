<?php

class LiturgiesTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		// DB::table('liturgies')->truncate();
		Liturgy::truncate();

		$liturgies = array(
			array(
				'title'		=> 'Thirty-Third Sunday in Ordinary Time',
				'date'		=> '2013-11-17 09:30:00',
				'location'	=>	'St. Elizabeth'
			)
		);

		// Uncomment the below to run the seeder
		DB::table('liturgies')->insert($liturgies);

		// seeding the pivot table
		DB::table('liturgy_part')->truncate();

		$l = Liturgy::find( 1 );
		$l->parts()->attach( 2, array( 'song_id' => 81 ) );
		$l->parts()->attach( 4, array( 'song_id' => 81 ) );	// gloria`
		$l->parts()->attach( 5, array( 'song_id' => 130 ) );	// responsorial
		$l->parts()->attach( 6, array( 'song_id' => 81 ) );	// gospel
		$l->parts()->attach( 8, array( 'song_id' => 1 ) );	// prep
		$l->parts()->attach( 9, array( 'song_id' => 81 ) ); // holy
		$l->parts()->attach( 10, array( 'song_id' => 81 ) );	// mem
		$l->parts()->attach( 11, array( 'song_id' => 81 ) );	// amen
		$l->parts()->attach( 12, array( 'song_id' => 81 ) );	// lamb
		$l->parts()->attach( 13, array( 'song_id' => 521 ) );	// comm
		$l->parts()->attach( 15, array( 'song_id' => 14 ) );	// rec
	}

}


// find  . -type f -exec dos2unix {} +