<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <title>Faith Choir - Liturgy Song Planning</title>
        <!-- <link rel="stylesheet" href="css/screen.css"> -->
        <link rel="stylesheet" href="css/liturgy.css">
        <link rel="shortcut icon" href="http://faith.bluepego.com/favicon.ico?v=2" />
    </head>
    <body>
        <!-- VIEW TEMPLATES  -->
        <script type="text/template" id="liturgy-template">
                <p id="liturgy-name"><%= name %></p>
                <p id="liturgy-date"><%= date %></p>
                <div id="listing"></div>
                <!-- end listing -->
                <div class="item-divider"></div>
        </script>

        <script type="text/template" id="section-template">
            <div class="section-name"><%= name %></div>
            <div class="section-content"></div>
        </script>

        <script type="text/template" id="item-template">
            <div class="item-row-container"></div>
            <div class="song-details-container"></div>
            <div class="item-divider"></div>
        </script>

        <script type="text/template" id="row-template">
            <div class="item-title"><%= part %></div>
            <div class="item-song"><span class="song-title"><%= title %></span><span class="song-composers"><%= composers %></span></div>
        </script>

        <script type="text/template" id="mp3-medium-template">
            <ul>
                <li class="detail-header"><%= medium %></li>
                <% _.each( mediumList, function(entry) { %>
                    <li class="detail-medium"><a href="<%=entry%>" target="_blank"><img class="detail-image" /></a></li>
                <% } ); %>
            </ul>
        </script>
        <script type="text/template" id="vocal-medium-template">
            <ul>
                <li class="detail-header"><%= medium %></li>
                <% _.each( mediumList, function(entry) { %>
                    <li class="detail-medium"><a href="<%=entry%>" target="_blank"><img class="detail-image-pdf" /></a></li>
                <% } ); %>
            </ul>
        </script>
        <script type="text/template" id="guitar-medium-template">
            <ul>
                <li class="detail-header"><%= medium %></li>
                <% _.each( mediumList, function(entry) { %>
                    <li class="detail-medium"><a href="<%=entry%>" target="_blank"><img class="detail-image-pdf" /></a></li>
                <% } ); %>
            </ul>
        </script>
        <script type="text/template" id="piano-medium-template">
            <ul>
                <li class="detail-header"><%= medium %></li>
                <% _.each( mediumList, function(entry) { %>
                    <li class="detail-medium"><a href="<%=entry%>" target="_blank"><img class="detail-image-pdf" /></a></li>
                <% } ); %>
            </ul>
        </script>
        <script type="text/template" id="solo-medium-template">
            <ul>
                <li class="detail-header"><%= medium %></li>
                <% _.each( mediumList, function(entry) { %>
                    <li class="detail-medium"><a href="<%=entry%>" target="_blank"><img class="detail-image-pdf" /></a></li>
                <% } ); %>
            </ul>
        </script>
        <script type="text/template" id="link-medium-template">
            <ul>
                <li class="detail-header"><%= medium %></li>
                <% _.each( mediumList, function(entry) { %>
                    <li class="detail-medium"><a href="<%=entry%>" target="_blank"><img class="detail-image-link" /></a></li>
                <% } ); %>
            </ul>
        </script>
        <script type="text/template" id="ppt-medium-template">
            <ul>
                <li class="detail-header"><%= medium %></li>
                <% _.each( mediumList, function(entry) { %>
                    <li class="detail-medium"><a href="<%=entry%>" target="_blank"><img class="detail-image-ppt" /></a></li>
                <% } ); %>
            </ul>
        </script>

        <script type="text/template" id="navigation-template">
            <div id="home" class="navigation-button large button gray">home</div>
            <div id="about" class="navigation-button large button gray">about</div>
            <div class="navigation-separator"></div>
        </script>

        <script type="text/template" id="lineup-template">
            <div id="lineup-title">Faith Choir Song Lineups</div>
            <div class="blank-line"></div>
            <div id="lineup-listing">
            <ul>
                <% _.each( lineupList, function( lineup, i ){ %>
                    <li class="lineup-item">
                        <div class="lineup-date">
                            <%=lineup.get("date")%>
                        </div>
                        <div class="lineup-title">
                            <a href="#liturgies/<%=lineup.get('liturgy_id')%>"><%=lineup.get("title")%></a>
                        </div>
                    </li>
                <% } ); %>
            </ul>
            </div>
        </script>

        <!-- MEAT -->
        <div id="container">
            <div id="navigation"></div>
            <div id="contents"> </div>
        </div>

        <!-- LIBRARIES -->
        <script src="js/lib/jquery-1.9.0.js"></script>
        <script src="js/lib/underscore.js"></script>
        <script src="js/lib/backbone.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>