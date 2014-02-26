<?php

class Authorization extends Eloquent {
	protected $guarded = array();
	public static $rules = array();
    public $timestamps = false;
    public $incrementing = false;


    public function user() {
        return $this->belongs_to( 'User' );
    }
}
