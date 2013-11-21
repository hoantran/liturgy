define([
	'underscore',
	'backbone',
	'db/simplifiedliturgy',
	'db/liturgy',
	'text!templates/editliturgy.html',
	'jquery',
	'jqueryui',
	'datetimepicker'
], function( _, Backbone, SimplifiedLiturgy, Liturgy, EditLiturgyTemplate, $ ){
	var EditLiturgyView = Backbone.View.extend({
		template: _.template( EditLiturgyTemplate ),

		initialize: function() {
			// console.log( 'INIT: ', this );
			// var liturgy = new Liturgy;
			// liturgy.set( 'id', 1 );
			// liturgy.fetch({
			// 	reset: true,

			// 	success: function(response,xhr) {
			// 		console.log("LIT:", liturgy );
			// 		console.log( 'JSON:', liturgy.toJSON() );
			// 		// console.log("RSP:", response);
			// },
			// 	error: function (errorResponse) {
			// 		console.log(errorResponse)
			// 	}
			// });
			// this.model = new Liturgy;
			// this.model.on( 'change', this.render );
			this.listenTo( this.model, 'change', this.render, this );
		},

		events: {
			'click #save': 'editLiturgy'
		},

		editLiturgy: function( e ){
			console.log( 'Add Liturgy clicked' );
			e.preventDefault();
			this.model.clear( {silent:true} );
			console.log( 'M:cleared:', this.model.toJSON() );

			var self = this;
			// console.log( 'outside this: ', this );

			$( '.liturgy-inputs' ).each( function( i, el ) {
				console.log( '..........' );
				// console.log( 'inside this: ', this );
				// console.log( 'inside self: ', self );
				// console.log( 'i: ', i );
				console.log( 'el: ', el );
				console.log( 'val: ', $( el ).val() );
				console.log( 'data_id:', $( el ).attr( 'data_id' ));
				console.log( 'data_songid:', $( el ).attr( 'data_songid' ));

				var val 			= $( el ).val();
				var data_id 		= $( el ).attr( 'data_id' );
				var data_songid 	= $( el ).attr( 'data_songid' );

				if( _.isString( data_id )){
					if( 0 == "liturgy_id".localeCompare( data_id )){
						self.model.set( 'id', val );
					}
					else if( 0 == "title".localeCompare( data_id )){
						self.model.set( 'name', val );
					}
					else if( 0 == "date".localeCompare( data_id )){
						self.model.set( 'date', val );
					}
					else if( 0 == "enable".localeCompare( data_id )){
						if( $( el ).is(":checked") ){
							self.model.set( 'enable', 1 );
						}
						else {
							self.model.set( 'enable', 0 );
						}
					}
					else {
						self.model.addItem( data_id, data_songid );
					}
				}
			});

			console.log( 'M:', this.model.toJSON() );
			this.preSave();
			this.model.save();
			this.trigger( 'done' );
		},

		preSave: function(){
			// for editing a liturgy, don't do anything
		},

		getTaskTitle: function(){
			return 'Editing';
		},

		render: function() {
			var json = this.model.getJSON();
			json[ 'taskTitle' ] = this.getTaskTitle();
			this.$el.html( this.template( json ) );

			// clear only on first click
			$('input').one('focus', function(){
    			this.value = '';
			});

			// date
			// http://bit.ly/amuj8J
			// $( '#date' ).datepicker();
			$( '#date' ).datetimepicker({
				stepMinute: 5,
				dateFormat: "D mm/dd/yy",
				timeFormat: "hh:mm TT"
			});

			// autocomplete
			// http://bit.ly/17KSMl6
			// http://bit.ly/1eqIHMQ
			$(".song-input").autocomplete({ //Line 30
              self		: this,
              source    : 'song',
              minLength : 2,
              delay     : 100,
              select    : function(event, ui){ //Line 33
                // console.log( 'event: ', event );
                console.log( 'ui: ', ui );
                // console.log( 'data: ', $( ui ).attr( 'data' ) );
                // console.log( 'selected:', ui.item ? ui.item.value :  "Nothing selected");
                // console.log( 'this: ', this );
                // console.log( 'self: ', self );
                // console.log( 'val: ', $( this ).val() );

                $( this ).attr( 'data_songid', ui.item.data );
                console.log( 'data_songid: ', $( this ).attr('data_songid') );
              }
            });

			// that's that
			return this;
		}
	});

	return EditLiturgyView;
});