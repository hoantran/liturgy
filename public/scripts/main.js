require.config({
	paths: {
		"jquery"	: "vendor/jquery/jquery",
		"underscore": "vendor/underscore-amd/underscore",
		"backbone"	: "vendor/backbone-amd/backbone",
		"text"		: "vendor/requirejs-text/text"
	}
});

require([
	'backbone',
	'router'
], function( Backbone, Router) {
	var router = new Router;
	// Backbone.history.start({pushState: true});
	Backbone.history.start();
});