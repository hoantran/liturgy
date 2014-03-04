<?php

class Liturgy extends Eloquent {
    protected $connection = 'choir';
	protected $guarded = array();
	public static $rules = array();

	public $timestamps = false;

	public function parts() {
		// does having 'Part' in a different database
		// significantly affect performance?
		$choirDB = Config::get('database.connections.choir.database');
		return $this->belongsToMany( 'Part', $choirDB . '.liturgy_part' )
					->withPivot( 'song_id' )
					->join( 'songs', 'song_id', '=', 'songs.id' );
	}

	public static function deleteALiturgy ( $liturgy_id ){
		$liturgy = Liturgy::find( $liturgy_id );

		if( NULL != $liturgy ){
			// delete pivot entries
			$liturgy->parts()->detach();
			// delete liturgy
			$liturgy->delete();
		}
	}

	public static function getLineups(){
		$results = array();
		// $results = array(
		// 	array(
		// 		'date'			=>	'Sun Oct 1, 2013',
		// 		'title'			=>	'First Sunday of Advent',
		// 		'liturgy_id'	=> 	1
		// 	),
		// 	array(
		// 		'date'			=>	'Sun Oct 12, 2013',
		// 		'title'			=>	'Second Sunday of Advent',
		// 		'liturgy_id'	=> 	2
		// 	)
		// );

		// later there will be a need to limit the query, instead of getting all liturgies
		$liturgies = Liturgy::orderBy('date', 'ASC')->get();
		foreach ( $liturgies as $liturgy ) {
			if( $liturgy->enable ){
				$date = DateTime::createFromFormat( 'Y-m-d H:i:s', $liturgy->date );
				array_push( $results, array(
					'id'			=>	$liturgy->id,
					'date'			=>	$date->format('D M d, Y'),
					'title'			=>	$liturgy->title,
					'liturgy_id'	=> 	$liturgy->id
				));
			}
		}

		return $results;
	}

	public static function getLiturgyData( $liturgy_id ){
		$liturgy = Liturgy::find( $liturgy_id );
		if( NULL == $liturgy ){
			return NULL;
		}
		else {

			$date = DateTime::createFromFormat( 'Y-m-d H:i:s', $liturgy->date );

			return array(
				'id'		=> $liturgy->id,
				'title'		=> $liturgy->title,
				'date'		=> $date->format('D m/d/Y h:i A'),
				'enable'	=> $liturgy->enable,
				'sections'	=> Liturgy::unpackParts( $liturgy->parts )
			);
		}
	}

	public static function unpackParts( $parts ){
		$master = array();
		foreach( $parts as $p ){
			$section = $p->section;
			if( !array_key_exists( $section, $master )){
				$master[ $section ] = array();
			}
 			// $master[ $section ][ $p->part ] = $p->pivot->song_id;
 			$master[ $section ][] = array(
 				'order'		=> $p->part_order,
 				$p->part 	=> $p->pivot->song_id,
 				'id'		=> $p->id
 			);
		}

		$master = Liturgy::sortParts( $master );

		// Log::info( "unpack:", $master );

		return Liturgy::getFormattedSections( $master );
	}

	public static function sortParts( $sections ){
		$results = array();
		ksort( $sections ); // sections are ordered alphabettically by their names
		foreach ($sections as $sectionName => $parts ) {
			$items = array();

			// sort the parts according to its order
			$parts = array_values( array_sort( $parts, function( $value ){
				return $value[ 'order' ];
			}));

			// foreach ($parts as $p ) {
			// 	// each part - $p - should have only two elements:
			// 	// 'order' and
			// 	// 'whatever the part name is' e.g. Processional, Kyrie ... etc
			// 	foreach ($p as $key => $value) {
			// 		if ( 0 != strcmp( $key, 'order' ) ) {
			// 			$items[ $key ] = $value;
			// 			break;
			// 		}
			// 	}
			// }
			// $results[ $sectionName ] = $items;
			$results[ $sectionName ] = $parts;
		}

		return $results;
	}

	public static function getFormattedSections( $sections ){
		$results = array();

		foreach ($sections as $sectionName => $parts ) {
			$s = array(
				'name' => $sectionName
			);

			$items = array();
			foreach ( $parts as $aPart ) {
				// there are only three items in the array - $aPart
				// 'id': the id of the part
				// 'order': order of appearance of the part within the section
				// 'part_title': whatever the title of the part is
				//
				//	need to delete 'order', and leave everything else in
				// must use foreach loop since we don't know what the key for the part is
				$id = null;
				$part = null;
				$songID = null;

				foreach ($aPart as $key => $value) {
					if( 0 == strcmp( $key, 'order' )){
						continue;
					}
					elseif (0 == strcmp( $key, 'id' )) {
						$id = $value;
					}
					else{
						$part = $key;
						$songID = $value;
					}
				}

				$songData = Song::getSongData( $songID );
				$songData[ 'id' ] = $id;
				$songData[ 'part' ] = $part;
				array_push( $items, $songData );

				// array_push( $items, array(
				// 	'id'	=> $id,
				// 	'part'	=> $part,
				// 	'song'	=> Song::getSongData( $songID )
				// ));
			}


			// foreach ($parts as $part => $song_id) {
			// 	array_push( $items, array(
			// 		'part'	=> $part,
			// 		'song'	=> Song::getSongData( $song_id )
			// 	));
			// 	// $items[ $part ] = Song::getSongData( $song_id );
			// }
			$s[ 'items' ] = $items;

			array_push( $results, $s );
		}

		// Log::info( "FORMATTED:", $results );
		return $results;
	}

	public static function duplicateLiturgy( $id ){
		$src = Liturgy::find( $id );
		$dst = $src->replicate();
		$dst->title = Liturgy::getNewLiturgyTitle( $src->title );
		$dst->save();
		$dst->parts = $src->parts;
		foreach( $dst->parts as $p ){
			$p->pivot->liturgy_id = $dst->id;
			$dst->parts()->attach( $dst->id, $p->pivot->toArray() );
		}
	}

	public static function getNewLiturgyTitle( $srcTitle ){
		for( $count = 1; $count < 10; $count++ ){
			$newTitle = $srcTitle . '(' . $count . ')';
			$copies = Liturgy::where('title', '=', $newTitle )->count();
			if( 0 == $copies ){
				return $newTitle;
			}
		}
		return $srcTitle . '(' . 'LIMIT EXCEEDED' . ')';
	}
}

// $one = Liturgy::find( 1 );
// $two = Liturgy::find( 2 );
// $p = $one->parts[ 0 ];
// $p->pivot->liturgy_id=2;
// $two->parts()->attach( 2, $p->pivot->toArray() );



// $l = Liturgy::find( 1 );
// foreach( $l->parts as $p ){ echo $p->pivot->song_id . "\n"; }