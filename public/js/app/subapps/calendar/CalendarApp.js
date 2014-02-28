define( ["App"], function(App){
    App.module("CalendarApp", function(CalendarApp, App, Backbone, Marionette, $, _){

        this.on( "start", function(){
            console.log("starting CalendarApp ...");
        });

        CalendarApp.onStop = function(){
            console.log("stopping CalendarApp !!!");
        };
    });

    App.module("Routers.CalendarApp", function(CalendarAppRouter, App, Backbone, Marionette, $, _){
        CalendarAppRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
            "calendar"      : "listCalendar",
            "calendar/:id"  : "showLiturgy",
            // "contacts(/filter/criterion::criterion)": "listContacts",
            // "contacts/:id": "showContact",
            "calendar/:id/edit": "editLiturgy",
            "calendar/:id/duplicate": "duplicateLiturgy"
            }
        });

        var executeAction = function(action, arg){
            // console.log('executeAction:', action, arg);
            App.startSubApp("CalendarApp");
            action(arg);
            // App.execute("set:active:header", "calendar");
        };

        var API = {
            listCalendar: function(){
                require(["subapps/calendar/list/ListController"], function(ListController){
                    executeAction(ListController.listCalendar);
                });
            },

            showLiturgy: function(id){
                require(["subapps/calendar/show/ShowController"], function(ShowController){
                    executeAction(ShowController.showLiturgy, id);
                });
            },

            editLiturgy: function(id){
                require(["subapps/calendar/edit/EditController"], function(EditController){
                    executeAction(EditController.editLiturgy, {id: id, duplicateFlag: false});
                });
            },

            duplicateLiturgy: function(id){
                require(["subapps/calendar/edit/EditController"], function(EditController){
                    executeAction(EditController.editLiturgy, {id: id, duplicateFlag: true});
                });
            }



          // showContact: function(id){
          //   require(["apps/contacts/show/show_controller"], function(ShowController){
          //     executeAction(ShowController.showContact, id);
          //   });
          // },

          // editContact: function(id){
          //   require(["apps/contacts/edit/edit_controller"], function(EditController){
          //     executeAction(EditController.editContact, id);
          //   });
          // }
        };

        App.on("calendar:list", function(){
            $(document).trigger('fb:status:check');
            App.navigate("calendar");
            API.listCalendar();
        });

        App.on("calendar:show", function(id){
            $(document).trigger('fb:status:check');
            App.navigate("calendar/"+id);
            API.showLiturgy(id);
        });

        App.on("calendar:edit", function(id){
            $(document).trigger('fb:status:check');
            App.navigate("calendar/" + id + "/edit");
            API.editLiturgy(id);
        });

        App.on("calendar:duplicate", function(id){
            $(document).trigger('fb:status:check');
            App.navigate("calendar/" + id + "/duplicate");
            API.duplicateLiturgy(id);
        });

        // App.on("contacts:filter", function(criterion){
        //   if(criterion){
        //     App.navigate("contacts/filter/criterion:" + criterion);
        //   }
        //   else{
        //     App.navigate("contacts");
        //   }
        // });

        // App.on("contact:show", function(id){
        //   App.navigate("contacts/" + id);
        //   API.showContact(id);
        // });

        // App.on("contact:edit", function(id){
        //   App.navigate("contacts/" + id + "/edit");
        //   API.editContact(id);
        // });

        App.addInitializer(function(){
            new CalendarAppRouter.Router({
            controller: API
            });
        });
    });

  return App.CalendarAppRouter;
});