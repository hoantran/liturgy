require.config({
    baseUrl:"./js/app",
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"../libs/jquery",
        "jqueryui":"../libs/jqueryui",
        "jquerymobile":"../libs/jquery.mobile",
        "timepicker":"../libs/jquery-ui-timepicker-addon",
        "spin": "../libs/spin",
        "spin.jquery": "../libs/spin.jquery",           // originally named jquery.spin.js
        "underscore":"../libs/lodash.underscore",
        "backbone":"../libs/backbone",
        "backbone.babysitter":"../libs/backbone.babysitter",
        "backbone.wreqr":"../libs/backbone.wreqr",
        "marionette":"../libs/backbone.marionette",
        "handlebars":"../libs/handlebars",
        "hbs":"../libs/hbs",
        "i18nprecompile":"../libs/i18nprecompile",
        "json2":"../libs/json2",
        "jasmine": "../libs/jasmine",
        "jasmine-html": "../libs/jasmine-html",
        "facebook": "../libs/facebook",
        // "facebook": "//connect.facebook.net/en_US/all",

        // Plugins
        "backbone.validateAll":"../libs/plugins/Backbone.validateAll",
        "bootstrap":"../libs/plugins/bootstrap",
        "text":"../libs/plugins/text",
        "jasminejquery": "../libs/plugins/jasmine-jquery"
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim:{
        // Twitter Bootstrap jQuery plugins
        "bootstrap":["jquery"],
        // jQueryUI
        "jqueryui":["jquery"],
        // jQuery mobile
        "jquerymobile":["jqueryui"],
        // jQuery date time picker addon:  http://bit.ly/amuj8J
        "timepicker":["jqueryui"],
        // jQuery spinning wheel - http://fgnass.github.io/spin.js/
        "spin.jquery": ["spin", "jquery"],

        // using AMD versions of backbone and Marionette, according to the post on:
        // https://github.com/jrburke/requirejs/issues/987

        //Handlebars
        "handlebars":{
            "exports":"Handlebars"
        },
        // Backbone.validateAll plugin that depends on Backbone
        "backbone.validateAll":["backbone"],

        "facebook" : {
            exports: "FB"
        },

        "jasmine": {
            // Exports the global 'window.jasmine' object
            "exports": "jasmine"
        },

        "jasmine-html": {
            "deps": ["jasmine"],
            "exports": "jasmine"
        }
    },
    // hbs config - must duplicate in Gruntfile.js Require build
    hbs: {
        templateExtension: "html",
        helperDirectory: "templates/helpers/",
        i18nDirectory: "templates/i18n/",

        compileOptions: {}        // options object which is passed to Handlebars compiler
    }
});