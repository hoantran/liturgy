<?php

class Song extends Eloquent {
	protected $guarded = array();
	public static $main_song_directory = "songs";

	public static $rules = array();

	public function media() {
		return $this->hasMany( 'Medium' );
	}

	public function composers() {
		return $this->belongsToMany( 'Composer' );
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
			echo "SONG (" . $song->id . "): " . $songDir . "\n";
			$contents = scandir( $songDir );
			for($index = count( $contents ) - 1; $index >= 0; $index-- ){
				if( is_dir( $mainDir . "/" . $contents[ $index ] )){
					unset( $contents[ $index ] );
				}
			}
			return $contents;
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
