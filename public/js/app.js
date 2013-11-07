
var app = app || {};

// COMPOSER
// ................

app.Composer = Backbone.Model.extend({
	defaults: {
		"_id"			: "",
		"firstName"		: "",
		"lastName"		: "",
		"picUrl"		: ""
	}
});

app.Composers = Backbone.Collection.extend({
	model: app.Composer
});

// MEDIA
// ................
app.Medium = Backbone.Model.extend({
	defaults: {
		"medium"	: ""
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
// ................
app.Row = Backbone.Model.extend( {
	defaults: {
		"part"			: "",
		"title"			: "",
		"composers"		: ""
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
		this.items = new app.Items( this.get( 'items' ) );
		this.items.parent = this;

		this.on ( 'all', this.logChange, this );
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
		this.on ( 'all', this.logChange, this );
	}

});

// LITURGY
// ................

app.Liturgy = Backbone.Model.extend({
	urlRoot: "/liturgies",

	defaults: {
		"_id"	: "",
		"name"	: "",
		"date"	: ""
	},

	initialize: function() {
		this.sections = new app.Sections( this.get( 'sections' ) );
	},

	parse: function( response ){
		this.sections.reset( response.sections );
		delete response.sections;
		return response;
	}
});

// COMPOSER
// ................

app.Lineup = Backbone.Model.extend({
	defaults: {
		"date"			: "",
		"title"			: "",
		"liturgy_id"	: ""
	}
});

app.Lineups = Backbone.Collection.extend({
	model: 	app.Lineup,

	url: 	"liturgies"
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
		// className: 'item-row',

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

		events: {
			"click span.song-title": "clicked"
		},

		clicked: function(){
			$( "div.song-details-container" + "." + this.cid ).toggle( "slow" );
		},

		render: function() {
			this.$el.html( this.template() );

			var rowView = new app.RowView( {
				model: new app.Row({
					part: 		this.model.get( 'part' ),
					title: 		this.model.song.getSongTitle(),
					composers: 	this.model.song.getComposerLastNames()
				})
			})
			$( '.item-row-container', this.$el ).html( rowView.render().el );
			$( '.song-title', this.$el ).addClass( this.cid );

			var songView = new app.SongView( {
				model: this.model.song
			});

			$( '.song-details-container', this.$el ).html( songView.render().el );
			$( '.song-details-container', this.$el ).addClass( this.cid );

			return this;
		}
	} );

	// SECTION
	app.SectionView = Backbone.View.extend( {

		initialize: function( section ){
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
		el: '#listing',

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
		el: '#contents',

		initialize: function(){
			this.model.on( "change", this.render, this );
		},

		template: _.template( $( '#liturgy-template' ).html() ),

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ));

			var sections = this.model.sections;
			var listingView = new app.ListingView( sections );
			listingView.render();

			return this;
		}
	});

	// LINEUP
	app.LineupView = Backbone.View.extend({
		el: '#contents',

		initialize: function(){
            _.bindAll(this, "render");
            this.collection.bind( "reset", this.render );
		},

		template: _.template( $( '#lineup-template' ).html() ),

		render: function() {
			this.$el.html( this.template( { lineupList: this.collection.models } ));

			return this;
		}
	});


	// NAVIGATION
	app.NavigationView = Backbone.View.extend({
		el: '#navigation',

		initialize: function( router ){
			this.render();
			this.router = router;
		},

		events: {
			'click #home': 'displayHome'
		},

		template: _.template( $( '#navigation-template' ).html() ),

		render: function() {
			this.$el.html( this.template() );
			this.delegateEvents();
			return this;
		},

		displayHome: function( e ){
			//update url and pass true to execute route method
			 e.preventDefault(); 
			this.router.navigate( 'home', {trigger: true, replace: true } );
			return false;
		}
	});

	// ROUTER
	app.LiturgyRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'home': 'home',
			'liturgies/:id': 'getLiturgy'
		},

		initialize: function() {
			this.lineups = new app.Lineups();
			this.lineups.fetch({
				success: function(response,xhr) {
					// console.log("Inside success");
					// console.log(response);
			},
				error: function (errorResponse) {
					console.log(errorResponse)
				}
			});

			this.navigationView = new app.NavigationView ( this );
			this.lineupView = new app.LineupView( { collection: this.lineups } );
		},

		deselectNavigationButtons: function(){
			$('.navigation-button').removeClass('active');
		},

		selectNavigationButton: function( buttonSelector ){
			this.deselectNavigationButtons();
            $(buttonSelector).addClass('active');
		},

		home: function() {
			var $navigation = $( '#navigation' );
			$navigation.empty();
			$navigation.append( this.navigationView.render().el );

			var $contents = $( '#contents' );
			$contents.empty();
			$contents.append( this.lineupView.render().el );
		},

		getLiturgy: function( liturgy_id ){
			this.liturgy = new app.Liturgy( {id: liturgy_id });
			this.liturgy.fetch({
				success: function(response,xhr) {
			},
				error: function (errorResponse) {
				}
			});
			var $contents = $( '#contents' );
			$contents.empty();
			this.liturgyView = new app.LiturgyView( { model: this.liturgy } );
			$contents.append( this.liturgyView.render().el );
		}
	});


	app.router = new app.LiturgyRouter;
	// Backbone.history.start({pushState: true});
	Backbone.history.start();
} );