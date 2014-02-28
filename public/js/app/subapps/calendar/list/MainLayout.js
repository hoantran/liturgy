define(['jquery', 'hbs!subapps/calendar/list/tpl/main', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend({
            template: template,

            regions: {
                jumbotronRegion:    "#jumbotron",
                contentRegion:      "#content"
            }
        });
    });