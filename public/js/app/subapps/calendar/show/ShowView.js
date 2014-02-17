define(["App",
        "hbs!subapps/calendar/show/tpl/view"],
        function(App, viewTpl){
    App.module("CalendarApp.Show.View", function(View, App, Backbone, Marionette, $, _){
        // lineup view
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
