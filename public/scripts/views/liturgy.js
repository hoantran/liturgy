define([
	'underscore',
	'backbone',
	'views/listing',
	'text!templates/liturgy.html'
], function( _, Backbone, ListingView, LiturgyTemplate ){
	var LiturgyView = Backbone.View.extend({
		el: '#contents',

		initialize: function(){
			this.model.on( "change", this.render, this );
		},

		template: _.template( LiturgyTemplate ),

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ));

			var sections = this.model.sections;
			var listingView = new ListingView( sections );
			listingView.render();

			return this;
		}
	});

	return LiturgyView;
});