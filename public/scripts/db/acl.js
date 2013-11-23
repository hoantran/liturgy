define([
  'backbone'
], function( Backbone ){
	var ACL = Backbone.Model.extend({
		defaults: {
			"admin"			: 0
		}
	});

	return ACL;
});