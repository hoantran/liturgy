define(["marionette", "hbs!subapps/navigation/show/tpl/navigation"], function(Marionette, template){
    return {
        Message: Marionette.ItemView.extend({
            template: template,

            events: {
                "click div a.js-brand"      : "clickBrand",
                "click ul li a.js-home"     : "clickHome",
                "click ul li a.js-whoweare" : "clickWhoWeAre",
                "click ul li a.js-photos"   : "clickPhotos",
                "click ul li a.js-login"    : "clickLogin"
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
            }
        })
    };
});
