define([
  'backbone',
  'models/media',
  'models/composers'
], function( Backbone, Media, Composers  ){
	var Song = Backbone.Model.extend({
		urlRoot: "song",

		defaults: {
			id: "",
			title: "",
            shortNames: "",
            song: {}
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