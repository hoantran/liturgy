define(['jquery', 'hbs!subapps/calendar/show/tpl/mediumItem', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template    : template,
            tagName     : "li",
            className   : "lineup-list"
        });
    });

// <li class="lineup-list"><a class="my-lineup-icon my-lineup-icon-guitar" target="_blank" href="#">Leaf</a></li>
// <li class="lineup-list"><a class="my-lineup-icon my-lineup-icon-guitar" target="_blank" href="#">Leaf</a></li>