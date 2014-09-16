define(['jquery', 'hbs!common/song/tpl/mediumItem', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template    : template,
            tagName     : "li",
            className   : "lineup-list",
            initialize	: function() {
                this.checkMedium();
            },
            checkMedium: function() {
                var existingIcons = ["piano", "vocal", "guitar", "other", "link", "mp3", "solo"];
                var medium = this.model.get('medium');

                if ( medium === undefined || $.inArray( medium, existingIcons) == -1 ){
                    this.model.set("medium", "other");
                }
            }
        });
    });