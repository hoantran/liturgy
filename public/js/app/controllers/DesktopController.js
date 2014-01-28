define(['App', 'backbone', 'marionette', 'views/CalendarLayout', 'views/CalendarPanelView', 'collections/LiturgyItemCollection', 'views/CalendarView', 'views/MainLayout', 'views/DesktopNavigationView', 'views/JumbotronView', 'views/ContentView', 'views/FooterView' ],
    function (App, Backbone, Marionette, CalendarLayout, CalendarPanelView, LiturgyItemCollection, CalendarView, MainLayout, DesktopNavigationView, JumbotronView, ContentView, FooterView ) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            var mainLayout = new MainLayout();
            mainLayout.render();

            var calendarLayout = new CalendarLayout();
            calendarLayout.render();

            var panel = new CalendarPanelView();

            var liturgyCollection = new LiturgyItemCollection([
                    { date: 'Feb 1, 2014',  title: 'Third Sunday of Lent' },
                    { date: 'Feb 1, 2014',  title: 'Third Sunday of Lent' },
                    { date: 'Feb 1, 2014',  title: 'Third Sunday of Lent' },
                    { date: 'Feb 1, 2014',  title: 'Third Sunday of Lent' },
                    { date: 'Nov 12, 2014',  title: 'Fourth Sunday of Lent' }
                ]);
            var calendarView = new CalendarView({
                collection: liturgyCollection
            });

            calendarLayout.on( "show", function(){
                calendarLayout.panelRegion.show( panel );
                calendarLayout.calendarRegion.show( calendarView );
            });

            App.navigationRegion.show   (new DesktopNavigationView());
            App.mainRegion.show         (mainLayout);

            App.footerRegion.show       (new FooterView());
            // App.headerRegion.show(new DesktopHeaderView());

            // mainLayout.jumbotronRegion.show    (new JumbotronView());
            // mainLayout.contentRegion.show      (new ContentView());
            mainLayout.jumbotronRegion.show     ( new JumbotronView() );
            mainLayout.contentRegion.show       ( calendarLayout );

        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {
            console.log( 'index' );
            // App.mainRegion.show(new WelcomeView());
        }
    });
});