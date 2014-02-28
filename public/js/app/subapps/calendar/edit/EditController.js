define( [   "App",
            "subapps/calendar/edit/EditView"
            ],
    function(
            App,
            View
            ){
    App.module( "CalendarApp.Edit", function(Edit, App, Backbone, Marionette, $, _){
        Edit.Controller = {
            editLiturgy: function(options){
                require(["common/views/Views", "models/liturgy", "entities/CalendarLiturgies"], function(CommonViews, Liturgy){
                    // loading view
                    var loadingView = new CommonViews.Loading({
                        title: "Loading ...",
                        message: "Retrieving a liturgy (" + options.id + ") data from server"
                    });
                    App.mainRegion.show(loadingView);

                    // getting the data, and sets up the eventual dataful view
                    var fetchingLiturgy = App.request("calendar:liturgy", options.id);
                    $.when(fetchingLiturgy).done(function(liturgyData){
                        if(liturgyData !== undefined){
                            var liturgy = new Liturgy();
                            liturgy.populate( liturgyData );
                            // console.log('liturgy:', liturgy);

                            var view = new View.Form({ model: liturgy });
                            App.mainRegion.show( view );

                            view.on("liturgy:form:submit", function(model){
                                console.log('liturgy:form:submit');
                                if(options.duplicateFlag){
                                    // for duplicating a liturgy, take out the 'id' attribute so that
                                    // the laravel 4 on the server end would call 'store' method on the controller
                                    model.unset( 'id', { silent: true });
                                }

                                if(model.save(null, {
                                    success: function( data ){
                                        App.trigger("calendar:show", model.get('id'));
                                    },
                                    error: function( data ){
                                        var statusView = new CommonViews.Status({
                                            title: "SAVING ERROR",
                                            message: "Can not save the liturgy, probable due to not having permission to do so."
                                        });
                                        App.mainRegion.show(statusView);
                                    }
                                })){
                                    // App.trigger("calendar:show", model.get('id'));
                                }
                                else {
                                    view.triggerMethod("form:data:invalid", model.validationError);
                                }


                            });
                        }
                        else{
                            App.mainRegion.show( new CommonViews.MissingLiturgy({ liturgyID:id }) );
                        }
                    });
                });
            }
        };
    });
    return App.CalendarApp.Edit.Controller;
});