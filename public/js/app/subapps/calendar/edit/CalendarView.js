define(['jquery', 'hbs!subapps/calendar/list/tpl/calendarListing', 'subapps/calendar/list/LiturgyItemView', 'backbone', 'marionette'],
    function ($, template, LiturgyItemView, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CompositeView.extend({
            tagName: "table",
            className: "table table-hover",
            // className: "table table-striped table-hover",
            template:template,
            itemView: LiturgyItemView,
            itemViewContainer: "tbody"
        });
    });