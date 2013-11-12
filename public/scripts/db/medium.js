define([
  'backbone'
], function( Backbone ){
	var Medium = Backbone.Model.extend({
		defaults: {
			"medium"	: ""
		},

		initialize: function () {
			if( !this.get( 'mediumList' )){
				this.set( { mediumList: new Array() } );
			}
		}
	});

	return Medium;
});