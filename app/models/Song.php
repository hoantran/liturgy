<?php

class Song extends Eloquent {
	protected $guarded = array();
	public static $main_song_directory = "songs";
	public $timestamps = false;

	public static $rules = array();





	public function media() {
		return $this->hasMany( 'Medium' );
	}

	public function composers() {
		return $this->belongsToMany( 'Composer' );
	}

	public static function getSongData( $song_id ){
		$song = Song::find( $song_id );

		if( NULL == $song ){
			return NULL;
		}
		else {
			$data = array(
				"_id"			=> $song->id,
				"title"			=> $song->title,
				"composers"		=> Song::getComposers( $song ),
				'media' 		=> Song::getMedia( $song )
			);

			return $data;
		}
	}

	/**
	 * Get the composers of this song
	 * @param  object of the song $song
	 * @return array of composers
	 */
	public static function getComposers( $song ){
		$composers = $song->composers->toArray();

		// delete the pivot array
		foreach ($composers as $key => $composer) {
			foreach ($composer as $element => $value) {
				if( 0 == strcmp( $element, 'pivot' )){
					// echo "pivot \n";
					unset( $composers[ $key ][ 'pivot' ] );
				}
			}
		}

		return $composers;
	}

	public static function getMedia( $song ){
		$media = $song->media;
		// $url = Song::getUrl( $song );
		$url = $song->path;
		$master = array();

		foreach( $media as $medium ){
			$fileName = $medium->file_name;
			$blowup = explode( '.', $fileName );
			$entryCount = count( $blowup );
			$type = 'other';
			if( 0 != strcmp( $fileName, '.DS_Store' ) && $entryCount >= 3 ) {
				$type = $blowup[ count( $blowup ) - 3 ];
			}
			if( !array_key_exists( $type, $master )){
				$master[ $type ] = array();
			}
			array_push( $master[ $type ], $url . "/" . $fileName );
		}

		return Song::formatMedia( $master );
	}

	public static function formatMedia( $master ){
		$list = array();
		foreach( $master as $key => $value ){
			$medium = array(
				'medium'		=> $key,
				'mediumList'	=> $value
			);
			array_push( $list, $medium );
		}
		// return array( 'media' => $list );
		return $list;
	}


	public static function classifySongMedia(){
		foreach( Song::all() as $song ) {
			echo "............ \n";
			// echo "SONG: " . $song->title . "\n";
			$mediaEntries = Song::getSongContents( $song );

			if( null != $mediaEntries ){
				foreach ( $mediaEntries as $entry ) {
					// echo "ENTRY: " . $entry . "\n";
					$blowup = explode( '.', $entry );
					$entryCount = count( $blowup );
					if( 0 == strcmp( $entry, '.DS_Store' )) {
						// skip
					}
					else if( $entryCount < 3 ){
						echo $entry . ": unknown type \n";
					}
					else {
						// echo $entry . ": " . $blowup[ count( $blowup ) - 3 ] . "\n";
					}
				}
			}
		}
	}

	/**
	 * Go through all songs in the database and refresh its contents
	 * Noted: it does not go through directories
	 */
	public static function updateAllSongMedia(){
		foreach( Song::all() as $song ) {
			// wipe out old records
			Medium::deleteSong( $song->id );

			// insert new records
			$mediaEntries = Song::getSongContents( $song );

			if( null != $mediaEntries ){
				foreach ( $mediaEntries as $entry ) {
					$blowup = explode( '.', $entry );
					$entryCount = count( $blowup );
					if( 0 == strcmp( $entry, '.DS_Store' )) {
						// skip
						// this condition should never be met
					}
					else {
						$medium = new Medium( array( 'file_name' => $entry ) );
						$medium = $song->media()->save( $medium );
					}
				}
			}
		}
	}

	public static function getSongContents( $song ){
		$mainDir = getcwd() . "/public";
		$url = Song::getUrl( $song );
		if( $url == null ){
			return null;
		} else {
			$songDir = $mainDir . "/" . Song::getUrl( $song );
			// echo "SONG (" . $song->id . "): " . $songDir . "\n";
			$contents = scandir( $songDir );
			for($index = count( $contents ) - 1; $index >= 0; $index-- ){
				if( is_dir( $mainDir . "/" . $contents[ $index ] )){
					unset( $contents[ $index ] );
				} elseif ( 0 == strcmp( $contents[ $index ], '.DS_Store' )) {
					unset( $contents[ $index ] );
				}
			}

			return $contents;
		}
	}

	public static function saveAllPaths() {
		foreach( Song::all() as $song ) {
			$song->path = Song::getUrl( $song );
			$song->save();
		}
	}

	public static function getUrl( $song ){
		$directory = Song::getSongDirectory( Song::lookupPrefix( $song ));
		if( $directory != null ){
			return Song::$main_song_directory . "/" . $directory;
		}
		else {
			return null;
		}
	}

	public static function lookupPrefix( $song ){
        // $song = Song::find( $id );
        if( isset( $song ) ){
        	$prefix = null;
        	if( isset( $song->vocalprefix ) && !empty( $song->vocalprefix ) ){
        		$prefix = $song->vocalprefix;
        	}
        	else if( isset( $song->guitarprefix ) && !empty( $song->guitarprefix ) ){
        		$prefix = $song->guitarprefix;
        	}
        	else if( isset( $song->pianoprefix ) && !empty( $song->pianoprefix ) ){
        		$prefix = $song->pianoprefix;
        	}
        	else if( isset( $song->soloprefix ) && !empty( $song->soloprefix ) ){
        		$prefix = $song->soloprefix;
        	}
        	else if( isset( $song->mp3prefix ) && !empty( $song->mp3prefix ) ){
        		$prefix = $song->mp3prefix;
        	}
        	return $prefix;
        }
        else {
        	return null;
        }
	}

	public static function getSongDirectory( $str ){
		if( isset( $str ) && !empty( $str )){
			$exploded = explode( "/", $str );
			return $exploded[ 1 ];
		}
		else {
			return null;
		}
	}
}
