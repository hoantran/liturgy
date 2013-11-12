define([
  'backbone',
  'db/media',
  'db/composers'
], function( Backbone, Media, Composers  ){
	var Song = Backbone.Model.extend({
		urlRoot: "liturgies",

		initialize: function(){

			this.media = new Media( this.get( 'media' ) );
			this.media.parent = this;

			this.composers = new Composers( this.get( 'composers' ) );
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

	return Song;
});