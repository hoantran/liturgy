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
}
