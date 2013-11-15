define([
	'jquery',
	'db/lineups',
	'views/navigation',
	'views/lineup',
	'db/liturgy',
	'views/medium',
	'db/medium',
	'views/liturgy',
	'views/about',
	'views/addliturgy'
], function( $, Lineups, NavigationView, LineupView, Liturgy, MediumView, Medium, LiturgyView, AboutView, AddLiturgyView ) {
	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'home': 'home',
			'about': 'about',
			'add': 'addLiturgy',
			'liturgies/:id': 'getLiturgy'
		},

		initialize: function() {
			var medium = new Medium( {
				"medium"	: "guitar",
				"mediumList": [ 'red', 'green', 'blue' ]
			});

			var mediumView = new MediumView( { model: medium });
			mediumView.render();

			this.lineups = new Lineups();
			this.lineups.fetch({
				reset: true,

				success: function(response,xhr) {
					// console.log("Inside Lineup success", this );
					// console.log(response);
			},
				error: function (errorResponse) {
					console.log(errorResponse)
				}
			});

			this.navigationView = new NavigationView ( this );
			this.lineupView = new LineupView( { collection: this.lineups } );
			this.aboutView = new AboutView;

			this.listenTo( this.lineups, 'reset', this.home );
		},

		deselectNavigationButtons: function(){
			$('.navigation-button').removeClass('active');
		},

		selectNavigationButton: function( buttonSelector ){
			this.deselectNavigationButtons();
            $(buttonSelector).addClass('active');
		},

		home: function() {
			var $navigation = $( '#navigation' );
			$navigation.empty();
			$navigation.append( this.navigationView.render().el );

			var $contents = $( '#contents' );
			$contents.empty();
			$contents.append( this.lineupView.render().el );
		},

		about: function() {
			console.log( 'Router:about' );
			// var $navigation = $( '#navigation' );
			// $navigation.empty();
			// $navigation.append( this.navigationView.render().el );

			// var aboutView = new AboutView;
			var $contents = $( '#contents' );
			$contents.empty();
			$contents.append( this.aboutView.render().el );
		},

		addLiturgy: function() {
			console.log( 'Router:Add Lit' );
			// var $navigation = $( '#navigation' );
			// $navigation.empty();
			// $navigation.append( this.navigationView.render().el );

			var addLiturgyView = new AddLiturgyView;
			var $contents = $( '#contents' );
			$contents.empty();
			$contents.append( addLiturgyView.render().el );
		},

		// paintLiturgy: function() {
		// 	console.log( 'ROUTER liturgyReset' );
		// 	var $contents = $( '#contents' );
		// 	$contents.empty();
		// 	$contents.append( this.liturgyView.render().el );
		// },

		getLiturgy: function( liturgy_id ){
			this.liturgy = new Liturgy( { id: liturgy_id } );
			this.liturgy.fetch({
				success: function(response,xhr) {
			},
				error: function (errorResponse) {
				}
			});
			this.liturgyView = new LiturgyView( { model: this.liturgy } );
			// this.listenTo( this.liturgy, 'change', this.paintLiturgy );
		}
	});

	return Router;
});