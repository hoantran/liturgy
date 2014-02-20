define(['jquery', 'hbs!common/song/tpl/media','common/song/MediumView', 'backbone', 'marionette'],
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