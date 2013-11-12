define([
	'underscore',
  	'backbone',
  	'text!templates/navigation.html'
], function( _, Backbone, NavigationTemplate ){
	var NavigationView = Backbone.View.extend({
		el: '#navigation',

		initialize: function( router ){
			this.render();
			this.router = router;
		},

		events: {
			'click #home': 'displayHome',
			'click #about': 'displayAbout'
		},

		template: _.template( NavigationTemplate ),

		render: function() {
			// console.log( 'template: NAV RENDER' );
			this.$el.html( this.template() );
			this.delegateEvents();
			return this;
		},

		displayHome: function( e ){
			//update url and pass true to execute route method
			 e.preventDefault();
			this.router.navigate( 'home', {trigger: true, replace: true } );
			return false;
		},

		displayAbout: function( e ){
			//update url and pass true to execute route method
			console.log( 'displayAbout' );
			console.log( 'Nav Router: ', this.router );
			 e.preventDefault();
			this.router.navigate( 'about', {trigger: true, replace: true } );
			return false;
		}
	});

	return NavigationView;
});