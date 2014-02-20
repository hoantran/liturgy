define(["App",
        "hbs!subapps/song/show/tpl/layout",
        "hbs!subapps/song/show/tpl/search",
        "hbs!subapps/song/show/tpl/result",
        "common/song/Views"
        ],
        function(App, layoutTpl, searchTpl, resultTpl, CommonSongViews ){
    App.module("SongApp.Show.View", function(View, App, Backbone, Marionette, $, _){
        // lineup view
        // View.Liturgy = Marionette.ItemView.extend({
        //     template: viewTpl,

        //     events: {
        //         "click a.js-edit": "editClicked"
        //     },

        //     editClicked: function(e){
        //         e.preventDefault();
        //         this.trigger("song:edit", this.model);
        //     }
        // });

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

        // View.Results = Backbone.Marionette.CollectionView.extend({
        //     // tagName: "ul",
        //     itemView: CommonSongViews.SongLayout,
        //     className: "section-border",
        //     // initialize: function() {
        //     //     this.listenTo(this.collection, "add", this.render);
        //     // }
        // });


        View.Results = Backbone.Marionette.CompositeView.extend({
            template: resultTpl,
            tagName: "div",
            className: "section-border",
            itemViewContainer: ".js-result-container",
            itemView: CommonSongViews.SongLayout
        });

    });

    return App.SongApp.Show.View;
});
