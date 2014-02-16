$(function() {
    Parse.initialize("yN4ZvpxkeVf0ZgpFXb3BJKaABIl6nN8a3ue5wf4N", "1hAa5E7AIY9S93AvgICGzJ6oaUFvIwVBsomPhaAM");

    var Report = Parse.Object.extend("Report");
    var query = new Parse.Query(Report);
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
                // var marker = L.marker([lon, lat]).addTo(map);

            }

        },
        error: function(error) {

        }
    });

});