define([
  'backbone'
], function( Backbone ){
	var Lineup = Backbone.Model.extend({
		defaults: {
			"date"			: "",
			"title"			: "",
			"liturgy_id"	: ""
		}
	});

	return Lineup;
});