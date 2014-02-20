define( ["App"], function(App){
    App.module("SongApp", function(SongApp, App, Backbone, Marionette, $, _){

        this.on( "start", function(){
            console.log("starting SongApp ...");
        });

        SongApp.onStop = function(){
            console.log("stopping SongApp !!!");
        };
    });

    App.module("Routers.SongApp", function(SongAppRouter, App, Backbone, Marionette, $, _){
        SongAppRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "song/:id"  : "showLiturgy",
                "songsearch/:searchTerm"    : "searchSong"
            }
        });

        var executeAction = function(action, arg){
            App.startSubApp("SongApp");
            action(arg);
        };

        var API = {
            showLiturgy: function(id){
                require(["subapps/song/show/ShowController"], function(ShowController){
                    executeAction(ShowController.showLiturgy, id);
                });
            },
            searchSong: function( searchTerm ){
                require(["subapps/song/show/ShowController"], function(ShowController){
                    executeAction(ShowController.searchSong, searchTerm);
                });
            }
        };

        App.on("song:show", function(id){
            App.navigate("song/"+id);
            API.showLiturgy(id);
        });

        App.on("song:search", function( searchTerm ){
            App.navigate("songsearch/"+searchTerm);
            API.searchSong(searchTerm);
        });

        App.addInitializer(function(){
            new SongAppRouter.Router({
            controller: API
            });
        });
    });

  return App.SongAppRouter;
});

