define(['jquery', 'hbs!subapps/calendar/list/tpl/liturgyItem', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic

        var highlight = 'success';
        var mouse = 'warning';

        return Backbone.Marionette.ItemView.extend({
            tagName: "tr",
            template:template,

            onRender: function(){
                // set up final bits just before rendering the view's `el`
                if( this.model.get( 'highLight' )){
                    console.log( this.model.get( 'date' ));
                    this.$el.addClass( highlight );
                }
            },

            events: {
                "mousedown" :   "emphasize",
                "mouseup"   :   "deEmphasize"
            },

            emphasize: function(){
                console.log( 'emphasize' );
                this.$el.addClass( mouse );
            },

            deEmphasize: function(){
                console.log( 'deEmphasize' );
                this.$el.removeClass( mouse );
            }
        });
    });