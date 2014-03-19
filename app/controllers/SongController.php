<?php

class SongController extends \BaseController {
	const SEARCH_COUNT_LIMIT = 20;

	/**
	 * Display a listing of the resource.
	 *
	 * Consider purifying/sanitizing the inputs:
	 * http://bit.ly/VaJeg2
	 * http://bit.ly/PTDcjd
	 *
	 * @return Response
	 */
	public function index()
	{
		$term = Input::get('term');
		$searchTerm = Input::get('searchTerm');

		// search and return a BRIEF collection of possible songs
		if( !empty( $term )){
			return self::getBriefResults( $term );
		}
		// search and return a DETAILED collection of possible songs
		elseif (!empty( $searchTerm )) {
			return self::getDetailedResults( $searchTerm );
		}
		// list songs?
		else {
		}
	}

	/**
	 * search db for title or firstline that is similar to the term passed in
	 * @param  String $term search term
	 * @return array       array of objects from the db containing only: id and title columns
	 */
	private function searchSong( $term ){
		$search = DB::connection('worship')->table( 'songs' )
						->where( 'title', 'LIKE', '%'.$term.'%' )
						->orWhere( 'firstline', 'LIKE', '%'.$term.'%' )
						->take( self::SEARCH_COUNT_LIMIT )
						->get( array( 'id', 'title' )) ;
		// Log::info( 'search:', $search );

		return $search;
	}

	private function getBriefResults( $term ){
		// Log::info( 'term is :' . $term );

		$search = self::searchSong( $term );

		$data = array();
		foreach ($search as $song) {
			// finding short last names of composer for each incurs another DB hit
			$songHandle = Song::find( $song->id );
			$shortNames = Song::getComposerShortNames( $songHandle );
			array_push( $data, array(
				'label'			=>	$song->title,
				'data'			=>	$song->id,
				'composers'		=>	$shortNames
			));
		}

		// return json_decode( $t );
		return json_encode( $data );
	}

	private function getDetailedResults( $term ){
		// Log::info( 'search term is :' . $term );

		$search = self::searchSong( $term );

		$data = array();
		foreach ($search as $song) {
			// $songData = Song::getSongData( $song->id );
			array_push( $data, Song::getSongData( $song->id ) );
		}

		// return json_decode( $t );
		return json_encode( $data );
	}

	//DB::table( 'songs' )->where( 'title', 'LIKE', "%there%" )->orWhere( 'firstline', 'LIKE', '%there%' )->take( 5 )->get();

	static public function replacePunctuationWithSpace( $term ){
		if( !self::IsNullOrEmptyString( $term )){
			return preg_replace("/[\.\,\:\;\?\-\!]/i", " ", $term);
		}
	}

	static public function IsNullOrEmptyString($question){
    	return (!isset($question) || trim($question)==='');
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
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		Log::info( 'showing song(' . $id . ')' );
		$t = Song::getSongData( $id );
		if( is_null( $t ) ){
			return Response::json('song ('. $id . ') not found', 404);
		}
		else {
			return json_encode( $t );
		}
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		Log::info( 'edit' );
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		Log::info( 'update' );
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		Log::info( 'destroy' );
	}

}