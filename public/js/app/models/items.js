define([
  'backbone',
  'models/item'
], function( Backbone, Item ){
	var Items = Backbone.Collection.extend({
		model: Item,

		getJSON: function() {
			var json = [];
			if( typeof this.models !== 'undefined' && this.models.length > 0 ) {
				this.each( function( item ){
					json.push( item.getJSON() );
				});
			}

			return json;
		}
	});

	return Items;
});