define(["marionette", "hbs!subapps/navigation/show/tpl/navigation"], function(Marionette, template){
    return {
        Message: Marionette.ItemView.extend({
            template: template,

            initialize: function(){
                console.log('model:', this.model);
            },

            events: {
                "click div a.js-brand"      : "clickBrand",
                "click ul li a.js-home"     : "clickHome",
                "click ul li a.js-whoweare" : "clickWhoWeAre",
                "click ul li a.js-photos"   : "clickPhotos",
                "click .js-login"           : "clickLogin",
                "click .js-logout"          : "clickLogout",
                "click .js-search-submit"   : "clickSubmit"
            },

            modelEvents: {
                "change": "render"
            },

            modelChanged: function(){
                console.log('model changed:', this.model);
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
                e.stopPropagation();
                console.log('navigation clickLogin');
                $(document).trigger('login');
                // $(document).trigger('test:register');

            },

            clickLogout: function(e){
                e.preventDefault();
                console.log('navigation clickLogout');
                $(document).trigger('logout');
                // $(document).trigger('test:register');

            },

updateButton: function(response) {
  Log.info('Updating Button', response);
  var button = $('.js-login');
  // var button = document.getElementById('fb-auth');

  if (response.status === 'connected') {
    button.innerHTML = 'Logout';
    button.className = 'btn btn-danger';
    button.onclick = function() {
      FB.logout(function(response) {
        Log.info('FB.logout callback', response);
      });
    };
  } else {
    button.innerHTML = 'Login';
    button.className = 'btn btn-success';
    button.onclick = function() {
      FB.login(function(response) {
        Log.info('FB.login callback', response);
        if (response.status === 'connected') {
          Log.info('User is logged in');
        } else {
          Log.info('User is logged out');
        }
      });
    };
  }
},

            clickSubmit: function(e){
                e.preventDefault();
                // e.stopPropagation();
                console.log('navigation clickSubmit');
                var searchTerm = $(".js-search-input", this.el).val();
                this.trigger('song:search', searchTerm);
            },

            onRender: function(){
                // console.log('my model:', this.model);
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

                // $('.js-login').on('click', function () {
                //     console.log('logging in...');
                //     // require([ "acl/fb" ], function () {
                //     //     // FB.getLoginStatus(this.updateButton);
                //     // });
                // });

            }
        })
    };
});
