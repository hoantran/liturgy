define(["App", "subapps/navigation/show/ShowView"], function(App, View){
    return {
        showNavigation: function(){
            var view = new View.Message();

            view.on("home:clicked", function(childView, model){
                App.trigger("calendar:list");
            });

            view.on("brand:clicked", function(childView, model){
                App.trigger("calendar:list");
            });

            view.on("song:search", function(searchTerm){
                console.log('searchTerm:', searchTerm);
                App.trigger("song:search", searchTerm);
            });

            App.navigationRegion.show(view);
        }
    };
});
