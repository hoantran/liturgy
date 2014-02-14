define(["jquery","backbone","underscore","models/MediumModel"],
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
            },

            parseMediumData: function(mediumData){
                var medium = mediumData.get('medium');
                var mediumList = mediumData.get('mediumList');
                // console.log('mediumData:', mediumData);
                // console.log('medium:', medium);
                // console.log('mediumData.get(mediumList):', mediumList);
                if(mediumData && mediumList){
                    var list = this;
                    _.each(mediumList, function(link){
                        // console.log('medium list adding link:', link);
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