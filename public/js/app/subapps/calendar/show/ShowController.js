define([    "App",
            "subapps/calendar/show/ShowView",
            "subapps/calendar/show/LiturgyLayout",
            "subapps/calendar/show/TitleView",
            "subapps/calendar/show/PanelView",
            "subapps/calendar/show/MediumView",
            "subapps/calendar/show/MediaView",
            "models/medium",
            "collections/MediaList",
            "collections/MediumList",
            "subapps/calendar/show/SongTitleView",
            "subapps/calendar/show/SongLayout",
            "subapps/calendar/show/SectionView",
            "subapps/calendar/show/LineupView"
        ], function(App, View, LiturgyLayout, TitleView, PanelView, MediumView, MediaView, Medium, MediaList, MediumList, SongTitleView, SongLayout, SectionView, LineupView){
    App.module("CalendarApp.Show", function(Show, App, Backbone, Marionette, $, _){
        Show.Controller = {
            showLiturgy: function(id){
                require(["common/views", "entities/CalendarLiturgies"], function(CommonViews){

                    // loading view
                    var loadingView = new CommonViews.Loading({
                        title: "Loading ...",
                        message: "Retrieving a liturgy (" + id + ") data from server"
                    });
                    App.mainRegion.show(loadingView);

                    // var mainLayout = new Layout();
                    // mainLayout.render();

                    // var calendarLayout = new CalendarLayout();
                    // calendarLayout.render();

                    // var panel = new CalendarPanelView();

                    // require( [ "entities/CalendarLiturgies" ], function( CalendarLiturgies ){
                    //     var fetchingLineups = App.request( "calendar:liturgies" );

                    //     $.when( fetchingLineups ).done( function( lineups ){
                    //         var calendarView = new CalendarView({
                    //             collection: lineups
                    //         });

                    //         lineups.markNextLiturgy();

                    //         calendarLayout.on( "show", function(){
                    //             calendarLayout.panelRegion.show( panel );
                    //             calendarLayout.calendarRegion.show( calendarView );
                    //         });

                    //         calendarView.on("itemview:calendar:show", function(childView, model){
                    //             App.trigger("calendar:show", model.get("id"));
                    //         });

                    //         App.mainRegion.show                 (mainLayout);
                    //         mainLayout.jumbotronRegion.show     ( new JumbotronView() );
                    //         mainLayout.contentRegion.show       ( calendarLayout );



                    //     });
                    // });

                    // getting the data, and sets up the eventual dataful view
                    var fetchingLiturgy = App.request("calendar:liturgy", id);
                    $.when(fetchingLiturgy).done(function(liturgyData){
                        if(liturgyData !== undefined){
                            // liturgyView = new View.Liturgy({
                            //     model: liturgyData
                            // });

                            // liturgyView.on("calendar:edit", function(liturgy){
                            //     App.trigger("calendar:edit", liturgy.get("id"));
                            // });
                            console.log('data:', liturgyData);
                            var layout;
                            layout = new LiturgyLayout();
                            App.mainRegion.show(layout);

                            layout.titleRegion.show(new TitleView({model:liturgyData}));
                            layout.panelRegion.show(new PanelView({model:liturgyData}));

                            // console.log('length:', liturgyData.get('sections').length);
                            // if(liturgyData.get('sections') && liturgyData.get('sections').length > 0){
                            //     _.each(liturgyData.get('sections'), function(section){
                            //         console.log('section:', section);
                            //         _.each(section.items, function(song){
                            //             console.log('song:', song);
                            //         });
                            //     });
                            // }
                            // else{
                            //     // display no data for this song; be sure to give an empty row with the message
                            // }

                            // var f =  liturgyData.get('sections')[0].items[1].song.media[1];
                            // console.log('f:', f);
                            // var collection = new MediumList(f);
                            // // collection.parseMediumData(f);
                            // console.log('collection:', collection);
                            // var mv = new MediumView({
                            //     collection: collection
                            // });
                            // layout.lineupRegion.show( mv );

                            // ........

                            // var songData =  liturgyData.get('sections')[0].items[3];

                            // var songTitleView = new SongTitleView({model:new Backbone.Model(songData)});
                            // // layout.lineupRegion.show( songTitleView );

                            // // // parent init: model undefined but collection defined in constructor
                            // // // child init: model is passed in for each, one member of the parent's collection per child. collection is undefined.
                            // // // http://jsfiddle.net/derickbailey/QPg4D/
                            // // //
                            // var mediaList = new MediaList( songData.song.media );
                            // var mediaView = new MediaView({
                            //     collection: mediaList
                            // });

                            // // layout.lineupRegion.show( mediaView );

                            // // var songLayout = new SongLayout({model:new Backbone.Model(songData)});
                            // var songLayout = new SongLayout();
                            // layout.lineupRegion.show (songLayout);

                            // songLayout.songRegion.show( songTitleView );
                            // songLayout.mediaRegion.show( mediaView );

                            // // console.log('songData:', songLayout.get('model'));
                            // console.log('songData:', songLayout.model);

                            //
                            // ....
                            // var songLayout = new SongLayout({model:new Backbone.Model(liturgyData.get('sections')[0].items[3])});
                            // layout.lineupRegion.show (songLayout);
                            // songLayout.showViews();

                            // // ..
                            // var songLayout = new SongLayout({model:new Backbone.Model(liturgyData.get('sections')[0].items[3])});
                            // layout.lineupRegion.show (songLayout);
                            // songLayout.showViews();

                            // // .....
                            // var items = liturgyData.get('sections')[0].items;
                            // // console.log('aSection:', aSection);
                            // _.each(items, function(item){
                            //     console.log('item:', item);
                            //     var songLayout = new SongLayout({model:new Backbone.Model(item)});
                            //     layout.lineupRegion.show (songLayout);
                            //     songLayout.showViews();
                            // });

                            // .....
                            // var items = liturgyData.get('sections')[0].items;
                            // var sectionView = new SectionView({collection: new Backbone.Collection(items)});
                            // layout.lineupRegion.show(sectionView);

                            var sections = liturgyData.get('sections');
                            var lineupView = new LineupView({collection: new Backbone.Collection(sections)});
                            layout.lineupRegion.show(lineupView);
                        }
                        else{
                            console.log('displaying missing liturgy');
                            App.mainRegion.show( new View.MissingLiturgy({ liturgyID:id }) );
                        }
                    });
                });
            }
        };
    });

    return App.CalendarApp.Show.Controller;
});
