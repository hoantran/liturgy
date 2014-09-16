define(["App"], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.Choir = Backbone.Model.extend({
        // Model Constructor
        // urlRoot: "/choir",

        initialize: function() {
        },

        // hardcoded for Faith choir:
        // TODO: retrieve it from the server
        defaults: {
            "name"          : "Faith Choir",
            "nameBold"      : "FAITH CHOIR",
            "slogan"        : "Sing for Fun! Eat for Real!",
            "headline"      : "Ever Faithful",
            "jumboUrl"      : "../img/featured.jpg",
            "parishUrl"     : "http://www.stelizabethmilpitas.org",
            "serving"       : "Serving St. Elizabeth Parish 9:30 AM Sunday Community, Milpitas, CA"
        },
        // hardcoded for FLOCK choir:
        // TODO: retrieve it from the server
        // defaults: {
        //     "name"          : "FLOCK Choir",
        //     "nameBold"      : "FLOCK CHOIR",
        //     "slogan"        : "We'll sing for food!",
        //     "headline"      : "One Voice!",
        //     "jumboUrl"      : "../img/flock.jpg",
        //     "parishUrl"     : "http://www.stpatrickvn.org",
        //     "serving"       : "Serving Our Lady of Lavang Parish 8:30 PM Youth Mass Community, San Jose, CA"
        // },

        // Get's called automatically by Backbone when the set and/or save methods are called (Add your own logic)
        validate: function(attrs) {
        }
    });

    var API = {
        getChoir: function(){
            if(Entities.choir === undefined){
                Entities.choir = new Entities.Choir();
            }
            return Entities.choir;
        }
    };

    App.reqres.setHandler("choir:choir", function(){
        return API.getChoir();
    });

  });

  return ;
});
