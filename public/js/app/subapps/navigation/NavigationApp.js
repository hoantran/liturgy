define(["App", "marionette"], function(App, Marionette){

    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "navigation" : "showNavigation"
        }
    });

    var API = {
        showNavigation: function(){
            require(["subapps/navigation/show/ShowController"], function(ShowController){
                ShowController.showNavigation();
            });
        }
    };

    App.on("navigation:show", function(){
        API.showNavigation();
    });

    App.addInitializer(function(){
        new Router({
            controller: API
        });
    });

    return Router;
});