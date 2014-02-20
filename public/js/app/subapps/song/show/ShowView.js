define(["App",
        "hbs!subapps/song/show/tpl/layout",
        "hbs!subapps/song/show/tpl/search",
        "hbs!subapps/song/show/tpl/result",
        "hbs!subapps/song/show/tpl/nosong",
        "common/song/Views"
        ],
        function(App, layoutTpl, searchTpl, resultTpl, nosongTpl, CommonSongViews ){
    App.module("SongApp.Show.View", function(View, App, Backbone, Marionette, $, _){

        View.Layout = Marionette.Layout.extend({
          template: layoutTpl,

          regions: {
                searchRegion:       "#search-region",
                resultsRegion:      "#results-region"
          }
        });

        View.Search = Marionette.ItemView.extend({
          template: searchTpl
        });

        View.EachResult = Backbone.Marionette.CollectionView.extend({
            itemView: CommonSongViews.SongLayout,
            className: "section-border",
            initialize: function() {
                if(this.model){
                    this.collection = new Backbone.Collection(this.model);
                }
            }
        });

        View.Results = Backbone.Marionette.CollectionView.extend({
            itemView: View.EachResult
        });

        View.NoSong = Marionette.ItemView.extend({
            template: nosongTpl
        });
    });

    return App.SongApp.Show.View;
});
