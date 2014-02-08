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

            App.navigationRegion.show(view);
        }
    };
});
