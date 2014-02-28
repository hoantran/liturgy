define([    "App",
            "subapps/calendar/show/ShowView",
            "subapps/calendar/show/LiturgyLayout",
            "subapps/calendar/show/TitleView",
            "subapps/calendar/show/PanelView",
            "subapps/calendar/show/LineupView"
        ], function(App, View, LiturgyLayout, TitleView, PanelView, LineupView){
    App.module("CalendarApp.Show", function(Show, App, Backbone, Marionette, $, _){
        Show.Controller = {
            showLiturgy: function(id){
                require(["common/views/Views", "entities/CalendarLiturgies"], function(CommonViews){

                    // loading view
                    var loadingView = new CommonViews.Loading({
                        title: "Loading ...",
                        message: "Retrieving a liturgy (" + id + ") data from server"
                    });
                    App.mainRegion.show(loadingView);

                    // getting the data, and sets up the eventual dataful view
                    var fetchingLiturgy = App.request("calendar:liturgy", id);
                    $.when(fetchingLiturgy).done(function(liturgyData){
                        if(liturgyData !== undefined){
                            var layout;
                            layout = new LiturgyLayout();
                            App.mainRegion.show(layout);

                            // title region
                            layout.titleRegion.show(new TitleView({model:liturgyData}));

                            // panel region
                            var panelView = new PanelView({model:liturgyData});
                            layout.panelRegion.show(panelView);
                            panelView.on("calendar:edit", function(liturgy){
                                console.log('show controller; liturgy id:', liturgy.get('id'));
                                App.trigger("calendar:edit", liturgy.get('id'));
                            });

                            // lineup region
                            var sections = liturgyData.get('sections');
                            var lineupView = new LineupView({collection: new Backbone.Collection(sections)});
                            layout.lineupRegion.show(lineupView);
                        }
                        else{
                            console.log('displaying missing liturgy');
                            App.mainRegion.show( new CommonViews.MissingLiturgy({ liturgyID:id }) );
                        }
                    });
                });
            }
        };
    });

    return App.CalendarApp.Show.Controller;
});
