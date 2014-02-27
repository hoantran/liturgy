/** NOTES ON SEcURITY

FLOW:       As soon as the FB account is authenticated,
            request an authenication request to get a session from the server which also includes an CSRF token.
            Save that token in the user model.
            ---> (if the response indicates the user as an admin ?)
            ---> force home page reload ( to load the admin version of the pages with the buttons visible )

            Whenever an operation needs authorization, set the ajax header
            to the CSRF token:
            headers: {'X-CSRF-Token': data.token}

            When the FB account is UNauthenticated,
            clear the CSRF token in the user model.
            ---> force home page reload ( to load the regular version of the pages withOUT the buttons visible )


SERVER:     when the authenication request comes:
            * create a new session with the user info
            * create an CSRF token to be sent back to client

            function login() {
                if($_POST['email'] == 'admin' && $_POST['password'] == 'admin') {
                    $user = array("email"=>"admin", "firstName"=>"Web", "lastName"=>"Scents", "token"=>base64_encode(openssl_random_pseudo_bytes(16)));
                    $_SESSION['user'] = $user;
                    echo json_encode($user);
                }
            }

            Whenever an operation needs authorization:
            * check that the CSRF header matches the user session's
            * check that the user is in the system and authorized for the operation
            function authorize() {
                return function () use ( $role ) {
                    // Get the Slim framework object
                    $app = Slim::getInstance();
                    // First, check to see if the user is logged in at all
                    if(!empty($_SESSION['user'])) {
                        if($_SESSION['user']['token'] == $_SERVER['HTTP_X_CSRF_TOKEN']) {
                            //User is logged in and has the correct permissions... Nice!
                            return true;
                        } else {
                            // If a user is logged in, but doesn't have permissions, return 403
                            $app->halt(403, 'ACCESS DENIED');
                        }
                    } else {
                        // If a user is not logged in at all, return a 401
                        $app->halt(401, 'PLEASE LOGIN FIRST');
                    }
                };
            }


BUG:        There is a known 'bug':
            Facebook sessions status does not communicate immediately across browser tabs (pages)
            Currently, the status is checked every 30s.
            i.e. this app checkes for FB status change every 30s,
            in case FB status or user login identity changes.

*/



define(['App','facebook'], function(App){
// define(['App'], function(App){

    // FB.init({
    //     appId      : '151285299151',
    //     cookie     : true,
    //     status     : true,
    //     xfbml      : true
    // });

    FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
            console.log('Logged in');
            // FB.api(
            //     "/me/picture",
            //     function (response) {
            //         if (response && !response.error) {
            //             console.log('pix:', response);
            //         }
            //     }
            // );

             FB.api('/me', function (response) {
                // fb.user.set(response); // Store the newly authenticated FB user
                // App.trigger('fb:loggedin', response);
                console.log('resp:', response);
                require( [ "entities/SessionEntity" ], function( CalendarLiturgies ){
                    var session = App.request("entities:session");
                    session.set('fbname', response.name);
                    session.set('fbid', response.id);
                    session.set('token', '');
                    var fetchingSession = App.request( "entities:session:register" );
                    $.when( fetchingSession ).done( function( userSession ){
                        if(userSession === undefined){
                            console.log('can not register with server');
                        } else {
                            var token = userSession.get('token');
                            console.log('userSession:', userSession);
                            App.request('entities:session:loggedIn', token);
                            session.set('pic', 'http://graph.facebook.com/' + response.id + '/picture/');
                            App.trigger('view:refresh');
                        }
                    });
                });

            });

        } else {
            // FB.login();
            console.log('Logged out --- ');
            App.request("entities:session:loggedOut");
            App.trigger("view:refresh");
        }
    });


    // the login is here as to circumvent popup blocker, especially on chrome
    // http://bit.ly/Okib2f
    // http://bit.ly/1myRcyS
    $(document).on('login', function() {
        FB.init({
            appId      : '151285299151',
            cookie     : true,
            status     : true,
            xfbml      : true
        });

        FB.login(function(response) {}, {
            scope: 'publish_actions'
        });

        // check Facebook status every 30s
        window.setInterval(FB.getLoginStatus, 30000);

        return false;
    });

    // $(document).on('fbStatusChange', function (event, data) {
    //     if (data.status === 'connected') {
    //         FB.api('/me', function (response) {
    //             fb.user.set(response); // Store the newly authenticated FB user
    //         });
    //     } else {
    //         fb.user.set(fb.user.defaults); // Reset current FB user
    //     }
    // });

    $(document).on('logout', function () {
        FB.logout();
        App.request("entities:session:loggedOut");
        App.trigger('view:refresh');
        return false;
    });

    // $(document).on('test:register', function () {
    //         require( [ "entities/SessionEntity" ], function( CalendarLiturgies ){
    //             var session = App.request("entities:session");
    //             session.set('fbname', 'hoan');
    //             session.set('fbid', 1234);
    //             session.set('token', '');
    //             console.log('session:', session);
    //             var fetchingSession = App.request( "entities:session:register" );
    //             $.when( fetchingSession ).done( function( userSession ){
    //                 if(userSession === undefined){
    //                     console.log('can not register with server');
    //                 } else {
    //                     var token = userSession.get('token');
    //                     console.log('userSession:', userSession);
    //                     App.request("entities:session:loggedIn", token);
    //                 }
    //             });
    //         });
    // });















    // FB.getLoginStatus(function(response) {
    //     console.log(response);
    //     if(response.status !== 'connected'){
    //         console.log('trying to login');
    //         // FB.login();
    //         $(document).trigger('login');
    //     }
    // });

    // FB.getLoginStatus(function(response) {
    //     console.log(response);
    // });
});