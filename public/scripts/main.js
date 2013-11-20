require.config({
	paths: {
		"jquery"			: "vendor/jquery/jquery",
		"jqueryui"			: "vendor/jquery-ui/jquery-ui-1.10.3.custom",
		"datetimepicker"	: "vendor/date-time-picker/jquery-ui-timepicker-addon",
		"underscore"		: "vendor/underscore-amd/underscore",
		"backbone"			: "vendor/backbone-amd/backbone",
		"text"				: "vendor/requirejs-text/text"
	},
	shim: {
		"jqueryui": {
			export: "$",
			deps: [ 'jquery' ]
		},

		"datetimepicker": {
			export: "$",
			deps: [ 'jqueryui' ]
		}
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