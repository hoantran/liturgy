define([
  'backbone',
  'db/lineup'
], function( Backbone, Lineup ){
	var Lineups = Backbone.Collection.extend({
		model: 	Lineup,
		url: 	"liturgies",
	});

	return Lineups;
});