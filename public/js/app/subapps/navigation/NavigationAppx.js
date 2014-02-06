define(["App"], function(App){
App.module("NavigationApp", function(NavigationApp, App, Backbone, Marionette, $, _){

this.on( "start", function(){
console.log("starting NavigationApp ...");
}) ;

NavigationApp.onStop = function(){
console.log("stopping NavigationApp");
};

var API = {
listHeader: function(){
ListController.listHeader();
}
};

// ContactManager.commands.setHandler("set:active:header", function(name){
// ListController.setActiveHeader(name);
// });

// Header.on("start", function(){
// API.listHeader();
// });
});

return App.NavigationApp;
});