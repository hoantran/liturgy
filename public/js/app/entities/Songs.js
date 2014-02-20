define(['App', 'backbone', 'marionette', 'models/song' ],
    function (App, Backbone, Marionette, Song ) {

    var API = {
        getSong: function( id ) {
            var song = new Song({ id: id });
            var defer = $.Deferred();
            song.fetch({
                success: function( data ){
                    defer.resolve( data );
                },
                error: function( data ){
                    defer.resolve( undefined );
                }
            });

            return defer.promise();
        },

        searchSong: function( searchTerm ) {
            var defer = $.Deferred();
            var request = $.ajax({
                url: "song",
                dataType: 'json',

                data: { searchTerm : searchTerm },

                success: function( data ){
                    // console.log('ss:', data);
                    defer.resolve( data );
                },

                error: function( data ){
                    defer.resolve( undefined );
                }
            });
            return defer.promise();
        }
    };

    App.reqres.setHandler( "song:song", function( id ){
        return API.getSong( id );
    });

    App.reqres.setHandler( "song:search:term", function( searchTerm ){
        return API.searchSong( searchTerm );
    });

    return;
});