define([    "App",
            "subapps/song/show/ShowView"
        ], function(App, View){
    App.module("SongApp.Show", function(Show, App, Backbone, Marionette, $, _){
        Show.Controller = {
            showLiturgy: function(id){
                require(["common/views/Views", "common/song/Views", "entities/Songs"], function(CommonViews, CommonSongViews){

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
                        }
                        else{
                            console.log('displaying missing liturgy');
                            // App.mainRegion.show( new CommonViews.MissingLiturgy({ liturgyID:id }) );
                        }
                    });
                });
            },

            searchSong: function( searchTerm ){
                require(["models/song", "common/views/Views", "common/song/Views", "entities/Songs"], function(Song, CommonViews, CommonSongViews){
                    // loading view
                    var loadingView = new CommonViews.Loading({
                        title: "Search ...",
                        message: "Loading results for song search similar to (" + searchTerm + ") from server."
                    });
                    App.mainRegion.show(loadingView);

                    var searchingSongs = App.request("song:search:term", searchTerm);
                    $.when(searchingSongs).done(function(songData){
                        if(songData !== undefined && songData.length > 0){
                            var layout = new View.Layout();
                            App.mainRegion.show( layout );

                            // search region
                            layout.searchRegion.show( new View.Search() );

                            // song region
                            var Col = Backbone.Collection.extend({model: Song});
                            var collection = new Col(songData);
                            var songLayout = new View.Results( {collection : collection } );
                            layout.resultsRegion.show( songLayout );
                        }
                        else {
                            App.mainRegion.show( new View.NoSong() );
                        }
                    });
                });
            }
        };
    });

    return App.SongApp.Show.Controller;
});
