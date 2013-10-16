
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
		// console.log ("mediumList: " + this.get( 'mediumList' ) );

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
		// console.log ("Song: media :" + this.get( 'media' ) );

		this.media = new app.Media( this.get( 'media' ) );
		this.media.parent = this;

		this.composers = new app.Composers( this.get( 'composers' ) );
		this.composers.parent = this;

		this.title = this.get( 'title' );		
	},

	parse: function( response ){
		// console.log ( "response.media:", response.media );
		// console.log ( "response.composers:", response.composers );

		this.media.reset( response.media );
		delete response.media;

		this.composers.reset( response.composers );
		delete response.composers;

		return response;
	}
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
	liturgy = new app.Liturgy();
	liturgy.fetch({
		success: function(response,xhr) {
			// console.log("Inside success");
			console.log(response);
		},
		error: function (errorResponse) {
			console.log(errorResponse)
		}
	});
});