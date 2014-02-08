define(["App", "marionette"], function(App, Marionette){

    console.log('navigation app starts');

    console.log('M:', Marionette);
    console.log('M.AppRouter', Marionette.AppRouter);

    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "navigation" : "showNavigation"
        }
    });

    console.log('Router defined');

    var API = {
        showNavigation: function(){
            require(["subapps/navigation/show/ShowController"], function(ShowController){
                console.log('showing the navigation');
                ShowController.showNavigation();
            });
        }
    };

    App.on("navigation:show", function(){
        console.log('RX nav show');
        API.showNavigation();
    });

    App.addInitializer(function(){
        console.log('IN nav');
        new Router({
            controller: API
        });
        console.log('OUT nav');
    });

    return Router;
});