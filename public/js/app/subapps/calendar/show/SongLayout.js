define(['jquery', 'hbs!subapps/calendar/show/tpl/songLayout',
        'subapps/calendar/show/SongTitleView',
        'subapps/calendar/show/MediaView',
        "collections/MediaList",
        'backbone', 'marionette'],
    function ($, template, SongTitleView, MediaView, MediaList, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend({
            template: template,

            regions: {
                songRegion  : ".song-region",
                mediaRegion : ".media-region"
            },

            showViews: function(){
                var songTitleView = new SongTitleView({model:this.model});
                // layout.lineupRegion.show( songTitleView );

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
            },

            onShow: function(){
                this.showViews();
            }
        });
    });