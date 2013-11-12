define([
	'jquery',
	'underscore',
	'backbone',
	'views/item',
	'text!templates/section.html'
], function( $, _, Backbone, ItemView, SectionTemplate ){
	var SectionView = Backbone.View.extend({
		initialize: function( section ){
			this.render();
		},

		template: _.template( SectionTemplate ),

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ));

			var items = this.model.items;
			if( items !== null && typeof items !== 'undefined' ){
				// 1. collect all rendered DOM elements from child views
				var domEl = $([]);
				items.each( function( anItem ) {
					var itemView = new ItemView( {
						model: anItem
					});
					domEl.push( itemView.render().el );
				}, this );

				// 2. then squeeze it in the document
				$( '.section-content', this.$el ).html( domEl );
			}

			return this;
		}
	});

	return SectionView;
});