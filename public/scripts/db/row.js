define([
  'backbone'
], function( Backbone ){
	var Row = Backbone.Model.extend({
		defaults: {
			"part"			: "",
			"title"			: "",
			"composers"		: ""
		},
	});

	return Row;
});