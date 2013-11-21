define([
	'views/editliturgy'
], function( EditLiturgyView ){
	var DuplicateLiturgyView = EditLiturgyView.extend({

		preSave: function(){
			// for duplicating a liturgy, take out the 'id' attribute so that
			// the laravel 4 on the server end would call 'store' method on the controller
			console.log( 'DuplicateView: preSave' );
			this.model.unset( 'id', { silent: true });
		},

		getTaskTitle: function(){
			return 'Duplicating';
		}

	});

	return DuplicateLiturgyView;
});