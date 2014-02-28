define(["jquery","backbone","underscore","models/MediumModel"],
    function($, Backbone, _, Model) {
        // Creates a new Backbone Collection class object
        var Collection = Backbone.Collection.extend({
            // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
            model: Model,

            initialize: function(options){
                // if(options.list){
                //     this.parseMediumData(options.list);
                // }
            },

            parseMediumData: function(mediumData){
                var medium = mediumData.get('medium');
                var mediumList = mediumData.get('mediumList');
                if(mediumData && mediumList){
                    var list = this;
                    _.each(mediumList, function(link){
                        list.add({
                            medium  : medium,
                            link    : link
                        });
                    });
                }
            }
    });

    return Collection;
});