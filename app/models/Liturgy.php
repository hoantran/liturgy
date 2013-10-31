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
			$master[ $section ][ $p->part ] = $p->pivot->song_id;
		}

		Log::info( "unpack:", $master );

		return Liturgy::getFormattedSections( $master );
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
}


// $l = Liturgy::find( 1 );
// foreach( $l->parts as $p ){ echo $p->pivot->song_id . "\n"; }