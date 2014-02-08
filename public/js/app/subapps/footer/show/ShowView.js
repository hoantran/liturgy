define(["marionette", "hbs!subapps/footer/show/tpl/footer"], function(Marionette, template){
    return {
        Message: Marionette.ItemView.extend({
            template: template,

            events: {
                "click ul li a.js-about"    : "clickAbout"
            },

            clickAbout: function(e){
                e.preventDefault();
                e.stopPropagation();
                console.log('footer clickAbout');
            }
        })
    };
});
