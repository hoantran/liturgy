<?php

class Liturgy extends Eloquent {
	protected $guarded = array();
	public static $rules = array();

	public $timestamps = false;

	public function parts() {
		return $this->belongsToMany( 'Part' )
					->withPivot( 'song_id' )
					->join( 'songs', 'song_id', '=', 'songs.id' );
	}

	public static function getLiturgyData( $liturgy_id ){
		$liturgy = Liturgy::find( $liturgy_id );
		if( NULL == $liturgy ){
			return NULL;
		}
		else {

			$date = DateTime::createFromFormat( 'Y-m-d H:i:s', $liturgy->date );

			return array(
				'_id'		=> $liturgy->id,
				'name'		=> $liturgy->title,
				'date'		=> $date->format('D m/d/Y H:i A'),
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
 				$p->part 	=> $p->pivot->song_id
 			);
		}

		$master = Liturgy::sortParts( $master );

		Log::info( "unpack:", $master );

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

			foreach ($parts as $p ) {
				// each part - $p - should have only two elements: 
				// 'order' and
				// 'whatever the part name is' e.g. Processional, Kyrie ... etc
				foreach ($p as $key => $value) {
					if ( 0 != strcmp( $key, 'order' ) ) {
						$items[ $key ] = $value;
						break;
					}
				}
			}
			$results[ $sectionName ] = $items;
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
			foreach ($parts as $part => $song_id) {
				array_push( $items, array(
					'part'	=> $part,
					'song'	=> Song::getSongData( $song_id )
				));
				// $items[ $part ] = Song::getSongData( $song_id );
			}
			$s[ 'items' ] = $items;

			array_push( $results, $s );
		}

		Log::info( "FORMATTED:", $results );
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