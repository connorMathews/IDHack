$(function() {
    $("#input").keypress(function() {
        $("#input").geocomplete();
    });



    Parse.initialize("yN4ZvpxkeVf0ZgpFXb3BJKaABIl6nN8a3ue5wf4N", "1hAa5E7AIY9S93AvgICGzJ6oaUFvIwVBsomPhaAM");




    var Report = Parse.Object.extend("Reports");
    var query = new Parse.Query(Report);

    var map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
    });

    // create the tile layer with correct attribution
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © OpenStreetMap contributors';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 8,
        maxZoom: 12,
        attribution: osmAttrib
    });

    // start the map in South-East England
    map.setView(new L.LatLng(51.3, 0.7), 9);
    map.addLayer(osm);

    console.log("hi");
    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) {
                var report = results[i];
                var lon = report.get("lon");
                var lat = report.get("lat");
                var headline = report.get("headline");
                var comments = report.get("comments");
                var severity = report.get("severity");
                console.log(report);
                var marker = L.marker([lon, lat]).addTo(map);
                marker.bindPopup(headline + '\n\n' + comments).openPopup();

            }

        },
        error: function(error) {
            console.log(error);
        }
    });

});