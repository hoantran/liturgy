define(["jquery", "underscore", "backbone","models/LiturgyItemModel"],
    function($, _, Backbone, Model) {
        // Creates a new Backbone Collection class object
        var Collection = Backbone.Collection.extend({
        // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
        model: Model,
        url: "liturgies",

        comparator: function( model ){
            // console.log( model.get( 'date' ) );
            return Date.parse( model.get( 'date' ) );
        },

        markNextLiturgy: function(){
            var lastDifference  = Number.MAX_VALUE;
                closestSet      = [];
                today           = new Date();

            // set to today's first second
            today.setHours( 0, 0, 0, 0 );
            today = today.getTime();

            this.each( function( model, key, list ) {

                // parse also sets the date to the day's first second
                var date = Date.parse( model.get( 'date' ) );

                if( date >= today ){
                    var difference = date - today;
                    if( lastDifference > difference ){
                        // new closest set
                        closestSet = [ model ];
                        lastDifference = difference;
                    }
                    else if( lastDifference == difference ){
                        closestSet.push( model ); // because there could be more than 1 items to highlight
                        lastDifference = difference;
                    }
                }
            } );

            _.each( closestSet, function( model, key, set ){
                model.set( 'highLight', true );
            });
        }
    });

    return Collection;
});