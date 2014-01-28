define(['jquery', 'hbs!templates/calendarLayout', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend({
            template: template,

            regions: {
	            panelRegion:       "#panel-region",
	            calendarRegion:    "#calendar-region",
            }
        });
    });