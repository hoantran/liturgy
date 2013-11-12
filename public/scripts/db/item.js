define([
  'backbone',
  'db/song'
], function( Backbone, Song ){
	var Item = Backbone.Model.extend({
		initialize: function(){
			this.part = this.get( 'part' );
			this.song = new Song( this.get ('song') );
		}
	});

	return Item;
});