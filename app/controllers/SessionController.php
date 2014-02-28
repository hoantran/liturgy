<?php

class SessionController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        // return View::make('sessions.index');
        Log::info('Session:index');
        $name = Input::get('name');
        Log::info($name);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
        Log::info('Session:index');
        return View::make('sessions.create');
	}

	/**
	 * Create a new session
	 *
	 * @return Response
	 */
	public function store()
	{
        Log::info('Session:store');
        $fbname = Input::get('fbname');
        $fbid   = Input::get('fbid');

        // Log::info( 'fbname:' . $fbname );
        // Log::info( 'fbid:' . $fbid );

        if( !self::IsNullOrEmptyString( $fbname ) && !self::IsNullOrEmptyString( $fbid )){
            $user = User::get( $fbid );
            if(is_null($user)){
            	$user = User::insert( $fbid, $fbname );
            }

    		$response = array("fbname"=>$fbname, "fbid"=>$fbid, "token"=>base64_encode(openssl_random_pseudo_bytes(16)));
            Session::put('user', $response);
    		return json_encode($response);
        }
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        Log::info('Session:show');
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
        Log::info('Session:edit');
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
        Log::info('Session:update');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
        Log::info('Session:destroy');
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
