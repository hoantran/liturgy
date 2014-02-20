define([    "App",
            "subapps/song/show/ShowView"
            // "subapps/calendar/show/ShowView",
            // "subapps/calendar/show/LiturgyLayout",
            // "subapps/calendar/show/TitleView",
            // "subapps/calendar/show/PanelView",
            // "subapps/calendar/show/LineupView"
        // ], function(App, View, LiturgyLayout, TitleView, PanelView, LineupView){
        ], function(App, View){
    App.module("SongApp.Show", function(Show, App, Backbone, Marionette, $, _){
        Show.Controller = {
            showLiturgy: function(id){
                require(["common/Views", "common/song/Views", "entities/Songs"], function(CommonViews, CommonSongViews){

                    // loading view
                    var loadingView = new CommonViews.Loading({
                        title: "Loading ...",
                        message: "Retrieving a song (" + id + ") data from server"
                    });
                    App.mainRegion.show(loadingView);

                    // getting the data, and sets up the eventual dataful view
                    var fetchingSong = App.request("song:song", id);
                    $.when(fetchingSong).done(function(songData){
                        if(songData !== undefined){
                            // console.log('songData: ', songData);
                            var layout = new View.Layout();
                            App.mainRegion.show( layout );

                            // search region
                            layout.searchRegion.show( new View.Search() );

                            // song region
                            var songLayout = new CommonSongViews.SongLayout( {model:songData} );
                            layout.resultsRegion.show( songLayout );

                            // var layout;
                            // layout = new LiturgyLayout();
                            // App.mainRegion.show(layout);

                            // // title region
                            // layout.titleRegion.show(new TitleView({model:songData}));

                            // // panel region
                            // var panelView = new PanelView({model:songData});
                            // layout.panelRegion.show(panelView);
                            // panelView.on("calendar:edit", function(liturgy){
                            //     console.log('show controller; liturgy id:', liturgy.get('id'));
                            //     App.trigger("calendar:edit", liturgy.get('id'));
                            // });

                            // // lineup region
                            // var sections = songData.get('sections');
                            // var lineupView = new LineupView({collection: new Backbone.Collection(sections)});
                            // layout.lineupRegion.show(lineupView);
                        }
                        else{
                            console.log('displaying missing liturgy');
                            // App.mainRegion.show( new CommonViews.MissingLiturgy({ liturgyID:id }) );
                        }
                    });
                });
            },

            searchSong: function( searchTerm ){
                require(["models/song", "common/Views", "common/song/Views", "entities/Songs"], function(Song, CommonViews, CommonSongViews){
                    // loading view
                    var loadingView = new CommonViews.Loading({
                        title: "Search ...",
                        message: "Loading results for song search similar to (" + searchTerm + ") from server."
                    });
                    App.mainRegion.show(loadingView);

                    var searchingSongs = App.request("song:search:term", searchTerm);
                    $.when(searchingSongs).done(function(songData){
                        if(songData !== undefined){
                            // console.log('songData:', songData);

                            var layout = new View.Layout();
                            App.mainRegion.show( layout );

                            // search region
                            layout.searchRegion.show( new View.Search() );

                            // song region
                            var Col = Backbone.Collection.extend({model: Song});
                            // var collection = new Backbone.Collection(songData);
                            var collection = new Col(songData);
                            // console.log('collection:', collection );
                            var songLayout = new View.Results( {collection : collection } );
                            layout.resultsRegion.show( songLayout );
                        }
                        else {
                            console.log('displaying can not find song');
                        }
                    });

                    // // loading view
                    // var loadingView = new CommonViews.Loading({
                    //     title: "Loading ...",
                    //     message: "Retrieving a song (" + id + ") data from server"
                    // });
                    // App.mainRegion.show(loadingView);

                    // // getting the data, and sets up the eventual dataful view
                    // var fetchingSong = App.request("song:song", id);
                    // $.when(fetchingSong).done(function(songData){
                    //     if(songData !== undefined){
                    //         console.log('songData: ', songData);
                    //         var layout = new View.Layout();
                    //         App.mainRegion.show( layout );

                    //         // search region
                    //         layout.searchRegion.show( new View.Search() );

                    //         // song region
                    //         var songLayout = new CommonSongViews.SongLayout( {model:songData} );
                    //         layout.resultsRegion.show( songLayout );

                    //         // var layout;
                    //         // layout = new LiturgyLayout();
                    //         // App.mainRegion.show(layout);

                    //         // // title region
                    //         // layout.titleRegion.show(new TitleView({model:songData}));

                    //         // // panel region
                    //         // var panelView = new PanelView({model:songData});
                    //         // layout.panelRegion.show(panelView);
                    //         // panelView.on("calendar:edit", function(liturgy){
                    //         //     console.log('show controller; liturgy id:', liturgy.get('id'));
                    //         //     App.trigger("calendar:edit", liturgy.get('id'));
                    //         // });

                    //         // // lineup region
                    //         // var sections = songData.get('sections');
                    //         // var lineupView = new LineupView({collection: new Backbone.Collection(sections)});
                    //         // layout.lineupRegion.show(lineupView);
                    //     }
                    //     else{
                    //         console.log('displaying missing liturgy');
                    //         // App.mainRegion.show( new CommonViews.MissingLiturgy({ liturgyID:id }) );
                    //     }
                    // });
                });
            }
        };
    });

    return App.SongApp.Show.Controller;
});
