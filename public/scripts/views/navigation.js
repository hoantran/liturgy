define([
	'underscore',
  	'backbone',
  	'db/menu',
  	'text!templates/navigation.html'
], function( _, Backbone, Menu, NavigationTemplate ){
	var NavigationView = Backbone.View.extend({
		el: '#navigation',

		initialize: function( router ){
			this.router = router;
			this.model = new Menu;
			// console.log ( 'menu', this.model );
			this.render();
		},

		events: {
			'click #home': 'displayHome',
			'click #about': 'displayAbout',
			'click #edit': 'displayEdit'
		},

		template: _.template( NavigationTemplate ),

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
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
			 e.preventDefault();
			this.router.navigate( 'about', {trigger: true, replace: true } );
			return false;
		},

		displayEdit: function( e ){
			//update url and pass true to execute route method
			 e.preventDefault();
			this.router.navigate( 'edit', {trigger: true, replace: true } );
			return false;
		}
	});

	return NavigationView;
});