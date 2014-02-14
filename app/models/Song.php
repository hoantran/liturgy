<?php

class Song extends Eloquent {
	const IMPORTED_DIRECTORY 	= '0';
	const NEW_DIRECTORY 		= '1';
	const MISSING_DIRECTORY 	= '2';

	protected $guarded = array();
	public static $main_song_directory = "songs";
	public $timestamps = false;

	public static $rules = array();

	/**
	 * A song has a lot of media
	 * @return type one-to-many relationship
	 */
	public function media() {
		return $this->hasMany( 'Medium' );
	}

	/**
	 * A song can have 1 to many composers
	 * @return type many-to-many relationship
	 */
	public function composers() {
		return $this->belongsToMany( 'Composer' );
	}

	/**
	 * Get info about a song
	 * @param  Integer $song_id song id
	 * @return Array          info for a song
	 */
	public static function getSongData( $song_id ){
		$song = Song::find( $song_id );

		if( NULL == $song ){
			return NULL;
		}
		else {
			$data = array(
				"title"			=> $song->title,
				"shortNames"	=> Song::getComposerShortNames( $song ),
				'song' 			=> Song::getDetails( $song )
			);

			return $data;
		}
	}

	/**
	 * Get detailed info about a song
	 * @param  Integer $song song object
	 * @return Array          info for a song
	 */
	public static function getDetails( $song ){
		if( NULL == $song ){
			return NULL;
		}
		else {
			$data = array(
				"id"			=> $song->id,
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
	public static function getComposerShortNames( $song ){
		$composers = $song->composers->toArray();
		$shortNames = "";

		// get either last or first names
		foreach ($composers as $key => $composer) {
			$lastName = $composer['lastName'];
			$firstName = $composer['firstName'];

			if( (isset($lastName) && trim($lastName)!=='') ){
				if(trim($shortNames)!==''){
					$shortNames .= ", ";
				}
				$shortNames .= $lastName;
			}
			elseif ((isset($firstName) && trim($firstName)!=='') ) {
				if(trim($shortNames)!==''){
					$shortNames .= ", ";
				}
				$shortNames .= $firstName;
			}
		}

		return $shortNames;
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

	/**
	 * Get the media of this song
	 * @param  Eloquent Object $song ORM object of the song
	 * @return Array       media of this song
	 */
	public static function getMedia( $song ){
		$media = $song->media;
		// $url = Song::getUrl( $song );
		$url = Song::$main_song_directory . '/' . $song->path;
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

	/**
	 * Format media the way the client expects
	 * @param  Array $master media data to be formatted
	 * @return Array         formatted media data
	 */
	public static function formatMedia( $master ){
		$list = array();
		foreach( $master as $medium => $mediumList ){
			// $mediumSet = array(
			// 	'medium'		=> $medium,
			// 	'mediumList'	=> $mediumList
			// );
			// array_push( $list, $mediumSet );
			array_push( $list, Song::getDenormalizedMedium( $medium, $mediumList) );
		}
		return $list;
	}

	public static function getDenormalizedMedium($medium, $mediumList ){
		$list = array();
		foreach( $mediumList as $link ){
			array_push( $list, array(
				'medium'		=> $medium,
				'link'			=> $link
			));
		}

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

	/*
	 * DELETED DIRECTORIES
	 * behold the lamb of god
	 * nhan chung tinh yeu
	 * forever i will sing
	 * mot to quoc
	 *
	 * CHANGED DIRECTORIES
	 * benediction
	 * tu nguyen thuy
	 * toi tham tin
	 * what is the cost
	 * xin ban cho con
	 */

	// ......................................................
	//  METHODS FOR MAINTENANCE
	// ......................................................

	// TODO
	// redo all songs in db
	// import all new songs, minus archive

	public static function updateAllMedia(){
		foreach ( Song::all() as $song ) {
			Song::updateMedia( $song );
		}
	}

	public static function importNewSongs(){
		$all = Song::getClassifiedDirectories();
		foreach ($all[ self::NEW_DIRECTORY ] as $newDirectory ) {
			Song::insertNewSong( $newDirectory );
		}
	}

	public static function insertNewSong( $songDirectory ){
		$song = Song::create( array(
			'title' 	=> 'not set',
			'firstline' => 'not set',
			'path' 		=> $songDirectory
		));
		$song->save();
		Song::updateMedia( $song );
	}


	public static function getClassifiedDirectories(){
		$physicals 	= Song::getPhysicalDirectories();
		$dbs 		= Song::getDbDirectories();

		$imported 	= array_intersect( $physicals, $dbs );
		$news 		= array_diff( $physicals, $imported );
		$missing	= array_diff( $dbs, $imported );

		return array(
			self::IMPORTED_DIRECTORY 	=> $imported,
			self::NEW_DIRECTORY 		=> $news,
			self::MISSING_DIRECTORY 	=> $missing
		);
	}

	public static function getDbDirectories(){
		$imported = array();

		foreach ( Song::all() as $song ) {
			$path = $song->path;
			if( isset( $path ) && !empty( $path )){
				array_push( $imported, $path );
			}
		}

		return $imported;
	}

	public static function getPhysicalDirectories(){
		$dir = Song::getSongsPath();
		$contents = scandir( $dir );
		for($index = count( $contents ) - 1; $index >= 0; $index-- ){
			$el = $contents[ $index ];
			if(
				0 == strcmp( $el, ".") 			||
				0 == strcmp( $el, "..") 		||
				0 == strcmp( $el, ".DS_Store")
			) {
				unset( $contents[ $index ] );
			}
			elseif( !is_dir( $dir . "/" . $contents[ $index ] )){
				unset( $contents[ $index ] );
				echo '[ ' . $contents[ $index ] . ' ] is a file. Excluding it from the array.';
			}
		}
		return $contents;
	}

	public static function getSongsPath(){
		return getcwd() . "/public/" . Song::$main_song_directory;
	}


/////////////////

	/**
	 * Update a song's media
	 */
	public static function updateMedia( $song ){
		$path = $song->path;
		if( isset( $path ) && !empty( $path ) ) {
			// wipe out old records
			Medium::deleteSong( $song->id );

			// insert new records
			$mediaEntries = Song::getContents( Song::getSongsPath() . '/' . $path );

			if( null != $mediaEntries ){
				foreach ( $mediaEntries as $entry ) {
					$medium = new Medium( array( 'file_name' => $entry ) );
					$medium = $song->media()->save( $medium );
				}
			}
		}
	}

	/**
	 * Scans a song's directory and get only the media's files
	 * @param  String $fullPath full absolute path of the song
	 * @return array           media's file names
	 */
	public static function getContents( $fullPath ){
		if( isset( $fullPath ) && !empty( $fullPath ) ) {
			$contents = scandir( $fullPath );
			for($index = count( $contents ) - 1; $index >= 0; $index-- ){
				if( is_dir( $fullPath . "/" . $contents[ $index ] )){
					unset( $contents[ $index ] );
				} elseif ( 0 == strcmp( $contents[ $index ], '.DS_Store' )) {
					unset( $contents[ $index ] );
				}
			}
			return $contents;
		}
	}

	// ......................................................
	//  METHODS FOR CONVERTING OLD SONG DATA TO NEW SONG DATA
	// ......................................................


	/**
	 * Takes out 'songs' directory from paths of all songs
	 * @return none none
	 */
	public static function simplifySongPaths(){
		foreach( Song::all() as $song ) {
			$path = $song->path;
			if( isset( $path ) && !empty( $path ) ){
				$blowup = explode( '/', $path );
				if( 2 == count( $blowup ) && 0 == strcmp($blowup[ 0 ], 'songs' ) ){
					$song->path = $blowup[ 1 ];
					$song->save();
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

/// BEFORE IMPORTING NEW SONGS
// 0 => array(  // IMPORTED
//     3 => '40 days',
//     4 => 'a voice cries out',
//     5 => 'adoramus te domine',
//     6 => 'all are welcome',
//     7 => 'all creatures of our god and king',
//     8 => 'all that is hidden',
//     9 => 'all the ends of the earth',
//     10 => 'all things bright and beautiful',
//     11 => 'alleluia festivale',
//     12 => 'alleluia francisco',
//     13 => 'alleluia hat len nguoi oi',
//     14 => 'alleluia prochaska',
//     15 => 'alleluia! alleluia!',
//     16 => 'alleluia! sing to jesus',
//     17 => 'alleluia.celtic',
//     18 => 'amazing grace',
//     19 => 'america',
//     20 => 'america the beautiful',
//     21 => 'amor de dios',
//     22 => 'ang katawan ni kristo',
//     23 => 'angels we have heard on high',
//     24 => 'angels\' carol',
//     25 => 'anthem',
//     26 => 'as grains of wheat',
//     27 => 'as one unknown',
//     28 => 'as water to the thirsty',
//     29 => 'at the name of jesus',
//     30 => 'ave maria',
//     31 => 'away in a manger',
//     32 => 'ba vua hanh khuc',
//     33 => 'bai ca dang hien',
//     34 => 'be not afraid',
//     35 => 'be not afraid 2',
//     36 => 'be thou my vision',
//     37 => 'be with us mary',
//     38 => 'because the lord is my shepherd',
//     39 => 'behold the glory of god',
//     40 => 'behold the lamb',
//     41 => 'behold the wood',
//     43 => 'beyond the days',
//     44 => 'birth song',
//     45 => 'bless the lord',
//     46 => 'bless the lord.canedo',
//     47 => 'blessed be your name',
//     48 => 'blest are they',
//     49 => 'bo le ta di vao doi 3',
//     50 => 'boundless love',
//     51 => 'bread for the world',
//     53 => 'by the waking of our hearts',
//     54 => 'ca khuc hong an 1',
//     55 => 'ca khuc tram huong',
//     56 => 'cam on nguoi',
//     59 => 'canticle of the turning',
//     60 => 'cao cung len',
//     61 => 'cau cho cha me 2',
//     62 => 'cau xin thanh gia',
//     63 => 'celebramos y recordamos',
//     64 => 'center of my life',
//     65 => 'cha oi con da ve',
//     66 => 'chi mot chua',
//     67 => 'child of the poor',
//     68 => 'choral intercession schultz',
//     69 => 'christ be beside me',
//     70 => 'christ be our light',
//     72 => 'christ the lord is risen today',
//     73 => 'chua chien lanh',
//     74 => 'chua da chiem doat con',
//     75 => 'chua da len troi',
//     76 => 'chua la cay nho',
//     77 => 'chua la muc tu',
//     78 => 'chua phuc sinh',
//     79 => 'chua song lai roi',
//     80 => 'chung ket trau cau',
//     81 => 'chung nhan tinh yeu',
//     82 => 'church on fire',
//     83 => 'city of god',
//     86 => 'come lord jesus',
//     87 => 'come now is the time to worship',
//     88 => 'come taste and see',
//     89 => 'companions for the journey',
//     90 => 'con chi la tao vat',
//     92 => 'con duong chua da di qua',
//     93 => 'con han hoan',
//     94 => 'con nay tro ve',
//     96 => 'creation litany',
//     98 => 'crown him with many crowns',
//     99 => 'cry of the poor',
//     100 => 'cua le con dang',
//     101 => 'dang chua troi',
//     102 => 'dang niem cam men',
//     103 => 'daniel 3 glory and praise forever',
//     104 => 'dau an tinh yeu',
//     105 => 'dau co tinh yeu thuong',
//     108 => 'de noche',
//     109 => 'deep within',
//     110 => 'diem tinh ca 3',
//     111 => 'don\'t let your hearts be troubled',
//     112 => 'dong co tuoi',
//     113 => 'dong xanh tho',
//     114 => 'down in the river to pray',
//     115 => 'duong vao tinh yeu',
//     116 => 'earthen vessels',
//     117 => 'eat this bread',
//     118 => 'envia tu espiritu',
//     119 => 'ephata',
//     120 => 'ex 15 song at the sea',
//     121 => 'eye has not seen',
//     122 => 'flame and fire',
//     123 => 'fly like a bird',
//     124 => 'follow me',
//     125 => 'for the beauty of the earth',
//     126 => 'forever',
//     127 => 'freedom is coming',
//     128 => 'from east and west',
//     129 => 'gather us in',
//     130 => 'gather your people',
//     131 => 'gathered in the love of christ',
//     132 => 'gieo buoc tinh hong',
//     133 => 'give thanks',
//     134 => 'glory and praise to our god',
//     135 => 'go light your world',
//     136 => 'go make a difference',
//     137 => 'god has chosen me',
//     138 => 'hai nhi ten gioan',
//     139 => 'hail holy queen',
//     140 => 'hail mary gentle woman',
//     141 => 'hang belem',
//     142 => 'hark the herald',
//     143 => 'hat len bai ca',
//     144 => 'hay den hoi ban tinh ta',
//     145 => 'he is exalted',
//     146 => 'he is risen',
//     148 => 'hear our prayer o lord',
//     149 => 'here at this table',
//     150 => 'here i am lord',
//     151 => 'here i am to worship',
//     152 => 'heritage mass',
//     153 => 'hoan ca phuc sinh',
//     154 => 'hoi nguoi galile',
//     155 => 'hoi nguoi hay nho',
//     156 => 'hold me in life',
//     157 => 'holy holy holy',
//     158 => 'holy is his name',
//     161 => 'hosanna',
//     162 => 'hosanna to the son of david',
//     163 => 'hosea',
//     164 => 'how beautiful',
//     165 => 'hungry',
//     166 => 'hurd mass',
//     167 => 'huron carol',
//     168 => 'i am the bread of life',
//     169 => 'i know that my redeemer lives',
//     170 => 'i say yes lord',
//     171 => 'i want to praise your name',
//     172 => 'i will choose christ',
//     173 => 'immaculate mary',
//     174 => 'in every age',
//     175 => 'in manus tuas pater',
//     176 => 'in perfect charity',
//     177 => 'in remembrance',
//     178 => 'in the christmas spirit',
//     179 => 'in the day of the lord',
//     180 => 'in the land there is a hunger',
//     181 => 'in these days of lenten journey',
//     182 => 'in this place',
//     183 => 'increase our faith',
//     184 => 'it came upon the midnight clear',
//     185 => 'it\'s more than wine and bread',
//     186 => 'jesus be with us now',
//     187 => 'jesus christ is risen today',
//     190 => 'jesus my everything',
//     191 => 'jesus remember me',
//     192 => 'jesus the lord',
//     193 => 'join in the dance',
//     194 => 'joy to the world',
//     195 => 'joyful joyful we adore thee',
//     197 => 'just like you',
//     198 => 'khong thay ma tin',
//     199 => 'khuc dang ca',
//     200 => 'kia ai',
//     202 => 'kinh dang le',
//     203 => 'kinh hoa binh',
//     204 => 'kinh vinh danh',
//     205 => 'kyrie schultz',
//     206 => 'l\'ajuda em vindra',
//     207 => 'lang nghe loi chua',
//     209 => 'laudate omnes gentes',
//     210 => 'le vat dang chua hai nhi',
//     211 => 'lead me lord',
//     212 => 'lead us to the water',
//     214 => 'led by the spirit',
//     215 => 'len den thanh',
//     216 => 'lenten acclamation schultz',
//     217 => 'let the fire fall',
//     218 => 'let the river flow',
//     219 => 'let there be peace on earth',
//     220 => 'lift high the cross',
//     221 => 'lift up your hearts',
//     222 => 'like a child rests',
//     223 => 'linh hon toi 2',
//     224 => 'litany of the saints',
//     225 => 'loi kinh nguyen tram',
//     226 => 'loi thieng',
//     227 => 'loi vong tinh yeu',
//     228 => 'lord i lift your name on high',
//     229 => 'love has come',
//     230 => 'love never fails',
//     231 => 'love never fails.manibusan',
//     232 => 'luke 1 my soul proclaims your greatness',
//     233 => 'luke 1 my soul rejoices',
//     236 => 'maranatha',
//     237 => 'mary did you know',
//     239 => 'mass of creation',
//     240 => 'mass of glory',
//     241 => 'mass of god\'s promise',
//     242 => 'mass of joyful heart',
//     243 => 'mass of light',
//     244 => 'mass of renewal.stephan',
//     245 => 'mass of seraphim',
//     246 => 'mass of st. timothy',
//     247 => 'may the road rise',
//     248 => 'me oi con yeu me',
//     249 => 'mighty king',
//     250 => 'minh mau thanh',
//     252 => 'mua dong nam ay',
//     253 => 'mung khen giave',
//     254 => 'nada te turbe',
//     255 => 'neu cac con',
//     256 => 'neu chua la',
//     257 => 'neu co the',
//     258 => 'ngan doi thuong men',
//     259 => 'nguyen cau cho nhau',
//     260 => 'nguyen mua vong',
//     261 => 'nhu con da trang',
//     262 => 'niem tam su',
//     263 => 'niem vui tan hien',
//     264 => 'night of silence',
//     265 => 'night of silence.silent night',
//     266 => 'no longer i',
//     267 => 'now we remain',
//     268 => 'o come all ye faithful',
//     269 => 'o come emmanuel',
//     270 => 'o come little children',
//     271 => 'o come o come emmanuel',
//     272 => 'o god you search me',
//     273 => 'o little town of bethlehem',
//     274 => 'oi giesu',
//     275 => 'on eagles wings',
//     277 => 'one bread one body',
//     278 => 'one bread one cup',
//     279 => 'only this i want',
//     280 => 'open my eyes',
//     281 => 'open the eyes of my heart',
//     282 => 'our blessing cup',
//     284 => 'our god is here',
//     285 => 'ours were the griefs he bore',
//     286 => 'oyenos senor',
//     287 => 'pan de vida',
//     288 => 'parable',
//     289 => 'pescador de hombres',
//     291 => 'prayer of st francis',
//     292 => 'precious lord',
//     293 => 'prince of peace',
//     294 => 'ps 100 we are your people',
//     295 => 'ps 103 loving and forgiving',
//     296 => 'ps 104 lord send out your spirit',
//     297 => 'ps 104 send forth your spirit o lord',
//     298 => 'ps 104 send out your holy spirit',
//     299 => 'ps 107 god shepherds the poor',
//     300 => 'ps 110 most holy body and blood of christ',
//     301 => 'ps 113 nations and heavens',
//     302 => 'ps 116 i will lift up the cup of salvation',
//     303 => 'ps 116 the name of god',
//     304 => 'ps 117 go out to all the world',
//     305 => 'ps 118 easter sunday psalm',
//     306 => 'ps 118 give thanks to the lord',
//     307 => 'ps 118 let us rejoice',
//     308 => 'ps 118 this is the day',
//     309 => 'ps 118 this is the day.fisher',
//     311 => 'ps 121 god is ever wakeful',
//     312 => 'ps 122 i rejoiced',
//     313 => 'ps 123 our eyes rest on you',
//     315 => 'ps 126 the lord has done',
//     316 => 'ps 128 o blessed are those',
//     317 => 'ps 130 with the lord there is mercy',
//     318 => 'ps 137 let my tongue be silenced',
//     319 => 'ps 138 in the sight of the angels',
//     320 => 'ps 138 on the day i called',
//     321 => 'ps 139 before i was born',
//     322 => 'ps 145 i will lift up your name',
//     323 => 'ps 145 the lord is near',
//     324 => 'ps 146 bless the lord my soul',
//     325 => 'ps 146 i will praise you the lord',
//     326 => 'ps 146 praise the lord o my soul',
//     327 => 'ps 147 praise the lord',
//     328 => 'ps 15 they who do justice',
//     329 => 'ps 16 keep me safe o god',
//     330 => 'ps 16 you will show me',
//     331 => 'ps 17 i call to you god',
//     332 => 'ps 18 i love you lord my strength',
//     333 => 'ps 19 lord you have the word',
//     334 => 'ps 19 your words are spirit and life',
//     335 => 'ps 22 mi dios mi dios',
//     336 => 'ps 23 shepherd me o god',
//     337 => 'ps 23 you are my shepherd',
//     338 => 'ps 24 lord this is the people',
//     339 => 'ps 25 to you o god i lift up my soul',
//     340 => 'ps 25 to you o lord',
//     341 => 'ps 27 i believe that i shall see',
//     342 => 'ps 27 the lord is my light',
//     343 => 'ps 29 the lord will bless all people',
//     344 => 'ps 29 the lord will bless us with peace',
//     345 => 'ps 30 i will praise you lord',
//     346 => 'ps 32 i turn to you lord',
//     347 => 'ps 33 lord let your mercy',
//     348 => 'ps 34 taste and see',
//     349 => 'ps 34 taste and see.moore',
//     350 => 'ps 4 lord let your face shine upon us',
//     351 => 'ps 40 here i am',
//     352 => 'ps 41 o god heal my soul',
//     354 => 'ps 45 the queen stands',
//     355 => 'ps 47 for ascension',
//     356 => 'ps 47 god mounts his throne',
//     357 => 'ps 47 shouts of joy',
//     358 => 'ps 51 create in me',
//     359 => 'ps 54 the lord upholds my life',
//     360 => 'ps 54 the lord upholds my life.maher.booth',
//     361 => 'ps 63 my soul is thirsting',
//     362 => 'ps 65 the seed that falls',
//     363 => 'ps 66 let all the earth',
//     364 => 'ps 67 may god bless us with mercy',
//     365 => 'ps 68 you have made a home for the poor',
//     366 => 'ps 71 i will sing',
//     368 => 'ps 72 lord every nation',
//     369 => 'ps 72 lord every nation.haas',
//     370 => 'ps 78 raining down manna',
//     371 => 'ps 8 your wonderful name',
//     372 => 'ps 80 the vineyard of the lord',
//     373 => 'ps 84 how lovely',
//     374 => 'ps 85 let us see your kindness',
//     375 => 'ps 85 let us see your kindness 2',
//     376 => 'ps 85 lord show us your mercy',
//     377 => 'ps 89 forever i will sing',
//     378 => 'ps 90 in every age',
//     379 => 'ps 91 be with me',
//     380 => 'ps 92 it is good to give thanks to you',
//     381 => 'ps 93 from the clay',
//     382 => 'ps 95 if today',
//     383 => 'ps 95 if today you hear his voice',
//     384 => 'ps 95 if today.hurd',
//     385 => 'ps 95 if today.manibusan',
//     386 => 'ps 95 if today.thomson',
//     387 => 'ps 95 if you hear the voice of god',
//     389 => 'ps 96 sing a new song',
//     390 => 'ps 96 today our savior is born',
//     391 => 'ps 97 the lord is king',
//     392 => 'ps 98 all the ends',
//     393 => 'ps 98 all the ends of the earth.fisher',
//     395 => 'rain down',
//     396 => 'ready the way',
//     397 => 'ready the way.stephan',
//     398 => 'refiner\'s fire',
//     399 => 'resucito',
//     400 => 'resurrection day',
//     401 => 'rise up with him',
//     402 => 'river of glory',
//     403 => 'roll away the stone',
//     404 => 'save us o lord',
//     405 => 'seed scattered and sown',
//     406 => 'seek ye first',
//     407 => 'send down the fire',
//     408 => 'send us',
//     409 => 'servant song',
//     410 => 'set me as a seal',
//     411 => 'share the light',
//     412 => 'shine jesus shine',
//     413 => 'shout to the lord',
//     414 => 'shout to the north',
//     415 => 'silent night',
//     416 => 'sing a joyful song',
//     417 => 'sing a new song',
//     419 => 'sing of the lord\'s goodness',
//     420 => 'sing praise to god the gardener',
//     421 => 'sing to the mountains',
//     422 => 'siyahamba',
//     423 => 'somebody knockin at your door',
//     424 => 'sometimes by step',
//     425 => 'somos el cuerpo de cristo',
//     426 => 'song cho nguoi yeu',
//     427 => 'song of the body of christ',
//     428 => 'song of the cross',
//     429 => 'song of the temptation',
//     430 => 'song trong niem vui',
//     431 => 'soon and very soon',
//     433 => 'sprinkling rite',
//     434 => 'st. louis jesuits mass',
//     435 => 'stand by me',
//     436 => 'ta la banh hang song',
//     437 => 'table of plenty',
//     438 => 'take and receive',
//     439 => 'take up our cross',
//     440 => 'tam tinh hien dang',
//     441 => 'tan ca madelena',
//     442 => 'testify to love',
//     443 => 'than khi chua',
//     444 => 'than lua mien',
//     445 => 'than phan luu day',
//     446 => 'thanh than hay den',
//     447 => 'thap ngon nen hong',
//     448 => 'thay yeu chung con',
//     449 => 'the first noel',
//     450 => 'the heart of worship',
//     451 => 'the kingdom of god',
//     452 => 'the power of your love',
//     453 => 'the prayer',
//     454 => 'the sacred',
//     455 => 'the summons',
//     456 => 'the supper of the lord',
//     457 => 'there is a longing',
//     458 => 'there will be bread',
//     459 => 'there\'s a wideness in god\'s mercy.gia',
//     460 => 'there\'s a wideness in god\'s mercy.ocp',
//     461 => 'these alone are enough',
//     462 => 'they\'ll know we are christians',
//     463 => 'this alone',
//     464 => 'this is my song',
//     465 => 'thuong tien chua ba ngoi',
//     466 => 'tim ve chan thien my',
//     467 => 'tin hay khong tin',
//     468 => 'tin yeu ca',
//     469 => 'tinh cha nghia me',
//     470 => 'tinh hong dang me',
//     471 => 'tinh yeu cua chua',
//     472 => 'tinh yeu tham nong',
//     473 => 'tinh yeu thien chua',
//     474 => 'to belive in love',
//     475 => 'toi da thay nuoc',
//     477 => 'toma hay tin',
//     478 => 'ton vinh',
//     479 => 'transfigure us o lord',
//     480 => 'tren duong emmau',
//     481 => 'troi cao',
//     482 => 'trong trai tim chua yeu',
//     484 => 'tu rat xa khoi',
//     485 => 'ubi caritas',
//     487 => 'unless a grain of wheat',
//     488 => 've day nghe em',
//     489 => 'ven al banquete',
//     490 => 'veni sancte spiritus',
//     491 => 'vinh phuc',
//     492 => 'voice of christ',
//     493 => 'wade in the water',
//     494 => 'wait for the lord',
//     495 => 'we are a chosen people',
//     496 => 'we are called',
//     497 => 'we are many parts',
//     498 => 'we are one body',
//     499 => 'we are prophets',
//     500 => 'we bring our gifts to your altar',
//     501 => 'we come to your feast',
//     502 => 'we have been told',
//     503 => 'we remember',
//     504 => 'we shall overcome',
//     505 => 'we three kings',
//     506 => 'we walk by faith',
//     507 => 'we will rise again',
//     508 => 'wedding march',
//     509 => 'were you there',
//     510 => 'what child is this',
//     512 => 'what sweeter music',
//     513 => 'when i am weak then i am strong',
//     514 => 'with one voice',
//     515 => 'with rejoicing hearts',
//     516 => 'worthy is the lamb',
//     518 => 'xin ban them long tin',
//     519 => 'xin ngoi khen cha',
//     520 => 'xin vang',
//     521 => 'xuan thanh binh',
//     522 => 'yeu thuong cho nguoi',
//     524 => 'you are mine',
//     525 => 'you are near',
//     526 => 'your grace is enough'
//   ), // NEW
//   1 => array(
//     42 => 'benediction',
//     52 => 'bridal march',
//     57 => 'cantarei ao senhor',
//     58 => 'canticle of the sun',
//     71 => 'christ is arisen',
//     84 => 'come holy ghost',
//     85 => 'come holy spirit',
//     91 => 'con co mot to quoc',
//     95 => 'confitemini domino',
//     97 => 'cross of love',
//     106 => 'dau xuan cua cho gia dinh',
//     107 => 'de chua den',
//     147 => 'healing waters',
//     159 => 'holy spirit come to me',
//     160 => 'hop nhau trong khuc hat',
//     188 => 'jesus christ you are my life',
//     189 => 'jesus le christ',
//     196 => 'jubilate deo',
//     201 => 'kia ba nao',
//     208 => 'laudate dominum',
//     213 => 'lean on me',
//     234 => 'magnificat',
//     235 => 'malo malo',
//     238 => 'mass of christ the savior',
//     251 => 'misa del mundo',
//     276 => 'on the third day',
//     283 => 'our father',
//     290 => 'praise to the lord',
//     310 => 'ps 119 how i love your commands',
//     314 => 'ps 126 chua da doi xu dai luong',
//     353 => 'ps 45 arrayed in gold',
//     367 => 'ps 72 justice shall flourish',
//     388 => 'ps 96 proclaim to all the nations',
//     394 => 'ps 98 all the ends of the earth.hurd',
//     418 => 'sing alleluia',
//     432 => 'spirit come down',
//     476 => 'toi tham tin',
//     483 => 'tu nguyen thuy',
//     486 => 'ubi caritas.berthier',
//     511 => 'what is the cost',
//     517 => 'xin ban cho con',
//     523 => 'you are holy'
//   ),
//   2 => array( // MISSING

//   )

