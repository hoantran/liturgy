define(['jquery', 'hbs!subapps/calendar/show/tpl/medium','subapps/calendar/show/MediumItemView', 'collections/MediumList', 'backbone', 'marionette'],
    function ($, template, ItemView, MediumList, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CompositeView.extend({
            initialize: function(){
                // if model is defines, this view is mostly likely a child view of a nested view,
                // this initialize method is called by the parent view constructor
                // console.log('medium view model:', this.model);
                if(this.model){
                    // this.collection = this.model.getCollection();
                    this.collection = this.model;
                }
            },
            template: template,
            itemView: ItemView,
            className: "col-md-1",
            itemViewContainer: 'ul'
            // initialize: function() {
            //     this.listenTo(this.collection, "add", this.render);
            // }
        });
    });