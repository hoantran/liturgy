define([
  'backbone',
  'models/song'
], function( Backbone, Song ){
	var Item = Backbone.Model.extend({
		initialize: function(){
			this.part = this.get( 'part' );
			this.song = new Song( this.get ('song') );
			this.set({
				title: this.get( 'song'	).title
			});
			console.log('item title:', this.get('title'));
		},

		getJSON: function(){
			// label: item_label,
			// labelid: item_label_id,
			// songid: item_song_id,
			// songtitle: item_song_title
			var json = {};
			json.label = this.get( 'part'	);
			json.labelid = this.get( 'id'		);
			json.songid = this.get( 'song'	).id;
			json.songtitle = this.get( 'song'	).title;

			return json;
		}
	});

	return Item;
});