define(["App",
        'jquery',
        'hbs!common/song/tpl/songLayout',
        'common/song/SongTitleView',
        'common/song/MediaView',
        'collections/MediaList',
        'backbone', 'marionette'
        ], function(
            App,
            $,
            songLayoutTpl,
            SongTitleView,
            MediaView,
            MediaList,
            Backbone
        ){
    App.module("Common.SongViews", function(Views, App, Backbone, Marionette, $, _){

        // missing view
        Views.SongLayout = Backbone.Marionette.Layout.extend({
            template: songLayoutTpl,

            regions: {
                songRegion  : ".song-region",
                mediaRegion : ".media-region"
            },

            onShow: function(){
                var songTitleView = new SongTitleView({model:this.model});

                // // parent init: model undefined but collection defined in constructor
                // // child init: model is passed in for each, one member of the parent's collection per child. collection is undefined.
                // // http://jsfiddle.net/derickbailey/QPg4D/
                // //
                var mediaList = new MediaList( this.model.get('song').media );
                var mediaView = new MediaView({
                    collection: mediaList
                });

                this.songRegion.show( songTitleView );
                this.mediaRegion.show( mediaView );
            }
        });
    });

    return App.Common.SongViews;
});