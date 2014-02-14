define(['jquery', 'subapps/calendar/show/SectionView', 'backbone', 'marionette'],
    function ($, ItemView, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CollectionView.extend({
                // tagName: "ul",
                // className: "",
                itemView: ItemView
                // initialize: function() {
                //     this.listenTo(this.collection, "add", this.render);
                // }
        });
    });