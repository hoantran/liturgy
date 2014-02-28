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

    /**
     * Retrieve a user with this Facebook ID
     * @param  int $fbid Facebook ID
     * @return User       the first user instance, if it exists
     */
    public static function get( $fbid ){
        return self::where('fbid', '=', $fbid)->first();
    }

    /**
     * Insert a new user into the database
     * @param  int $fbid   Facebook ID
     * @param  String $fbname Facebook name
     * @return User         the just created user instance
     */
    public static function insert( $fbid, $fbname ){
        $user = new User;
        $user->fbid = $fbid;
        $user->fbname = $fbname;
        $user->save();
    }
}
