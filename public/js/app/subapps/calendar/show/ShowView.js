define(["App",
        "hbs!subapps/calendar/show/tpl/missing",
        "hbs!subapps/calendar/show/tpl/view"],
        function(App, missingTpl, viewTpl){
    App.module("CalendarApp.Show.View", function(View, App, Backbone, Marionette, $, _){
        View.MissingLiturgy = Marionette.ItemView.extend({
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

        View.Liturgy = Marionette.ItemView.extend({
            template: viewTpl,

            events: {
                "click a.js-edit": "editClicked"
            },

            editClicked: function(e){
                e.preventDefault();
                this.trigger("calendar:edit", this.model);
            }
        });
    });

    return App.CalendarApp.Show.View;
});
