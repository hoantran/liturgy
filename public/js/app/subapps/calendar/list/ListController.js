define( [ "App", "views/MainLayout", "subapps/calendar/list/CalendarLayout", "subapps/calendar/list/CalendarPanelView", "subapps/calendar/list/CalendarView", "views/JumbotronView" ],
    function( App, MainLayout, CalendarLayout, CalendarPanelView, CalendarView, JumbotronView ){
    App.module( "CalendarApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
        List.Controller = {
            listCalendar: function(){
                var mainLayout = new MainLayout();
                mainLayout.render();

                var calendarLayout = new CalendarLayout();
                calendarLayout.render();

                var panel = new CalendarPanelView();

                require( [ "entities/CalendarLiturgies" ], function( CalendarLiturgies ){
                    var fetchingLineups = App.request( "calendar:liturgies" );

                    $.when( fetchingLineups ).done( function( lineups ){
                        var calendarView = new CalendarView({
                            collection: lineups
                        });

                        lineups.markNextLiturgy();

                        calendarLayout.on( "show", function(){
                            calendarLayout.panelRegion.show( panel );
                            calendarLayout.calendarRegion.show( calendarView );
                        });

                        calendarView.on("itemview:calendar:show", function(childView, model){
                            App.trigger("calendar:show", model.get("id"));
                        });

                        App.mainRegion.show                 (mainLayout);
                        mainLayout.jumbotronRegion.show     ( new JumbotronView() );
                        mainLayout.contentRegion.show       ( calendarLayout );



                    });
                });
            }
        };
    });

    return App.CalendarApp.List.Controller;
});