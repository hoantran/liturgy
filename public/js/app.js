
var app = app || {};

app.Liturgy = Backbone.Model.extend({
	urlRoot: "liturgies"
});

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
	}
});

app.Composers = Backbone.Collection.extend({
	model: app.Composer
});

app.Medium = Backbone.Model.extend({
	defaults: {
		"medium"	: "medium not set"
	},

	initialize: function () {
		console.log ("mediumList: " + this.get( 'mediumList' ) );

		if( !this.get( 'mediumList' )){
			this.set( {mediumList: new Array() } );
		}
	}
});

app.Media = Backbone.Collection.extend({
	model: app.Medium
});

app.Song = Backbone.Model.extend({
	urlRoot: "liturgies",

	initialize: function(){
		console.log ("Song: media :" + this.get( 'media' ) );

		this.media = new app.Media( this.get( 'media' ) );
		this.media.parent = this;

		this.composers = new app.Composers( this.get( 'composers' ) );
		this.composers.parent = this;

		this.title = this.get( 'title' );		
	},

	parse: function( response ){
		console.log ( "response.media:", response.media );
		console.log ( "response.composers:", response.composers );

		this.media.reset( response.media );
		delete response.media;

		this.composers.reset( response.composers );
		delete response.composers;

		return response;
	}
});

$(function() {
	liturgy = new app.Liturgy();
	liturgy.fetch();

	song = new app.Song();
	song.fetch({
		success: function(response,xhr) {
			console.log("Inside success");
			console.log(response);
			console.log( "composers.length: " + response.composers.length );
		},
		error: function (errorResponse) {
			console.log(errorResponse)
		}
	});
});