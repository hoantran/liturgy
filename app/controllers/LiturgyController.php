<?php

class LiturgyController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		// return json_encode( Liturgy::getLiturgyData( 1 ) );
		// return json_encode( $t, JSON_UNESCAPED_SLASHES );

		// $t = Liturgy::getLiturgyData( 1 );
		$t = Liturgy::getLineups();
		return json_encode( $t );
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		Log::info( 'create' );
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		Log::info( 'store' );

		// .......
		// NEW Liturgy
		$liturgy = new Liturgy;
		self::reviseWithNewInfo( $liturgy );
	}

	private function reviseWithNewInfo( $liturgy ){
		$liturgy->title = Input::get( 'name' );

		// input date format: 11/20/2013 12:45 AM
		// output date format: Y-m-d H:i:s
		$date = DateTime::createFromFormat( 'D m/d/Y h:i A', Input::get( 'date' ) );
		if( isset( $date )){
			$liturgy->date = $date->format( 'Y-m-d H:i:s' );
		}
		else {
			Log::error( 'Can not retrieve the date. Possibly user enter the unexpected format.' );
		}

		$liturgy->enable = Input::get( 'enable' );
		$liturgy->save();

		// SAVE parts
		$liturgy->parts()->detach(); // delete all existing entries for this liturgy in pivot table
		$items = Input::get( 'items' );
		foreach ($items as $item) {
			$liturgy->parts()->attach( $item[ 'item_id' ], array( 'song_id' => $item[ 'song_id' ] ));
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show( $id )
	{
		$t = Liturgy::getLiturgyData( $id );
		return json_encode( $t );
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		Log::info( 'edit: ' . $id );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		Log::info( 'update: ' . $id );

		// .......
		// SAVE Liturgy
		$liturgy = Liturgy::find( $id );
		self::reviseWithNewInfo( $liturgy );

		// // Log::info( 'JSON: ' , Input::json() );
		// $data = Input::json();
		// Log::info( Input::get('name') );

		// // .......
		// // SAVE Liturgy
		// $liturgy = Liturgy::find( $id );
		// $liturgy->title = Input::get( 'name' );

		// // input date format: 11/20/2013 12:45 AM
		// // output date format: Y-m-d H:i:s
		// $date = DateTime::createFromFormat( 'D m/d/Y h:i A', Input::get( 'date' ) );
		// if( isset( $date )){
		// 	$liturgy->date = $date->format( 'Y-m-d H:i:s' );
		// }
		// else {
		// 	Log::error( 'Can not retrieve the date. Possibly user enter the unexpected format.' );
		// }

		// $liturgy->enable = Input::get( 'enable' );
		// $liturgy->save();

		// // SAVE parts
		// $liturgy->parts()->detach(); // delete all existing entries for this liturgy in pivot table
		// $items = Input::get( 'items' );
		// foreach ($items as $item) {
		// 	$liturgy->parts()->attach( $item[ 'item_id' ], array( 'song_id' => $item[ 'song_id' ] ));
		// 	// Log::info( '...' );

		// 	// // Log::info( $value->item_id );
		// 	// // Log::info( $value->item_songid );
		// 	// Log::info( print_r( $key, true ) );
		// 	// Log::info( print_r( $value, true ) );
		// 	// Log::info( $value[ 'item_id' ]);
		// }
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		Log::info( 'destroy: ' . $id );
	}



	//...........................................................
	// METHODS FOR CREATING FAKE LITURGY DATA DURING DESIGN PHASE
	//...........................................................


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
		$str .= $this->getSongMedium( "vocal" );
		$str .= ",";
		$str .= $this->getSongMedium( "link" );
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
			if( $medium === "listen" ){
				$str .= "\"" . "media/fun/other.mp3" . "\"";
			}
			else if( $medium === "link" ){
				$str .= "\"" . "http://www.google.com" . "\"";
			}
			else {
				$str .= "\"" . "media/fun/kyrie.vocal.1.pdf" . "\"";
			}
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