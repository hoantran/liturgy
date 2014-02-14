define(['jquery', 'hbs!subapps/calendar/show/tpl/media','subapps/calendar/show/MediumView', 'backbone', 'marionette'],
    function ($, template, ItemView, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CompositeView.extend({
            template: template,
            itemView: ItemView,
            // className: "hide",
            itemViewContainer: '#js-medium-container'
            // initialize: function() {
            //     this.listenTo(this.collection, "add", this.render);
            // }
        });
    });