define(["App", "hbs!common/tpl/loading", "spin.jquery"], function(App, loadingTpl){
    App.module("Common.Views", function(Views, App, Backbone, Marionette, $, _){
        Views.Loading = Marionette.ItemView.extend({
            template: loadingTpl,

            initialize: function(params){
                var options = params || {};
                this.title = options.title || "Loading Data";
                this.message = options.message || "Please wait, data is loading.";
            },

            serializeData: function(){
                return {
                    title: this.title,
                    message: this.message
                };
            },

            onShow: function(){
                var opts = {
                    lines: 11, // The number of lines to draw
                    length: 8, // The length of each line
                    width: 3, // The line thickness
                    radius: 8, // The radius of the inner circle
                    corners: 1, // Corner roundness (0..1)
                    rotate: 0, // The rotation offset
                    direction: 1, // 1: clockwise, -1: counterclockwise
                    color: "#000", // #rgb or #rrggbb
                    speed: 1, // Rounds per second
                    trail: 60, // Afterglow percentage
                    shadow: false, // Whether to render a shadow
                    hwaccel: false, // Whether to use hardware acceleration
                    className: "spinner", // The CSS class to assign to the spinner
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    top: "auto", // Top position relative to parent in px
                    left: "auto" // Left position relative to parent in px
                };
                $("#spinner").spin(opts);
            }
        });
    });

    return App.Common.Views;
});
