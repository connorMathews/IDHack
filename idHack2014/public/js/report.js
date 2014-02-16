$(function() {

    $("#submit-b").click(function() {
        Parse.initialize("yN4ZvpxkeVf0ZgpFXb3BJKaABIl6nN8a3ue5wf4N", "1hAa5E7AIY9S93AvgICGzJ6oaUFvIwVBsomPhaAM");

        var lon = parseFloat($("#lon").val());
        var lat = parseFloat($("#lat").val());
        var headline = $("#event").val();
        var comments = $("#description").val();
        var severity = parseInt($("#severity").val());
        console.log(lon, lat, headline, comments, severity);

        var Reports = Parse.Object.extend("Reports");
        var reports = new Reports();

        reports.set("lon", parseFloat(lon));
        reports.set("lat", parseFloat(lat));
        reports.set("headline", headline.toString());
        reports.set("comments", comments.toString());
        reports.set("severity", parseInt(severity));

        reports.save(null, {
            success: function(reports) {
                alert('New object created with objectId: ' + reports.id);
            },
            error: function(reports, error) {
                alert('Failed to create new object, with error code: ' + error);
            }
        });


    });
});