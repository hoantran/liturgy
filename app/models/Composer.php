<?php

class Composer extends Eloquent {
	protected $guarded = array();
	public static $rules = array();

	public $timestamps = false;

	public function songs() {
		return $this->belongsToMany( 'Song' );
	}
}
