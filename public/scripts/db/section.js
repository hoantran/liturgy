define([
  'backbone',
  'db/items'
], function( Backbone, Items ){
	var Section = Backbone.Model.extend({
		initialize: function(){
			this.items = new Items( this.get( 'items' ) );
			this.items.parent = this;
		},

		parse: function( response ){
			this.items.reset( response.items );
			delete response.items;
			return response;
		}
	});

	return Section;
});