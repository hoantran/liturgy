define([
  'backbone',
  'db/sections'
], function( Backbone, Sections ){
	var Liturgy = Backbone.Model.extend({
		urlRoot: "/liturgies",

		defaults: {
			"_id"	: "",
			"name"	: "",
			"date"	: ""
		},

		initialize: function() {
			this.sections = new Sections( this.get( 'sections' ) );
		},

		parse: function( response ){
			this.sections.reset( response.sections );
			delete response.sections;
			return response;
		}
	});

	return Liturgy;
});