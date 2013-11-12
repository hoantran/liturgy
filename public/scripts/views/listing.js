define([
  'backbone',
  'views/section'
], function( Backbone, SectionView ){
	var ListingView = Backbone.View.extend({
		el: '#listing',

		initialize: function( mySections ){
			this.sections = mySections;
			this.render();
		},

		render: function() {
			var sections = this.sections;
			if( sections !== null && typeof sections !== 'undefined'){
				// 1. collect all rendered DOM elements from child views
				var domEl = $([]);
				sections.each( function( aSection ) {
					var sectionView = new SectionView( {
						model: aSection
					});
					domEl.push( sectionView.render().el );
				}, this );

				// 2. then stick it in the document
				this.$el.html( domEl );
			}

			return this;
		}
	});

	return ListingView;
});