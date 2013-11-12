define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/about.html'
], function( $, _, Backbone, AboutTemplate ){
	var AboutView = Backbone.View.extend({
		template: _.template( AboutTemplate ),

		events: {
			"click span.song-title": "clicked"
		},

		clicked: function(){
			console.log( 'About clicked' );
		},

		render: function() {
			this.$el.html( this.template() );

			return this;
		}
	});

	return AboutView;
});