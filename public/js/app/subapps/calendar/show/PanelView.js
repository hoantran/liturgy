define(['jquery', 'hbs!subapps/calendar/show/tpl/panel', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template,
            events: {
                "click .js-liturgy-edit": "editClicked"
            },

            // initialize: function(){
            //     this.on("liturgy:edit", function(hey){
            //         console.log('hey:', hey);
            //     });
            // },

            editClicked: function(e){
                e.preventDefault();
                e.stopPropagation();
                console.log('panel view edit clicked; model:', this.model);
                console.log('el:', this.$el);
                this.trigger("calendar:edit", this.model);
            }
        });
    });