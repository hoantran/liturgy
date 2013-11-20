<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/black-tie/jquery-ui.css" type="text/css" />
        <script src='http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js'></script>
        <script src='http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js'></script>
        <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/jquery-ui.min.js'></script>
        <script src='http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min.js'></script>
        <style>
            html{
                -webkit-font-smoothing: antialiased;
                text-rendering: optimizeLegibility;
            }

            body{
                color: #464646;
                font-family: proxima-nova,sans-serif;
                background-color: #fff;
                margin: 0px;
                padding: 0px;
                margin-left:    auto;
                margin-right:   auto;
            }

            #wrap {
                width: 400px;
                margin: 0 auto;
            }
        </style>
    </head>
    <body id="wrap">

        <h1>Find Users</h1>
        <form action="find" method="get">
          <input name="input 1" id="one" type="text" placeholder="Enter Name" class="user-input"/>
          <!-- <input name="input 2" id="two" type="text" placeholder="Enter Name" class="user-input"/> -->
          <!-- <input name="input 3" id="three" type="text" placeholder="Enter Name" class="user-input"/> -->
        </form>
        <div id="user-selection" style="margin-top:10px;"></div>

        <script>
          $(function() {
            // var User = Backbone.Model.extend({}); //Line 9

            // var UserList = Backbone.Collection.extend({ //Line 11
            //   model: User,
            //   url: 'song',
            //   parse: function(response) {
            //     return response;
            //   }
            // });

            // var SelectionView = Backbone.View.extend({ //Line 19
            //   el : $('#user-selection'),
            //   render: function() {
            //     $(this.el).html("You Selected : " + this.model.get('name')); //Line 22
            //     return this;
            //   },
            // });

            // var users = new UserList(); //Line 26
            // console.log( 'fetching ...' );
            // // users.fetch({async: false});

            // users.fetch({
            //     reset: true,
            //     async: false,

            //     success: function(response,xhr) {
            //         console.log("Inside success", this );
            //         // console.log(response);
            // },
            //     error: function (errorResponse) {
            //         console.log(errorResponse)
            //     }
            // });

            // var userNames = users.pluck("name");

            var testData =  [
                { label: 'C++', value: 'C++' },
                { label: 'Java', value: 'Java' },
                { label: 'COBOL', value: 'COBOL' }
            ];

            console.log( 'testData', testData );

            $(".user-input").autocomplete({ //Line 30
              self: this,
              source    : 'song',
              // source: testData,
              // source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ],
              minLength : 2,
              delay     : 100,
              // dataType: "json",
              // contentType: "application/json; charset=utf-8"
              select    : function(event, ui){ //Line 33
                console.log( 'event: ', event );
                console.log( 'ui: ', ui );
                console.log( 'data: ', $( ui ).attr( 'data' ) );
                console.log( 'selected:', ui.item ? ui.item.value :  "Nothing selected");
                console.log( 'this: ', this );
                console.log( 'self: ', self );
                console.log( 'val: ', $( this ).val() );

                $( this ).attr( 'fx', 'rumble' );
                console.log( 'fx: ', $( this ).attr('fx') );

                // var id = ui.item.value;
                // var name = ui.item.label;

                // $(".user-input").val(name);

                // ui.item.value = 'funny';
                // var selectedModel = users.where({name: ui.item.value})[0];
                // var view = new SelectionView({model: selectedModel});
                // view.render();
                $( '#one' ).children( 'input' ).each( function( i, el ) {
                    console.log( '..........' );
                    // console.log( 'i: ', i );
                    console.log( 'el: ', el );
                    console.log( 'val: ', $( el ).val() );
                    console.log( 'data:', $( el ).attr( 'data' ));
                    console.log( 'sel:', $( el ).attr( 'sel' ));
                });

                // return false;
              }
            });
          });
        </script>

    </body>
</html>