<?php

class PartsTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		// DB::table('parts')->truncate();
		Part::truncate();

		$parts = array(
			array( 'section' => 'A', 'part' => 'Prelude' ),
			array( 'section' => 'A', 'part' => 'Processional' ),
			array( 'section' => 'A', 'part' => 'Kyrie' ),
			array( 'section' => 'A', 'part' => 'Gloria' ),
			array( 'section' => 'A', 'part' => 'Responsorial' ),
			array( 'section' => 'A', 'part' => 'Gospel Acclamation' ),
			array( 'section' => 'A', 'part' => 'Prayer of the Faithful' ),
			array( 'section' => 'B', 'part' => 'Prep. of the Lord\'s Table' ),
			array( 'section' => 'B', 'part' => 'Holy' ),
			array( 'section' => 'B', 'part' => 'Memorial Acclamation' ),
			array( 'section' => 'B', 'part' => 'Great Amen' ),
			array( 'section' => 'B', 'part' => 'Lamb of God' ),
			array( 'section' => 'C', 'part' => 'Communion' ),
			array( 'section' => 'C', 'part' => 'Song of Praise' ),
			array( 'section' => 'D', 'part' => 'Recessional' )
		);

		// Uncomment the below to run the seeder
		DB::table('parts')->insert($parts);
	}

}
