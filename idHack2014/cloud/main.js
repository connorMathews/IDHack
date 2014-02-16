var twilio = require('twilio');
twilio.initialize('ACfb95b68c67b1c421fb351e537fd09421', '6d3a13db188b7d2603b8bfbf75c59f41');

// Include Cloud Code module dependencies
Parse.Cloud.define("receiveSMS", function(request, response) {


    if (request.params.Body.toLowerCase() == "report") {

        // Send an SMS message
        twilio.sendSMS({
            to: request.params.From,
            from: request.params.To,
            body: 'Please enter the with the following format: longitude/latitude/headline/comments/severity(1-10)'
        }, {
            success: function(httpResponse) {
                response.success("SMS sent!");
            },
            error: function(httpResponse) {
                response.error("Uh oh, something went wrong");
            }
        });
    } else {
        var Reports = Parse.Object.extend("Reports");
        var reports = new Reports();
        var information = request.params.Body.split("/");

        reports.set("phoneNum", (request.params.From).toString());
        reports.set("len", parseFloat(information[0]));
        reprots.set("lat", parseFloat(information[1]));
        reports.set("headline", information[2]);
        reports.set("comments", information[3]);
        reports.set("severity", parseInt(information[4]));

        reports.save(null, {
            success: function(reports) {
                alert('New object created with objectId: ' + reports.id);
            },
            error: function(reports, error) {
                alert('Failed to create new object, with error code: ' + error.description);
            }
        });


        // Send an SMS message
        twilio.sendSMS({
            to: request.params.From,
            from: request.params.To,
            body: 'Thanks for the information!'
        }, {
            success: function(httpResponse) {
                response.success("SMS sent!");
            },
            error: function(httpResponse) {
                response.error("Uh oh, something went wrong");
            }
        });
    }


});