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
        },
        fbLoggedin: function(profile){
            require(["subapps/navigation/show/ShowController"], function(ShowController){
                ShowController.changeLoginStatus(profile);
            });
        }
    };

    App.on("navigation:login", function(){
        App.navigate("login");
        // API.login();
    });

    App.on("fb:loggedin", function( profile ){
        console.log('logged in triggered:', profile);
        API.fbLoggedin(profile);
    });

    App.on("navigation:show", function(){
        API.showNavigation();
    });

    App.addInitializer(function(){
        new Router({
            controller: API
        });

        // the login is here as to circumvent popup blocker, especially on chrome
        // http://bit.ly/Okib2f
        // http://bit.ly/1myRcyS
        require([ "acl/FB" ], function () {
            // $(document).on('login', function() {
            //     FB.login(function(response) {}, {
            //         scope: 'publish_actions'
            //     });
            //     return false;
            // });

        });
    });

    return Router;
});