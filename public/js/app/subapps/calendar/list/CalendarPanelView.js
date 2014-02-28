define(['jquery', 'hbs!subapps/calendar/list/tpl/calendarPanel', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template
        });
    });