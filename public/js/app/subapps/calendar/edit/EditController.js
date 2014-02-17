define( [   "App",
            "subapps/calendar/edit/EditView"
            // "views/MainLayout",
            // "subapps/calendar/list/CalendarLayout", "subapps/calendar/list/CalendarPanelView", "subapps/calendar/list/CalendarView", "views/JumbotronView"
            ],
    // function( App, MainLayout, CalendarLayout, CalendarPanelView, CalendarView, JumbotronView ){
    function(
            App,
            View
            ){
    App.module( "CalendarApp.Edit", function(Edit, App, Backbone, Marionette, $, _){
        Edit.Controller = {
            editLiturgy: function(id){
                require(["common/views", "models/liturgy", "entities/CalendarLiturgies"], function(CommonViews, Liturgy){

                    // loading view
                    var loadingView = new CommonViews.Loading({
                        title: "Loading ...",
                        message: "Retrieving a liturgy (" + id + ") data from server"
                    });
                    App.mainRegion.show(loadingView);

                    // getting the data, and sets up the eventual dataful view
                    var fetchingLiturgy = App.request("calendar:liturgy", id);
                    $.when(fetchingLiturgy).done(function(liturgyData){
                        if(liturgyData !== undefined){
                            var liturgy = new Liturgy();
                            liturgy.populate( liturgyData );
                            // console.log('liturgy:', liturgy);

                            var view = new View.Form({ model: liturgy });
                            App.mainRegion.show( view );
                            view.on("liturgy:form:submit", function(model){
                                if(model.save()){
                                    App.trigger("calendar:show", model.get('id'));
                                }
                                else {
                                    view.triggerMethod("form:data:invalid", model.validationError);
                                }
                            });


                            // // liturgyView.on("calendar:edit", function(liturgy){
                            // //     App.trigger("calendar:edit", liturgy.get("id"));
                            // // });
                            // console.log('data:', liturgyData);
                            // var layout;
                            // layout = new LiturgyLayout();
                            // App.mainRegion.show(layout);

                            // // title region
                            // layout.titleRegion.show(new TitleView({model:liturgyData}));

                            // // panel region
                            // var panelView = new PanelView({model:liturgyData});
                            // layout.panelRegion.show(panelView);
                            // panelView.on("calendar:edit", function(liturgy){
                            //     console.log('show controller; liturgy id:', liturgy.get('id'));
                            //     App.trigger("calendar:edit", liturgy.get('id'));
                            // });

                            // // lineup region
                            // var sections = liturgyData.get('sections');
                            // var lineupView = new LineupView({collection: new Backbone.Collection(sections)});
                            // layout.lineupRegion.show(lineupView);
                        }
                        else{
                            App.mainRegion.show( new CommonViews.MissingLiturgy({ liturgyID:id }) );
                        }
                    });
                });
                // var mainLayout = new MainLayout();
                // mainLayout.render();

                // var calendarLayout = new CalendarLayout();
                // calendarLayout.render();

                // var panel = new CalendarPanelView();

                // require( [ "entities/CalendarLiturgies" ], function( CalendarLiturgies ){
                //     var fetchingLineups = App.request( "calendar:liturgies" );

                //     $.when( fetchingLineups ).done( function( lineups ){
                //         var calendarView = new CalendarView({
                //             collection: lineups
                //         });

                //         lineups.markNextLiturgy();

                //         calendarLayout.on( "show", function(){
                //             calendarLayout.panelRegion.show( panel );
                //             calendarLayout.calendarRegion.show( calendarView );
                //         });

                //         calendarView.on("itemview:calendar:show", function(childView, model){
                //             App.trigger("calendar:show", model.get("id"));
                //         });

                //         App.mainRegion.show                 (mainLayout);
                //         mainLayout.jumbotronRegion.show     ( new JumbotronView() );
                //         mainLayout.contentRegion.show       ( calendarLayout );
                //     });
                // });
            }
        };
    });

    return App.CalendarApp.Edit.Controller;
});



// .....
//     <label for="date">Liturgy Date: </label>
//     <input class = "js-liturgy-inputs" id="date" data_id="date" value="{{ date }}"type="text" autocomplete="off" />
//     <% if( typeof items !== 'undefined' && items.length > 0 ) {  }}
//             <div>
//                 <% _.each( items, function( item, i ){  }}
//                     <label for="{{ item.labeid }}">{{ item.label }}: </label>
//                     <input class = "js-liturgy-inputs song-input" data_id="{{ item.labelid }}"  data_songid="{{ item.songid }}" value="{{ item.songtitle }}" type="text" autocomplete="off" />
//                 <% });  }}
//             </div>
//      <% }  }}
//      <button class="button submit-button" id="save">Save</button>
// .....





//           <div class="form-group">
//             <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
//             <div class="col-sm-10">
//               <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
//             </div>
//           </div>




//           <div class="form-group">
//             <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
//             <div class="col-sm-10">
//               <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
//             </div>
//           </div>

//           <div class="form-group">
//             <div class="col-sm-offset-2 col-sm-10">
//               <div class="checkbox">
//                 <label>
//                   <input type="checkbox"> Remember me
//                 </label>
//               </div>
//             </div>
//           </div>

//           <div class="form-group">
//             <div class="col-sm-offset-2 col-sm-10">
//               <button type="submit" class="btn btn-default js-edit-submit">Sign in</button>
//             </div>
//           </div>