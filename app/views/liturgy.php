<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <title>Liturgy Song Planning</title>
        <!-- <link rel="stylesheet" href="css/screen.css"> -->
        <link rel="stylesheet" href="css/liturgy.css">
    </head>
    <body>
        <!-- VIEW TEMPLATES  -->
        <script type="text/template" id="liturgy-template">
                <p id="liturgy-name"><%= name %></p>
                <p id="liturgy-date"><%= date %></p>
                <div class="listing"></div>
                <!-- end listing -->
                <div class="item-divider"></div>
        </script>

        <script type="text/template" id="section-template">
            <div class="section-name"><%= name %></div>
            <div class="section-content"></div>
        </script>

        <script type="text/template" id="item-template">
            <div class="item-row-container"></div>
            <div class="song-details"></div>
            <div class="item-divider"></div>
        </script>

        <script type="text/template" id="row-template">
            <div id="item-title" class="item-cell"><%= part %></div>
            <div id="item-song" class="item-cell"><span class="song-title"><%= title %></span><span class="song-composers"><%= composers %></span></div>
        </script>

        <!-- MEAT -->
        <div class="container"></div>

        <!-- LIBRARIES -->
        <script src="js/lib/jquery-1.9.0.js"></script>
        <script src="js/lib/underscore.js"></script>
        <script src="js/lib/backbone.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>