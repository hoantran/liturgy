define(["App",
        "hbs!subapps/calendar/edit/tpl/form",
        "jqueryui",
        "timepicker"
        // "hbs!subapps/calendar/show/tpl/view"],
        ], function(
            App,
            formTpl
            // viewTpl
    ){
    App.module("CalendarApp.Edit.View", function(View, App, Backbone, Marionette, $, _){

        // lineup view
        View.Form = Marionette.ItemView.extend({
            template: formTpl,

            events: {
                "click .js-edit-submit": "editClicked"
            },

            onRender: function(){
                // autocomplete
                // http://bit.ly/1eqIHMQ
                $(".song-input", this.el).autocomplete({ //Line 30
                    self      : this,
                    source    : 'song',
                    minLength : 2,
                    delay     : 100,
                    select    : function(event, ui){ //Line 33
                        $( this ).attr( 'data_songid', ui.item.data );
                        // console.log( 'data_songid: ', $( this ).attr('data_songid') );
                    }
                }).each(function(){
                    // http://bit.ly/1f3Im8h
                    // http://bit.ly/MpjBag
                    $(this).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                        // console.log('item:', item );
                        return $( "<li></li>" )
                            .data( "item.autocomplete", item )
                            .append( "<a><strong>" + item.label + "</strong> <small> " + item.composers + " </small></a>" )
                            .appendTo( ul );
                    };
                });

                // date
                // http://bit.ly/amuj8J
                $( '#date', this.el ).datetimepicker({
                    stepMinute: 5,
                    dateFormat: "D mm/dd/yy",
                    timeFormat: "hh:mm TT"
                });

                // clear only on first click
                // http://bit.ly/17KSMl6
                // $('input', this.el).one('focus', function(){
                $('input', this.el).focus( function(){   // every time
                    this.value = '';
                });

            },

            onFormDataInvalid: function(errors){
                var $view = this.$el;

                var clearFormErrors = function(){
                    var $form = $view.find("form");
                    $form.find(".form-error").each(function(){
                        $(this).remove();
                    });
                    $form.find(".has-error").each(function(){
                        $(this).removeClass("has-error");
                    });
                };

                var markErrors = function(value, key){
                    var $controlGroup = $view.find("#" + key).parent();
                    var $errorEl = $("<span>", { class: "form-error", text: value });
                    $controlGroup.append($errorEl).addClass("has-error");
                };

                clearFormErrors();
                _.each(errors, markErrors);
            },


            extractData: function( e ){
                this.model.clear( {silent:true} );

                var self = this;

                $( '.js-liturgy-inputs' ).each( function( i, el ) {
                    var val             = $( el ).val();
                    var data_id         = $( el ).attr( 'data_id' );
                    var data_songid     = $( el ).attr( 'data_songid' );

                    if( _.isString( data_id )){
                        if( 0 === "liturgy_id".localeCompare( data_id )){
                            self.model.set( 'id', val );
                        }
                        else if( 0 === "title".localeCompare( data_id )){
                            self.model.set( 'title', val );
                        }
                        else if( 0 === "date".localeCompare( data_id )){
                            self.model.set( 'date', val );
                        }
                        else if( 0 === "enable".localeCompare( data_id )){
                            if( $( el ).is(":checked") ){
                                self.model.set( 'enable', 1 );
                            }
                            else {
                                self.model.set( 'enable', 0 );
                            }
                        }
                        else {
                            self.model.addItem( data_id, data_songid );
                        }
                    }
                });
            },

            editClicked: function(e){
                e.preventDefault();
                e.stopPropagation();
                this.extractData();
                this.trigger("liturgy:form:submit", this.model);
            }
        });
    });

    return App.CalendarApp.Edit.View;
});

// <div> <a class="js-edit-submit" href="javascript:void(0);">hello </a></div>