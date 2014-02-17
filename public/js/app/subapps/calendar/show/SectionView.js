define(['jquery', 'hbs!subapps/calendar/show/tpl/section', 'subapps/calendar/show/SongLayout', 'backbone', 'marionette'],
    function ($, template, ItemView, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.CompositeView.extend({
                initialize: function(){
                    // if model is defines, this view is mostly likely a child view of a nested view,
                    // this initialize method is called by the parent view constructor
                    if(this.model){
                        this.collection = new Backbone.Collection(this.model.get('items'));
                    }
                },
                template: template,
                tagName: "div",
                className: "section-border",
                itemViewContainer: "#js-section-container",
                itemView: ItemView
        });
    });