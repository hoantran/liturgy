define([
  'backbone',
  'db/Medium'
], function( Backbone, Medium ){
	var Media = Backbone.Collection.extend({
		model: Medium
	});

	return Media;
});