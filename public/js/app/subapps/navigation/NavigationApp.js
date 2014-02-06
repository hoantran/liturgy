define( ["App"], function(App){
    App.module("NavigationApp", function(NavigationApp, App, Backbone, Marionette, $, _){

        this.on( "start", function(){
            console.log("starting NavigationApp ...");
        });

        NavigationApp.onStop = function(){
            console.log("stopping NavigationApp !!!");
        }
    });
});