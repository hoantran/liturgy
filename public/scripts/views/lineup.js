define([
	'underscore',
  	'backbone',
  	'text!templates/lineup.html'
], function( _, Backbone, LineupTemplate ){
	var LineupView = Backbone.View.extend({
		el: '#contents',

		initialize: function(){
            this.listenTo( this.collection, 'reset', this.render);
		},

		template: _.template( LineupTemplate ),

		render: function() {
			this.$el.html( this.template( { lineupList: this.collection.models } ));
			return this;
		}
	});

	return LineupView;
});