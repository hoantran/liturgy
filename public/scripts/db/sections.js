define([
	'jquery',
  	'backbone',
  	'db/section'
], function( $, Backbone, Section ){
	var Sections = Backbone.Collection.extend({
		model: Section,

		getJSON: function(){
			var json = {};
			json[ 'items' ] = [];
			if( typeof this.models !== 'undefined' && this.models.length > 0 ) {
				this.each( function( section ){
					json[ 'items' ] = json[ 'items' ].concat( section.getJSON() );
				});
			};

			return json[ 'items' ];
		}
	});

	return Sections;
});