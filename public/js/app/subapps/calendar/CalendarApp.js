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
            "calendar": "listCalendar"
            // "contacts(/filter/criterion::criterion)": "listContacts",
            // "contacts/:id": "showContact",
            // "contacts/:id/edit": "editContact"
            }
        });

        var executeAction = function(action, arg){
            App.startSubApp("CalendarApp");
            action(arg);
            App.execute("set:active:header", "calendar");
        };

        var API = {
            listCalendar: function(){
                require(["subapps/calendar/list/ListController"], function(ListController){
                    console.log( 'ListController:', ListController );
                    executeAction(ListController.listCalendar);
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
            App.navigate("calendar");
            API.listCalendar();
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