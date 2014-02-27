define(["App"], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.Session = Backbone.Model.extend({
        // Model Constructor
        urlRoot: "/session",

        initialize: function() {
        },

        // Default values for all of the Model attributes
        defaults: {
            "fbname": "Login",
            "pic"   : "",
            "uid"   : "",
            "token" : "",
            "loggedIn"  : false
        },

        isLoggedIn: function(){
            return this.get('loggedIn');
        },

        setLoggedIn: function(){
            this.set('loggedIn', true);
        },


        // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
        validate: function(attrs) {
        }
    });

    var API = {
        getSession: function(){
            if(Entities.session === undefined){
                Entities.session = new Entities.Session();
            }
            return Entities.session;
        },

        registerWithServer: function(session) {
            var defer = $.Deferred();
            session.unset('id');    // make sure we'd call store function on the server's controller
            session.save(null, {
                success: function( data ){
                    defer.resolve( data );
                },
                error: function( data ){
                    console.log('error:', data);
                    defer.resolve( undefined );
                }
            });

            return defer.promise();
        },

        loggedIn: function(session,token){
            console.log('logged in');
            session.set('token', token);
            session.setLoggedIn();

            // the use of ajaxSetup is generally not recommended for it may screw up jquery plugins
            $.ajaxSetup({
                headers: {'X-CSRF-Token': token}
            });
        },

        loggedOut: function(session){
            console.log('logged out');
            session.clear().set(session.defaults);
            $.ajaxSetup({
                headers: ""
            });
        }

    };

    App.reqres.setHandler("entities:session", function(){
        return API.getSession();
    });

    App.reqres.setHandler("entities:session:register", function(){
        return API.registerWithServer(API.getSession());
    });

    App.reqres.setHandler("entities:session:loggedIn", function(token){
        return API.loggedIn(API.getSession(), token);
    });

    App.reqres.setHandler("entities:session:loggedOut", function(token){
        return API.loggedOut(API.getSession());
    });

  });

  return ;
});
