define(['jquery', 'hbs!subapps/calendar/show/tpl/liturgyLayout', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend({
            template: template,

            regions: {
                titleRegion:       "#title-region",
                panelRegion:       "#panel-region",
                lineupRegion:      "#lineup-region"
            }
        });
    });