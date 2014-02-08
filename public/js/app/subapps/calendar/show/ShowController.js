define(["App", "subapps/calendar/show/ShowView"], function(App, View){
    App.module("CalendarApp.Show", function(Show, App, Backbone, Marionette, $, _){
        Show.Controller = {
            showLiturgy: function(id){
                require(["common/views", "entities/CalendarLiturgies"], function(CommonViews){
                    var loadingView = new CommonViews.Loading({
                        title: "Loading ...",
                        message: "Retrieving a liturgy data from server"
                    });
                    App.mainRegion.show(loadingView);

                    var fetchingLiturgy = App.request("calendar:liturgy", id);
                    $.when(fetchingLiturgy).done(function(liturgy){
                        var liturgyView;
                        if(liturgy !== undefined){
                            liturgyView = new View.Liturgy({
                                model: liturgy
                            });

                            liturgyView.on("calendar:edit", function(liturgy){
                                App.trigger("calendar:edit", liturgy.get("id"));
                            });
                        }
                        else{
                            console.log('displaying missing liturgy');
                            liturgyView = new View.MissingLiturgy({ liturgyID:id });
                        }

                        App.mainRegion.show(liturgyView);
                    });
                });
            }
        };
    });

    return App.CalendarApp.Show.Controller;
});
