define( [ "App", "views/MainLayout", "subapps/calendar/list/CalendarLayout", "subapps/calendar/list/CalendarPanelView", "subapps/calendar/list/CalendarView", "views/JumbotronView" ],
    function( App, MainLayout, CalendarLayout, CalendarPanelView, CalendarView, JumbotronView ){
    App.module( "CalendarApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
        List.Controller = {
            listCalendar: function(){
                console.log ( 'Inside ListController:listCalendar' );
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



// define( [ "App", "views/MainLayout", "subapps/calendar/list/CalendarLayout", "subapps/calendar/list/CalendarPanelView", "subapps/calendar/list/CalendarView", "views/JumbotronView" ],
//     function( App, MainLayout, CalendarLayout, CalendarPanelView, CalendarView, JumbotronView ){
//     App.module( "CalendarApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
//         List.Controller = {
//             listCalendar: function(){
//                 var mainLayout = new MainLayout();
//                 mainLayout.render();

//                 var calendarLayout = new CalendarLayout();
//                 calendarLayout.render();

//                 var panel = new CalendarPanelView();

//                 require( [ "entities/CalendarLiturgies" ], function( CalendarLiturgies ){
//                     var fetchingLineups = App.request( "calendar:liturgies" );

//                     $.when( fetchingLineups ).done( function( fetchingLineups ){
//                         var calendarView = new CalendarView({
//                             collection: fetchingLineups
//                         });

//                         calendarLayout.on( "show", function(){
//                             console.log( 'panel:', panel );
//                             console.log( 'calendarView:', calendarView );
//                             calendarLayout.panelRegion.show( panel );
//                             calendarLayout.calendarRegion.show( calendarView );
//                         });

//                         App.mainRegion.show                 (mainLayout);
//                         mainLayout.jumbotronRegion.show     ( new JumbotronView() );
//                         mainLayout.contentRegion.show       ( calendarLayout );
//                     }
//                 });
//             }
//         }
//     });

//     return App.CalendarApp.List.Controller;
// });