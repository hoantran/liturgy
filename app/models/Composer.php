<?php

class Composer extends Eloquent {
    protected $connection = 'worship';
	protected $guarded = array();
	public static $rules = array();

    public $timestamps = false;
    public $incrementing = false;

	public function songs() {
		return $this->belongsToMany( 'Song' );
	}
}
