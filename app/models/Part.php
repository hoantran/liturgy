<?php

class Part extends Eloquent {
    protected $connection = 'worship';
	protected $guarded = array();
	public static $rules = array();

	public $timestamps = false;

	public function liturgies(){
		return $this->belongsToMany( 'Liturgy' );
	}
}
