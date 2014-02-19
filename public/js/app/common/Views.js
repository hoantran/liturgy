define(["App", "hbs!common/tpl/loading", "hbs!common/tpl/missing", "hbs!common/tpl/dialog", "spin.jquery"], function(App, loadingTpl, missingTpl, dialogTpl){
    App.module("Common.Views", function(Views, App, Backbone, Marionette, $, _){
        Views.Loading = Marionette.ItemView.extend({
            template: loadingTpl,

            initialize: function(params){
                var options;
                if(params) {
                    options = params;
                }
                else {
                    options = {};
                }
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
                var options = {
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
                $("#spinner").spin(options);
            }
        });


        // missing view
        Views.MissingLiturgy = Marionette.ItemView.extend({
            template: missingTpl,

            initialize: function(options){
                this.liturgyID = options.liturgyID || "unknown";
            },

            serializeData: function(){
                return {
                    liturgyID: this.liturgyID
                };
            }
        });

        // dialog box view
        Views.Dialog = Marionette.ItemView.extend({
            template: dialogTpl,

            initialize: function(params){
                var options;
                if(params) {
                    options = params;
                }
                else {
                    options = {};
                }
                this.title = options.title || "Some action title";
                this.message = options.message || "A message ...";
                this.dismiss = options.dismiss || "Cancel";
                this.operation = options.operation || "Do it!";
                this.triggerSignal = options.triggerSignal || "calendar:list";

            },

            events: {
                "click .js-diaglog-action": "actionClicked"
            },

            onShow: function(){
                var options = {};
                $('#myDialog').modal(options);
            },

            serializeData: function(){
                return {
                    title: this.title,
                    message: this.message,
                    dismiss: this.dismiss,
                    operation: this.operation
                };
            },

            actionClicked: function(e){
                e.preventDefault();
                e.stopPropagation();
                console.log('actionClicked');
                $('#myDialog', this.el).modal('hide');
                this.trigger(this.triggerSignal, this.model);
            }
        });

    });

    return App.Common.Views;
});
