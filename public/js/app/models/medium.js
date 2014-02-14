//define([
//  'backbone',
//  'collections/MediumList'
//], function( Backbone, MediumList ){
//	var Medium = Backbone.Model.extend({
//		defaults: {
//			"medium"	: ""
//		},

//		//construct a collection, which is most likely requested by child view of a nested view
//        getCollection: function(){
//            var collection = new MediumList();
//            collection.parseMediumData(this);
//            return collection;
//        },

//		initialize: function () {
//			if( !this.get( 'mediumList' )){
//				this.set( { mediumList: [] } );
//			}
//		}
//	});

//	return Medium;
//});

define([
  'backbone'
], function( Backbone ){
    var Medium = Backbone.Collection.extend({
    });

    return Medium;
});