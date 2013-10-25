<?php

class Medium extends Eloquent {
	protected $guarded = array();
	public $timestamps = false;
	public $incrementing = false;

	public static $rules = array();

	public function song() {
		return $this->belongs_to( 'Song' );
	}

	/**
	*	Delete all entries relating to this song id
	*/
	public static function deleteSong( $song_id ){
		Medium::where( "song_id", $song_id )->delete();
	}

}
