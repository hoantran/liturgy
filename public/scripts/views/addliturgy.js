define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/addliturgy.html'
], function( $, _, Backbone, AddLiturgyTemplate ){
	var AddLiturgyView = Backbone.View.extend({
		template: _.template( AddLiturgyTemplate ),

		events: {
			'click #add': 'editLiturgy'
		},

		editLiturgy: function( e ){
			console.log( 'Add Liturgy clicked' );
			e.preventDefault();
			$( '#editLiturgy' ).children( 'input' ).each( function( i, el ) {
				console.log( '..........' );
				// console.log( 'i: ', i );
				console.log( 'el: ', el );
				console.log( 'val: ', $( el ).val() );
				console.log( 'data:', $( el ).attr( 'data' ));
			});
		},

		render: function() {
			this.$el.html( this.template() );

			return this;
		}
	});

	return AddLiturgyView;
});