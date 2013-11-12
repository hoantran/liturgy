define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/media.html'
], function( $, _, Backbone, MediaTemplates ){
	var MediumView = Backbone.View.extend({
		tagName: 'div',
		className: 'medium-listing',

		template: function( data ) {
			// var Reflector = function( obj ){
			//   this.getProperties = function() {
			//     var properties = [];
			//     for (var prop in obj) {
			//       if (typeof obj[prop] != 'function') {
			//         properties.push(prop);
			//       }
			//     }
			//     return properties;
			//   };

			// this.getAllMethods = function() {
			//   var methods = [];
			//   for (var method in obj) {
			//     if (typeof obj[method] == 'function') {
			//       methods.push(method);
			//     }
			//   }
			//   return methods;
			// };
			// };

			var selector = '#'+ this.model.get( 'medium' ) + '-medium-template';
			var html = $( selector, MediaTemplates ).html();
			return _.template( html, data );
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ));
			return this;
		}
	});

	return MediumView;
});