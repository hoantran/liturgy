define([
  'backbone'
], function( Backbone ){
	var ACL = Backbone.Model.extend({
		defaults: {
			"admin"			: 1
		}
	});

	return ACL;
});