define([
	'jquery',
  	'backbone',
  	'views/medium'
], function( $, Backbone, MediumView ){
	var SongView = Backbone.View.extend({
		tagName: 'div',
		className: 'song-details',

		render: function(){
			var media = this.model.media;
			if( media !== null && typeof media !== 'undefined'){
				// 1. collect all rendered DOM elements from child views
				var domEl = $([]);
				media.each( function( medium ) {
					var mediumView = new MediumView( {
						model: medium
					});
					domEl.push( mediumView.render().el );
				}, this );

				// 2. then stick it in the document
				this.$el.html( domEl );
			}

			return this;
		}
	});

	return SongView;
});