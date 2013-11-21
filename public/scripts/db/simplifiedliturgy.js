define([
	'underscore',
	'backbone',
	'db/liturgy'
], function( _, Backbone, Liturgy ){
	var SimplifiedLiturgy = Backbone.Model.extend({
		urlRoot: "/liturgies",

		// SCHEMA
		//
		// {
		// 	id: liturgy_id,
		// 	name: liturgy_name,
		// 	date: liturgy_date,
		// 	items: [
		// 		{
		// 			label: item_label,
		// 			labelid: item_label_id,
		// 			songid: item_song_id,
		// 			songtitle: item_song_title
		// 		}
		// 	]
		// }

		defaults: {
			"id"	: "",
			"name"	: "",
			"date"	: "",
			"enable": "",
			"items"	: []
		},

		addItem: function( item_id, song_id ){
			console.log( 'item: ', item_id );
			console.log( 'song: ', song_id );
			if(typeof this.get( 'items' ) === 'undefined'){
				this.set( 'items', [] );
			}
			this.get( 'items' ).push( {
				'item_id': item_id,
				'song_id': song_id
			});
		},

		initialize: function( liturgy_id ) {
			// console.log( 'SimplifiedLiturgy: INIT' );
			// this.sections = new Sections( this.get( 'sections' ) );
			this.set( 'id', 23 );
			// console.log( 'SL', this );

			var liturgy = new Liturgy;
			liturgy.set( 'id', liturgy_id );
			var self = this;
			liturgy.fetch({
				reset: true,

				success: function(response,xhr) {
					// console.log("LIT:", liturgy );
					// console.log( 'JSON:', liturgy.toJSON() );
					self.model.trigger( 'change' );
					// console.log("RSP:", response);
			},
				error: function (errorResponse) {
					console.log(errorResponse)
				}
			});
			this.model = liturgy;
			this.listenTo( this.model, 'change', this.parseLiturgy );

		},

		parseLiturgy: function(){
			// console.log( "PARSE:", this.model );
			// console.log( 'sections:', this.model );
			// console.log( 'getJSON', this.getJSON() );
			this.trigger( 'change' );
		},

		getJSON: function(){
			var json = {}; // TO DO: add in root data (like liturgy name, date ... )
			json[ 'id' ] = this.model.get( 'id' );
			json[ 'name' ] = this.model.get( 'name' );
			json[ 'date' ] = this.model.get( 'date' );
			json[ 'enable' ] = this.model.get( 'enable' );
			if( typeof this.model.sections !== 'undefined') {
				json[ 'items' ] = this.model.sections.getJSON();
			}
			// return JSON.stringify( json );
			return json;
		},

		parse: function( response ){
			// var items = response.items;
			if( typeof response.items !== 'undefined') {
				_.each( response.items, function( value, key, list ){
					// console.log( '....' );
					// console.log( 'value', value );
					// console.log( 'key', key );
					// console.log( 'list', list );
				});
			}

			// log.console( 'RSP: ', response );

			delete response.items;
			return response;

			// this.sections.reset( response.sections );
			// delete response.sections;
			// return response;
		}
	});

	return SimplifiedLiturgy;
});