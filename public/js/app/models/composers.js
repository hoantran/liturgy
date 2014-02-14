define([
  'backbone',
  'models/composer'
], function( Backbone, Composer ){
	var Composers = Backbone.Collection.extend({
		model: Composer
	});

	return Composers;
});