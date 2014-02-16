// Include Cloud Code module dependencies
Parse.Cloud.define("receiveSMS", function(request, response) {

    console.log("Received a new text: " + request.params.Body);

    var Reports = Parse.Object.extend("Reports");
    var reports = new Reports();
    var information = request.params.Body.split("/");

    reports.set("phoneNum", request.params.From);
    reports.set("headline", information[1]);
    reports.set("comments", information[2]);
    reports.set("severity", information[3]);

    reports.save(null, {
        success: function(reports) {
            alert('New object created with objectId: ' + reports.id);
        },
        error: function(reports, error) {
            alert('Failed to create new object, with error code: ' + error.description);
        }
    });

    getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCwntQfBiEALSVVZ7vXlbOvis0qaxzCbfM&sensor=false", function() {

        alert("Script loaded and executed.");
        // Here you can use anything you defined in the loaded script
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': information[0]
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log("converted");
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }

        });
    });

    response.success();
});