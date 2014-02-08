require.config({
    baseUrl:"./js/app",
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"../libs/jquery",
        "jqueryui":"../libs/jqueryui",
        "jquerymobile":"../libs/jquery.mobile",
        "spin": "../libs/spin",
        "spin.jquery": "../libs/spin.jquery",
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
        // jQuery spinning wheel - http://fgnass.github.io/spin.js/
        "spin.jquery": ["spin", "jquery"],

        // // Backbone
        // "backbone":{
        //     // Depends on underscore/lodash and jQuery
        //     "deps":["underscore", "jquery"],
        //     // Exports the global window.Backbone object
        //     "exports":"Backbone"
        // },
        // //Marionette
        // "marionette":{
        //     "deps":["underscore", "backbone", "jquery"],
        //     "exports":"Marionette"
        // },

        //Handlebars
        "handlebars":{
            "exports":"Handlebars"
        },
        // Backbone.validateAll plugin that depends on Backbone
        "backbone.validateAll":["backbone"],

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