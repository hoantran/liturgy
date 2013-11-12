define([
	'underscore',
	'backbone',
	'text!templates/row.html'
], function( _, Backbone, RowTemplate ){
	var RowView = Backbone.View.extend({
		tagName: 'div',
		// className: 'item-row',

		template: _.template( RowTemplate ),

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ));
			return this;
		}
	});

	return RowView;
});