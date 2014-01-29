define(['App', 'backbone', 'marionette', 'collections/LiturgyItemCollection' ],
    function (App, Backbone, Marionette, LiturgyItemCollection ) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            var liturgyCollection = new LiturgyItemCollection([
                    { date: 'Feb 1, 2014',  title: 'Third Sunday of Lent' },
                    { date: 'Feb 1, 2014',  title: 'Third Sunday of Lent' },
                    { date: 'Feb 1, 2014',  title: 'Third Sunday of Lent' },
                    { date: 'Feb 1, 2014',  title: 'Third Sunday of Lent' },
                    { date: 'Nov 12, 2014',  title: 'Fourth Sunday of Lent' }
                ]);

            console.log( App );
            // App.reqres.addHandler( "calendar:liturgies", function(){
            App.reqres.setHandler( "calendar:liturgies", function(){
                return liturgyCollection;
            });
        }
    });
});