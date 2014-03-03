define(["App", "subapps/footer/show/ShowView"], function(App, View){
    return {
        showFooter: function(){
            require([ "entities/Choir"], function(Choir){
                var choir = App.request("choir:choir");
                var view = new View.Message({model: choir});
                App.footerRegion.show(view);
            });
        }
    };
});
