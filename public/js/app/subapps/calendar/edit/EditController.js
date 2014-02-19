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
                require(["common/Views", "models/liturgy", "entities/CalendarLiturgies"], function(CommonViews, Liturgy){
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
                                ///.....
                                /// This duplicateFlag complicates this code
                                /// Because editing and duplicating a liturgy is so much alike,
                                /// the best solution is finding away to abstract out EditController and its EditView
                                /// so that they can be subclassed and used for both editing and duplicating,
                                /// in which the corresponding subclasses only need to overwrite a few parameters
                                /// for its own cases.
                                if(options.duplicateFlag){
                                    // for duplicating a liturgy, take out the 'id' attribute so that
                                    // the laravel 4 on the server end would call 'store' method on the controller
                                    model.unset( 'id', { silent: true });
                                    if(model.save( null, {
                                            success: function( data ){
                                                App.trigger( "calendar:show", data.get('id') );
                                            },
                                            error: function( data ){
                                                console.log( 'calendar/edit/EditController error data:', data );
                                            }
                                        })) {
                                        // App.trigger("calendar:show", model.get('id'));
                                    }
                                    else {
                                        view.triggerMethod("form:data:invalid", model.validationError);
                                    }
                                }

                                ///// .....
                                else {
                                    console.log('saving model:', model);
                                    if(model.save()){
                                        App.trigger("calendar:show", model.get('id'));
                                    }
                                    else {
                                        view.triggerMethod("form:data:invalid", model.validationError);
                                    }
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