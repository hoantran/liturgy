<?php

class Part extends Eloquent {
	protected $guarded = array();
	public static $rules = array();

	public $timestamps = false;

	public function liturgies(){
		return $this->belongsToMany( 'Liturgy' );
	}
}
