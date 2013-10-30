
var app = app || {};

// COMPOSER
// ................

app.Composer = Backbone.Model.extend({
	defaults: {
		"_id"			: "not set",
		"firstName"		: "not set",
		"lastName"		: "not set",
		"picUrl"		: "not set"
	},

	initialize: function() {
		this._id 		= this.get( '_id' );
		this.firstName 	= this.get( 'firstName' );
		this.lastName 	= this.get( 'lastName' );
		this.picUrl 	= this.get( 'picUrl' );

		this.on( "change", function( model ){
			console.log( 'a composer changed!' );
		} );
	}
});

app.Composers = Backbone.Collection.extend({
	model: app.Composer
});

// MEDIA
// ................
app.Medium = Backbone.Model.extend({
	defaults: {
		"medium"	: "medium not set"
	},

	initialize: function () {
		if( !this.get( 'mediumList' )){
			this.set( {mediumList: new Array() } );
		}
	}
});

app.Media = Backbone.Collection.extend({
	model: app.Medium
});

// SONG
// ................
app.Song = Backbone.Model.extend({
	urlRoot: "liturgies",

	initialize: function(){

		this.media = new app.Media( this.get( 'media' ) );
		this.media.parent = this;

		this.composers = new app.Composers( this.get( 'composers' ) );
		this.composers.parent = this;

		this.title = this.get( 'title' );
	},

	parse: function( response ){
		this.media.reset( response.media );
		delete response.media;

		this.composers.reset( response.composers );
		delete response.composers;

		return response;
	},

	getComposerLastNames: function() {
		var lComposers = this.composers;
		var lastNames = "";
		lComposers.each( function( aComposer ) {
			var aLastName = aComposer.get( 'lastName' );
			var aFirstName = aComposer.get( 'firstName' );
			if( this.getString( aLastName )){
				lastNames += aLastName + ", ";
			}
			else {
				if( this.getString( aFirstName )){
					lastNames += aFirstName + ", ";
				}
			}
		}, this );

		if( lastNames ){
			lastNames = lastNames.substring(0, lastNames.length - 2);
		}

		return lastNames;
	},

	getString: function ( str ){
		if( typeof str !== 'undefined' && str ){
			return str;
		}
		else {
			return '';
		}
	},

	getSongTitle: function() {
		return this.getString( this.get( 'title' ));
	}
});

// ROW

app.Row = Backbone.Model.extend( {
	defaults: {
		"part"			: "not set",
		"title"			: "not set",
		"composers"		: "not set"
	},
});

app.Item = Backbone.Model.extend({
	initialize: function(){
		this.part = this.get( 'part' );
		this.song = new app.Song( this.get ('song') );
	}
});

app.Items = Backbone.Collection.extend({
	model: app.Item
});

// SECTION
// ................
app.Section = Backbone.Model.extend({
	initialize: function(){
		this.name = this.get( 'name' );
		this.items = new app.Items( this.get( 'items' ) );
		this.items.parent = this;

		// this.on( "all", function( model ){
		// 	console.log( 'A SECTION changed!' );
		// }, this );
		this.on ( 'all', this.logChange, this );

		console.log( 'a SECTION INIT-ed' );
	},

	logChange: function() {
		console.log( 'A SECTION  changed!' );
	},

	parse: function( response ){
		this.items.reset( response.items );
		delete response.items;
		return response;
	}
});

app.Sections = Backbone.Collection.extend({
	model: app.Section,

	initialize: function(){
		// this.on( "change", function( model ){
		// 	console.log( 'SECTIONS changed!' );
		// } );
		this.on ( 'all', this.logChange, this );
		// this.on( ‘change’, this.someChange, this);

	},

	logChange: function() {
		console.log( 'SECTIONS changed!' );
	}
});

// LITURGY
// ................

app.Liturgy = Backbone.Model.extend({
	urlRoot: "liturgies",

	defaults: {
		"_id"	: "not set",
		"name"	: "not set",
		"date"	: "not set"
	},

	initialize: function() {
		this._id 	= this.get( '_id' );
		this.name 	= this.get( 'name' );
		this.date 	= this.get( 'date' );

		this.sections = new app.Sections( this.get( 'sections' ) );

		this.on( "change", function( model ){
			console.log( 'LITURGY changed!' );
		} );
	},

	parse: function( response ){
		this.sections.reset( response.sections );
		delete response.sections;
		return response;
	}
});

// ................
//       MAIN
// ................

$(function() {

	// .............
	//  VIEWS
	// .............

	// MEDIUM
	app.MediumView = Backbone.View.extend({
		tagName: 'div',
		className: 'medium-listing',

		// template: _.template( $( '#'+ this.model.get( 'medium' ) + '-medium-template' ).html() ),
		template: function( data ) {
			return _.template( $( '#'+ this.model.get( 'medium' ) + '-medium-template' ).html(), data )
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ));
			return this;
		}
	});

	// SONG
	app.SongView = Backbone.View.extend({
		tagName: 'div',
		className: 'song-details',

		render: function(){
			var media = this.model.media;
			if( media !== null && typeof media !== 'undefined'){
				// 1. collect all rendered DOM elements from child views
				var domEl = $([]);
				media.each( function( medium ) {
					var mediumView = new app.MediumView( {
						model: medium
					});
					domEl.push( mediumView.render().el );
				}, this );

				// 2. then stick it in the document
				this.$el.html( domEl );
			}

			return this;
		}
	});

	// ROW
	//
	// Backbone View automatically inserts an empty <div> if el is not specified
	// That presents a choice for the developer: lousy CSS or lousy javascript code
	//
	// LOUSY CSS wins!
	//
	// http://bit.ly/182YhKW
	// http://bit.ly/1dcptyH
	//
	app.RowView = Backbone.View.extend( {
		tagName: 'div',
		className: 'item-row',

		template: _.template( $( '#row-template' ).html() ),

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ));
			return this;
		}
	});

	// ITEM
	// an item has:
	// [] a row containing title, song-name, and composers
	// [] song details and
	// [] a simple divider
	app.ItemView = Backbone.View.extend( {
		template: _.template( $( '#item-template' ).html() ),

		render: function() {
			this.$el.html( this.template() );

			// $( '.item-row', this.$el ).html( this.model.get( 'part' ));

			var rowView = new app.RowView( {
				model: new app.Row({
					part: 		this.model.get( 'part' ),
					title: 		this.model.song.getSongTitle(),
					composers: 	this.model.song.getComposerLastNames()
				})
			})
			$( '.item-row-container', this.$el ).html( rowView.render().el );

			var songView = new app.SongView( {
				model: this.model.song
			});
			$( '.song-details-container', this.$el ).html( songView.render().el );

			return this;
		}
	} );

	// SECTION
	app.SectionView = Backbone.View.extend( {

		initialize: function( section ){
			this.section = section ;
			this.render();
		},

		template: _.template( $( '#section-template' ).html() ),

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ));

			var items = this.model.items;
			if( items !== null && typeof items !== 'undefined' ){
				// 1. collect all rendered DOM elements from child views
				var domEl = $([]);
				items.each( function( anItem ) {
					var itemView = new app.ItemView( {
						model: anItem
					});
					domEl.push( itemView.render().el );
				}, this );

				// 2. then squeeze it in the document
				$( '.section-content', this.$el ).html( domEl );
			}

			return this;
		}
	} );


	// LISTING
	app.ListingView = Backbone.View.extend({
		el: '.listing',

		initialize: function( mySections ){
			this.sections = mySections;
			this.render();
		},

		render: function() {
			var sections = this.sections;
			if( sections !== null && typeof sections !== 'undefined'){
				// 1. collect all rendered DOM elements from child views
				var domEl = $([]);
				sections.each( function( aSection ) {
					var sectionView = new app.SectionView( {
						model: aSection
					});
					domEl.push( sectionView.render().el );
				}, this );

				// 2. then stick it in the document
				this.$el.html( domEl );
			}

			return this;
		}
	});

	// LITURGY
	app.LiturgyView = Backbone.View.extend({
		el: '.container',

		initialize: function(){
			this.render();
			this.model.on( "all", this.render, this );
		},

		template: _.template( $( '#liturgy-template' ).html() ),

		render: function() {
			// tmpl is a function that takes a JSON object and returns html
			// this.el is what we defined in tagName. use $el to get access
			// to jQuery html() function
			this.$el.html( this.template( this.model.toJSON() ));

			var sections = this.model.sections;
			var listingView = new app.ListingView( sections );
			listingView.render();

			///// EFFECTS
			$( ".song-title" ).click(function() {
		  		$( ".song-details-container" ).toggle( "slow" );
			});

			return this;
		}
	});


	// BIG INSTANTIATION
	// .................
	liturgy = new app.Liturgy();
	liturgy.fetch({
		success: function(response,xhr) {
			console.log("Inside success");
			// console.log(response);
	},
		error: function (errorResponse) {
			console.log(errorResponse)
		}
	});

	liturgyView = new app.LiturgyView( { model: liturgy } );

} );