define(["marionette", "hbs!subapps/navigation/show/tpl/navigation"], function(Marionette, template){
    return {
        Message: Marionette.ItemView.extend({
            template: template,

            events: {
                "click div a.js-brand"      : "clickBrand",
                "click ul li a.js-home"     : "clickHome",
                "click ul li a.js-whoweare" : "clickWhoWeAre",
                "click ul li a.js-photos"   : "clickPhotos",
                "click ul li a.js-login"    : "clickLogin",
                "click .js-search-submit"   : "clickSubmit"
            },

            clickBrand: function(e){
                e.preventDefault();
                // e.stopPropagation();
                console.log('navigation clickBrand');
                this.trigger('brand:clicked');
            },

            clickHome: function(e){
                e.preventDefault();
                // e.stopPropagation();
                console.log('navigation clickHome');
                console.log('this:', this);
                this.trigger('home:clicked');
            },

            clickWhoWeAre: function(e){
                e.preventDefault();
                // e.stopPropagation();
                console.log('navigation clickWhoWeAre');
            },

            clickPhotos: function(e){
                e.preventDefault();
                // e.stopPropagation();
                console.log('navigation clickPhotos');
            },

            clickLogin: function(e){
                e.preventDefault();
                // e.stopPropagation();
                console.log('navigation clickLogin');
            },

            clickSubmit: function(e){
                e.preventDefault();
                // e.stopPropagation();
                console.log('navigation clickSubmit');
                var searchTerm = $(".js-search-input", this.el).val();
                this.trigger('song:search', searchTerm);
            },

            onRender: function(){
                // autocomplete
                // http://bit.ly/1eqIHMQ
                var self = this;
                $(".js-search-input", this.el).autocomplete({ //Line 30
                    self      : this,
                    source    : 'song',
                    minLength : 2,
                    delay     : 100,
                    select    : function(event, ui){ //Line 33
                        $( this ).attr( 'data_songid', ui.item.data );
                        // console.log( 'data_songid: ', $( this ).attr('data_songid') );
                        // console.log('ui:', ui);
                        self.trigger('song:search', ui.item.value);
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
                }).keypress(function (e) {
                    if (e.which == 13) {
                        e.preventDefault();
                        // console.log('e:', e );
                        // console.log('this.value:', this.value);
                        self.trigger('song:search', this.value);
                        // console.log('data_songid:', $(this).attr('data_songid')) ;
                        $(this).autocomplete("close");
                    }
                });
            }
        })
    };
});
