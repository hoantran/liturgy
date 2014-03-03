define(["App", "subapps/navigation/show/ShowView", "underscore" ], function(App, View){
    return {
        showNavigation: function(){
            require([ "entities/SessionEntity", "entities/Choir" ], function () {
                var session = App.request("entities:session");
                var choir = App.request("choir:choir");
                _.extend( session, choir );
                var view = new View.Message({model:session});

                view.on("home:clicked", function(childView, model){
                    App.trigger("calendar:list");
                });

                view.on("brand:clicked", function(childView, model){
                    App.trigger("calendar:list");
                });

                view.on("song:search", function(searchTerm){
                    App.trigger("song:search", searchTerm);
                });

                App.navigationRegion.show(view);
            });
        },

        changeLoginStatus: function(profile){
            require([ "entities/SessionEntity" ], function () {
                var session = App.request("entities:session");
                session.trigger("reset");
            });
        }
    };
});
