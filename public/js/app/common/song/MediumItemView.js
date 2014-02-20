define(['jquery', 'hbs!common/song/tpl/mediumItem', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template    : template,
            tagName     : "li",
            className   : "lineup-list"
        });
    });