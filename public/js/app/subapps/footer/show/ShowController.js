define(["App", "subapps/footer/show/ShowView"], function(App, View){
    return {
        showFooter: function(){
            var view = new View.Message();
            App.footerRegion.show(view);
        }
    };
});
