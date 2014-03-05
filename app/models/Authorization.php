<?php

class Authorization extends Eloquent {
    protected $connection = 'choir';
	protected $guarded = array();
	public static $rules = array();
    public $timestamps = false;
    public $incrementing = true;


    public function user() {
        return $this->belongs_to( 'User' );
    }

    /**
     * Insert one writability element into this array
     * @param  Array $destination an array
     * @param  boolean $isWritable  writability
     * @return Array              the same array but with writability element inserted
     */
    public static function insertWritable( $destination, $isWritable ) {
        $destination['writable'] = $isWritable;
        // Log::info(print_r($destination, true));

        return $destination;
    }

    /**
     * Insert the writability into each array of this collection of arrays
     * @param  Array $destination a collection of arrays
     * @param  boolean $isWritable  writability
     * @return Array              the same collection of arrays but with writability elements inserted
     */
    public static function insertWritableToArray( $destination, $isWritable ) {
        // $destination['writable'] = $isWritable;
        array_walk($destination, function(&$value, $key) use( &$isWritable){
            $value['writable'] = $isWritable;
        });
        // Log::info(print_r($destination, true));

        return $destination;
    }


    /**
     * Grant all write prilege to a user
     * @param  integer $userid native id of a user (not facebook id or google id etc...)
     */
    public static function grantAll( $userid ){
        self::updateAll( $userid, true );
    }

    /**
     * Take a way all write previlege from a user
     * @param  integer $userid native id of a user (not facebook id or google id etc...)
     */
    public static function disAllowAll( $userid ){
        // one way to do it: non-destructive
        // self::updateAll( $userid, false );

        // another way to do it: destructive and cleaner
        $authorizations = Authorization::where('user_id', '=', $userid)->get();
        foreach ($authorizations as $auth) {
            $auth->delete();
        }
    }

    /**
     * Change write priveleges of a user
     * @param  integer $userid native id of a user (not facebook id or google id etc...)
     * @param  boolean $grant  whether to grant the write privilege or not
     */
    private static function updateAll( $userid, $grant ){
        $activities = self::getActivities();
        if(!empty($activities)) {
            array_walk($activities, function(&$activity, $key) use( &$userid, &$grant){
                $authorization = Authorization::where(function($query) use ($userid, $activity){
                                    $query->where('activity', '=', $activity)->where('user_id', '=', $userid);
                })->first();
                if(isset($authorization)){
                    $authorization->writable = $grant;
                }
                else {
                    $authorization = new Authorization;
                    $authorization->user_id = $userid;
                    $authorization->activity = $activity;
                    $authorization->writable = $grant;
                }
                $authorization->save();
            });
        }
    }

    private static function getActivities(){
        return Authorization::select('activity')->distinct()->lists('activity');
    }


    /**
     * Check if the user in the current has the write permission for the requested activity
     * Whenever an operation needs authorization:
     * check that the CSRF header matches the user session's
     * check that the user is in the system and authorized for the operation
     * Based on recommedations at: http://bit.ly/1hUqAGH
     * @param  String  $activity the activity to ask write permission
     * @return boolean           writable
     */
    public static function isWritingPermitted( $activity, $checkCSRF = true ) {
        if( $checkCSRF ){
            if( self::isPassedCSRF() ){
                return self::getWritability( $activity );
            }
        }
        else {
            return self::getWritability( $activity );
        }

        return false;
    }

    /**
     * Checks to see if the current user has writability prilege for an activity
     * @param  String $activity an activity to check
     * @return boolean           whether the user has writiability for the activity
     */
    private static function getWritability( $activity ){
        $user = self::getSessionUser();
        if(null == $user){
            return false;
        } else {
            //User is logged in
            return self::isWritable( $user, $activity );
        }
    }

    /**
     * Makes sure the current user's session match CSRF token
     * @return boolean whether user's session match CSRF token
     */
    private static function isPassedCSRF() {
        if( Session::has('user') && array_key_exists('HTTP_X_CSRF_TOKEN', $_SERVER)) {
            if(Session::get('user')['token'] == $_SERVER['HTTP_X_CSRF_TOKEN']) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get write permission for the user
     * @param  User  $user     user instance
     * @param  String  $activity the activity to ask write permission
     * @return boolean           writable
     */
    private static function isWritable($user, $activity){
        Log::info($activity);
        $isWritable = $user->authorizations()->where('activity', '=', $activity)->first();
        if(isset($isWritable) && $isWritable->writable){
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Extract the user embedded in the current session
     * @return [type] [description]
     */
    private static function getSessionUser(){
        $user = null;
        if(array_key_exists('fbid', Session::get('user'))){
            $fbid = Session::get('user')['fbid'];
            if( !self::IsNullOrEmptyString( $fbid )){
                $user = User::where('fbid', '=', $fbid)->first();
            }
        }

        return $user;
    }


    // http://bit.ly/1bMOlxE
    // Function for basic field validation (present and neither empty nor only white space
    /**
     * Field validation: is there anything there
     * @param String $question the string to check for null or empty
     */
    private static function IsNullOrEmptyString($question){
        return (!isset($question) || trim($question)==='');
    }
}
