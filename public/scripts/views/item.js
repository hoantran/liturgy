define([
	'jquery',
	'underscore',
	'backbone',
	'views/row',
	'db/row',
	'views/song',
	'text!templates/item.html'
], function( $, _, Backbone, RowView, Row, SongView, ItemTemplate ){
	var ItemView = Backbone.View.extend({
	// ITEM
	// an item has:
	// [] a row containing title, song-name, and composers
	// [] song details and
	// [] a simple divider
		template: _.template( ItemTemplate ),

		events: {
			"click span.song-title": "clicked"
		},

		clicked: function(){
			$( "div.song-details-container" + "." + this.cid ).toggle( "slow" );
		},

		render: function() {
			this.$el.html( this.template() );

			var rowView = new RowView( {
				model: new Row({
					part: 		this.model.get( 'part' ),
					title: 		this.model.song.getSongTitle(),
					composers: 	this.model.song.getComposerLastNames()
				})
			})
			$( '.item-row-container', this.$el ).html( rowView.render().el );
			$( '.song-title', this.$el ).addClass( this.cid );

			var songView = new SongView( {
				model: this.model.song
			});

			$( '.song-details-container', this.$el ).html( songView.render().el );
			$( '.song-details-container', this.$el ).addClass( this.cid );

			return this;
		}
	});

	return ItemView;
});