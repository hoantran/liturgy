<?php

class User extends Eloquent {
	protected $guarded = array();
	public static $rules = array();
    public $timestamps = false;

    /**
     * A User has a lot of authorizations
     * @return type one-to-many relationship
     */
    public function authorizations() {
        return $this->hasMany( 'Authorization' );
    }



    ///////////////////////////////
    /// UTILITIES /////////////////
    ///////////////////////////////

    public static function insertAUser( $fbid, $fbname ){
        $user = new User;
        $user->fbid = $fbid;
        $user->fbname = $fbname;
        $user->save();
    }
}
