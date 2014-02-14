define(['jquery', 'hbs!subapps/calendar/show/tpl/songTitle', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template    : template,
            tagName     : "div",
            className   : "row",
            events: {
                "click .js-songTitle"    : "songClicked"
            },

            songClicked: function(e){
                e.preventDefault();
                e.stopPropagation();

                // $(".media-region").hide();

                var songRegion = $(e.currentTarget).parents(".song-region").next(".media-region");
                if(songRegion.hasClass("hide")){
                    songRegion.removeClass("hide");
                    songRegion.show();
                }
                else{
                    songRegion.toggle();
                }
            }
        });
    });