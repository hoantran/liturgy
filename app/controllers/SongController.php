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

		Log::info( 'term:' . $term );
		// if( !empty( $term )){
		// 	Log::info( 'POSITIVE' );
		// }

		$search = DB::table( 'songs' )
						->where( 'title', 'LIKE', '%'.$term.'%' )
						->orWhere( 'firstline', 'LIKE', '%'.$term.'%' )
						->take( self::SEARCH_COUNT_LIMIT )
						->get();
		Log::info( 'search:', $search );

		$data = array();
		foreach ($search as $song) {
			array_push( $data, array(
				'label'			=>	$song->title,
				'data'			=>	$song->id
			));
		}

		// $t = '[{"label":"bulwinkle", "data":"sail"}, {"label":"rocky", "data":"lalala"}, {"label":"annie", "data":"bicycle"}]';
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
		Log::info( 'show' );
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