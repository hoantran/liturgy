define(['App', 'backbone', 'marionette', 'collections/LiturgyItemCollection', 'models/liturgy' ],
    function (App, Backbone, Marionette, LiturgyItemCollection, Liturgy ) {

    var initializeLineups = function(){
        var lineups = new LiturgyItemCollection([
                { id: '1', date: 'Feb 1, 2014',  title: 'Third Sunday of Lent', liturgy_id: 1 },
                { id: '2', date: 'Feb 2, 2014',  title: 'Third Sunday of Lent', liturgy_id: 1 },
                { id: '3', date: 'Feb 3, 2014',  title: 'Third Sunday of Lent', liturgy_id: 1 },
                { id: '4', date: 'Feb 4, 2014',  title: 'Third Sunday of Lent', liturgy_id: 1 },
                { id: '5', date: 'Feb 5, 2014',  title: 'Third Sunday of Lent', liturgy_id: 1 },
                { id: '6', date: 'Apr 1, 2014',  title: 'Third Sunday of Lent', liturgy_id: 1 },
                { id: '7', date: 'May 1, 2014',  title: 'Third Sunday of Lent', liturgy_id: 1 },
                { id: '8', date: 'Nov 1, 2014',  title: 'Third Sunday of Lent', liturgy_id: 1 }
            ]);

        return lineups.models;
    };

    var API = {
        getLiturgyCalendar: function() {
            var lineups = new LiturgyItemCollection();
            var defer = $.Deferred();
            lineups.fetch({
                success: function( data ){
                    defer.resolve( data );
                }
            });

            var promise = defer.promise();
            $.when( promise ).done( function( lineups ){
                if( lineups.length === 0 ){
                    // can't contact server, make up some bogus data
                    var models = initializeLineups();
                    lineups.reset( models );
                }
            });

            return promise;
        },

        getLiturgy: function(liturgyID) {
            console.log('getLiturgy:', liturgyID);
            var liturgy = new Liturgy({ id:liturgyID });
            var defer = $.Deferred();
            liturgy.fetch({
                success: function( data ){
                    defer.resolve( data );
                },
                error: function( data ){
                    defer.resolve( undefined );
                }
            });

            return defer.promise();
        }

      // getContactEntity: function(contactId){
      //   var contact = new Entities.Contact({id: contactId});
      //   var defer = $.Deferred();
      //   setTimeout(function(){
      //     contact.fetch({
      //       success: function(data){
      //         defer.resolve(data);
      //       },
      //       error: function(data){
      //         defer.resolve(undefined);
      //       }
      //     });
      //   }, 2000);
      //   return defer.promise();
      // }
    };

    //   getContactEntities: function(){
    //     var contacts = new Entities.ContactCollection();
    //     var defer = $.Deferred();
    //     contacts.fetch({
    //       success: function(data){
    //         defer.resolve(data);
    //       }
    //     });
    //     var promise = defer.promise();
    //     $.when(promise).done(function(contacts){
    //       if(contacts.length === 0){
    //         // if we don't have any contacts yet, create some for convenience
    //         var models = initializeContacts();
    //         contacts.reset(models);
    //       }
    //     });
    //     return promise;
    //   },
    // };

    App.reqres.setHandler( "calendar:liturgies", function(){
        return API.getLiturgyCalendar();
    });

    App.reqres.setHandler( "calendar:liturgy", function(liturgyID){
        return API.getLiturgy(liturgyID);
    });

    return;
});