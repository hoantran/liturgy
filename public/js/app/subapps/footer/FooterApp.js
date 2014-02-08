define(["App", "marionette"], function(App, Marionette){
    console.log('footer app starts');


    console.log('f.M:', Marionette);
    console.log('f.M.AppRouter', Marionette.AppRouter);

    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "footer" : "showFooter"
        }
    });

    var API = {
        showFooter: function(){
            require(["subapps/footer/show/ShowController"], function(ShowController){
                console.log('showing the footer');
                ShowController.showFooter();
            });
        }
    };

    App.on("footer:show", function(){
        API.showFooter();
    });

    App.addInitializer(function(){
        new Router({
            controller: API
        });
    });

    return Router;
});