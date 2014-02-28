define([
  'backbone',
  'underscore',
  'models/sections'
], function( Backbone, _, Sections ){
	var Liturgy = Backbone.Model.extend({
		urlRoot: "/liturgies",

		defaults: {
			// "_id"	: "",
			"title"	: "",
			"date"	: ""
		},

		populate: function(options){
			if( options ){
				this.set('id', options.get( 'id' ));
				this.set('title', options.get( 'title' ));
				this.set('date', options.get( 'date' ));
				this.set('enable', options.get( 'enable' ));
				this.set('sections', options.get( 'sections' ));
			}
		},

		addItem: function( item_id, song_id ){
			if(typeof this.get( 'items' ) === 'undefined'){
				this.set( 'items', [] );
			}
			this.get( 'items' ).push( {
				'item_id': item_id,
				'song_id': song_id
			});
		},

		validate: function(attrs, options){
			var errors = {};
			if( !attrs.title ){
				errors.title = "Liturgy title can not be blank";
			}
			if( !attrs.date ){
				errors.date = "Liturgy date can not be blank";
			}

			if( !_.isEmpty( errors )){
				return errors;
			}
		},

		initialize: function(options) {
			this.sections = new Sections( this.get( 'sections' ) );
		}

		//parse: function( response ){
		//	this.sections.reset( response.sections );
		//	delete response.sections;
		//	return response;
		//}
	});

	return Liturgy;
});