define([
  'backbone'
], function( Backbone ){
	var Composer = Backbone.Model.extend({
		defaults: {
			"_id"			: "",
			"firstName"		: "",
			"lastName"		: "",
			"picUrl"		: ""
		}
	});

	return Composer;
});