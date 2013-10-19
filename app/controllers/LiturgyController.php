<?php

class LiturgyController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$str = $this->getLiturgy();
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

	private function getSong( $id, $title ) {
		$str = "{";
		$str .= "\"_id\":\"" . $id ."\",";
		$str .= "\"title\": \"" . $title . "\",";
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

	private function getAnItem( $part, $songId, $songTitle ){
		$str = "";
		$str .= "{";
		$str .= "\"" . "part\":\"" . $part . "\",";
		$str .= "\"" . "song\":" . $this->getSong( $songId, $songTitle ) ;
		$str .= "}";

		return $str;
	}

	private function getLiturgyItems(){
		$str = "";
		$str .= "\"" . "items" . "\"" . ": [";
		$str .= $this->getAnItem( "Processional", "3", "All the Ends of the Earth" );
		$str .= ",";
		$str .= $this->getAnItem( "Responsorial", "78", "Ps 34: Taste and See" );
		$str .= "]";

		return $str;
	}

	private function getALiturgySection( $sectionName ){
		$str = "";
		$str .= "{";
		$str .= "\"" . "name\":\"" . $sectionName . "\",";
		$str .= $this->getLiturgyItems();
		$str .= "}";

		return $str;
	}

	private function getSections(){
		$str = "";
		$str .= "\"" . "sections" . "\"" . ": [";
		$str .= $this->getALiturgySection( "A" );
		$str .= ",";
		$str .= $this->getALiturgySection( "B" );
		$str .= "]";

		return $str;
	}

	private function getLiturgy(){
		$id = 54;
		$name = "Twenty-Eight Sunday in Ordinary Time";
		$date = "Oct 23, 2033";

		$str = "";
		$str .= "{";
		$str .= "\"" . "_id\":\"" . $id . "\",";
		$str .= "\"" . "name\":\"" . $name . "\",";
		$str .= "\"" . "date\":\"" . $date . "\",";
		$str .= $this->getSections();
		$str .= "}";

		return $str;
	}
}