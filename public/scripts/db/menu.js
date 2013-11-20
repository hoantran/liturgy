define([
  'backbone'
], function( Backbone ){
	var Menu = Backbone.Model.extend({
		defaults: {
			"home"			: true,
			"about"			: true,
			"addLiturgy"	: true
		}
	});

	return Menu;
});