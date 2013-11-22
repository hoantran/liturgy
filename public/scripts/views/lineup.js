define([
	'underscore',
  	'backbone',
  	'db/acl',
  	'text!templates/lineup.html'
], function( _, Backbone, ACL, LineupTemplate ){
	var LineupView = Backbone.View.extend({
		el: '#contents',

		initialize: function( options ){
            this.listenTo( this.collection, 'reset', this.render);
            this.router = options.router;
		},

		template: _.template( LineupTemplate ),

		events: {
			"click .lineup-icon-edit"		: "doEdit",
			"click .lineup-icon-duplicate"	: "doDuplicate"
		},

		doEdit: function( e ){
			console.log( 'EDIT clicked!' );
			e.preventDefault();
			var id = $(e.currentTarget).attr("id");
			console.log( 'id: ', id );
			this.router.navigate("edit/" + id, {trigger: true});
		},

		doDuplicate: function( e ){
			console.log( 'DUPLICATE clicked!' );
			e.preventDefault();
			var id = $(e.currentTarget).attr("id");
			console.log( 'id: ', id );
			this.router.navigate("duplicate/" + id, {trigger: true});
		},

		render: function() {
			// TODO: 'admin' ACL needs to be more centrally controlled
			var acl = new ACL;
			this.$el.html( this.template( { lineupList: this.collection.models, admin: acl.get( 'admin' ) } ));
			return this;
		}
	});

	return LineupView;
});