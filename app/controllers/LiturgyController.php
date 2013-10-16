<?php

class LiturgyController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		// return json_decode('{"panda":"Awesome!"}', true);
		// return json_decode( '{ "Coords": [{ "Accuracy": "30", "Latitude": "53.2778273", "Longitude": "-9.0121648", "Timestamp": "Fri Jun 28 2013 11:43:57 GMT+0100 (IST)" }, { "Accuracy": "30", "Latitude": "53.2778273", "Longitude": "-9.0121648", "Timestamp": "Fri Jun 28 2013 11:43:57 GMT+0100 (IST)" }, { "Accuracy": "30", "Latitude": "53.2778273", "Longitude": "-9.0121648", "Timestamp": "Fri Jun 28 2013 11:43:57 GMT+0100 (IST)" }, { "Accuracy": "30", "Latitude": "53.2778339", "Longitude": "-9.0121466", "Timestamp": "Fri Jun 28 2013 11:45:54 GMT+0100 (IST)" }, { "Accuracy": "30", "Latitude": "53.2778159", "Longitude": "-9.0121201", "Timestamp": "Fri Jun 28 2013 11:45:58 GMT+0100 (IST)" }] }', true );
		// return json_decode( $this->getSongMedium( "listen" ), true );
		// return $this->getSongMedium( "listen" );	
		// $str = "{" . $this->getSongMedium( "listen" ) . "}";
		$str = $this->getSong();
		Log::info( "response:" . $str );
		return json_decode( $str, true );
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

	private function getComposers(){
		$str = "";
		$str .= "\"" . "composers" . "\"" . ": [";
		$str .= $this->getHaas();
		$str .= ",";
		$str .= $this->getHaugen();
		$str .= "]";

		Log::info( "media:" . $str );
		return $str;
	}

	private function getHaugen(){
		return '{ "_id": "marty id", "firstName": "Marty", "lastName": "Haugen", "picUrl": "url" }';		
	}

	private function getHaas(){
		return '{ "_id": "david id", "firstName": "David", "lastName": "Haas", "picUrl": "url" }';
	}

	private function getSong() {
		$str = "{";
		$str .= "\"id\":2,";
		$str .= "\"title\": \"All the Ends of the Earth\",";
		$str .= $this->getComposers() . ",";
		$str .= $this->getSongMedia();		
		$str .= "}";

		return $str;
	}

	// "media"			: [
	//     ...
	// ]
	private function getSongMedia() {
		$str = "";
		$str .= "\"" . "media" . "\"" . ": [";
		$str .= $this->getSongMedium( "listen" );
		$str .= ",";
		$str .= $this->getSongMedium( "guitar" );		
		$str .= "]";

		Log::info( "media:" . $str );
		return $str;
	}


	// 	{
	// 		"medium"		: "listen | guitar | piano | vocal | solo | others | links",
	// 		"mediumList"	: [
	// 			"listenUrl.1",
	// 			"listenUrl.2"
	// 		]
	// 	}

	private function getSongMedium( $medium )  
	{
		$str = "{";
		$str .= "\"" . "medium\":\"" . $medium . "\",";
		$str .= "\"" . "mediumList" . "\"" . ": [";
		for ( $count = 1 ; $count < 3; $count++ ) 
		{
			$str .= "\"" . $medium . "Url." . $count . "\"";
			$str .= ",";
		}
		$str = substr($str, 0, -1);
		$str .= "]";
		$str .= "}";

		Log::info( "medium:" . $str );
		return $str;
	}

}