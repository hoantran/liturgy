define(['jquery', 'hbs!templates/liturgyItem', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            tagName: "tr",
            template:template
        });
    });