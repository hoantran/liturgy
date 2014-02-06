define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars'],
    function ($, Backbone, Marionette, _, Handlebars) {
        var App = new Backbone.Marionette.Application();

        function isMobile() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
        }

        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            navigationRegion:   "#navigation",
            mainRegion:         "#main",
            footerRegion:       "#footer"
            // headerRegion:"header",
            // mainRegion:"#main"
        });

        App.navigate = function(route,  options){
            options = options || {};
            Backbone.history.navigate(route, options);
        };

        App.getCurrentRoute = function(){
            return Backbone.history.fragment;
        };

        App.startSubApp = function(appName, args){
            var currentApp = appName ? App.module(appName) : null;
            if (App.currentApp === currentApp){ return; }

            if (App.currentApp){
                App.currentApp.stop();
            }

            App.currentApp = currentApp;
            if(currentApp){
                currentApp.start(args);
            }
        };

        App.on("initialize:after", function(){
            if(Backbone.history){
                // require([ "subapps/navigation/NavigationApp"  ], function ( NavigationApp ) {
                require([ "subapps/calendar/CalendarApp"  ], function ( CalendarApp ) {
                    Backbone.history.start();

                    if(App.getCurrentRoute() === ""){
                        App.trigger("calendar:list");
                    }
                });
            }
        });

        App.on( 'start', function() {
            console.log( 'starting MAIN APP ...' );
        });

        App.mobile = isMobile();

        console.log( 'App Started.' );

        console.log( App );

        return App;
    });