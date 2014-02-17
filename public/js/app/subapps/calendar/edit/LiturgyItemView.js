define(['jquery', 'hbs!subapps/calendar/list/tpl/liturgyItem', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic

        var highlight = 'success';
        var mouse = 'warning';

        return Backbone.Marionette.ItemView.extend({
            tagName: "tr",
            template:template,

            onRender: function(){
                // manipulate the `el` here. it's already
                // been rendered, and is full of the view's
                // HTML, ready to go.
                if( this.model.get( 'highLight' )){
                    console.log( this.model.get( 'date' ));
                    this.$el.addClass( highlight );
                }
            },

            events: {
                "mousedown td a.js-edit"    : "doNothing",
                "mouseup td a.js-edit"      : "editClicked",
                "mousedown button.js-delete": "doNothing",
                "mouseup button.js-delete"  : "deleteClicked",
                "mousedown"                 : "emphasize",
                "mouseup"                   : "deEmphasize"
            },

            doNothing: function(e){
                e.preventDefault();
                e.stopPropagation();
                console.log('do nothing');
            },

            emphasize: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.$el.addClass( mouse );
            },

            deEmphasize: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.$el.removeClass( mouse );
                this.trigger("calendar:show", this.model);
            },

            editClicked: function(e){
                console.log('editClicked');
                e.preventDefault();
                e.stopPropagation();
                this.trigger("litury:edit", this.model);
            },

            deleteClicked: function(e){
                console.log('deleteClicked');
                e.preventDefault();
                e.stopPropagation();
                this.trigger("litury:delete", this.model);
            }
        });
    });