<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <title>Liturgy Experiments</title>
        <link rel="stylesheet" href="css/screen.css">
    </head>
    <body>
        <script type="text/template" id="liturgy-template">
            <div>
                <h1 id="liturgy-name"><%= name %></h1>
                <p id="liturgy-date"><%= date %></p>
            </div>
        </script>

        <div id="container"></div>
        <script src="js/lib/jquery-1.9.0.js"></script>
        <script src="js/lib/underscore.js"></script>
        <script src="js/lib/backbone.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>