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
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        Log::info('Session:store');
        $fbname = Input::get('fbname');
        $fbid = Input::get('fbid');
        Log::info($fbname);
        Log::info($fbid);
        // Log::info(base64_encode(openssl_random_pseudo_bytes(16)));
        // if( 0===strcmp($fbname, "rum")){
        // 	Session::put('name', $fbname);
        // 	Log::info('stored session');
        // }
        // else {
        // 	Log::info(Session::get('name'));
        // }

        $user = User::where('fbid', '=', $fbid)->first();
        if(is_null($user)){
        	$user = new User;
        	$user->fbname = $fbname;
        	$user->fbid = $fbid;
        	$user->save();
        }

		$response = array("fbname"=>$fbname, "fbid"=>$fbid, "token"=>base64_encode(openssl_random_pseudo_bytes(16)));
		$_SESSION['user'] = $response;
		return json_encode($response);
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

}
