define([
  'backbone',
  'db/item'
], function( Backbone, Item ){
	var Items = Backbone.Collection.extend({
		model: Item
	});

	return Items;
});