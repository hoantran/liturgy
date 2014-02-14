define(["jquery","backbone","underscore","models/medium"],
    function($, Backbone, _, Model) {
        // Creates a new Backbone Collection class object
        var Collection = Backbone.Collection.extend({
            // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
            model: Model,

            initialize: function(options){
                // console.log('medium list collection init');
                // console.log('medium list options:', options);
                // if(options.list){
                //     this.parseMediumData(options.list);
                // }
            }
    });

    return Collection;
});