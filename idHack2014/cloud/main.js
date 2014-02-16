var twilio = require('twilio');
twilio.initialize('ACfb95b68c67b1c421fb351e537fd09421', '6d3a13db188b7d2603b8bfbf75c59f41');

// Include Cloud Code module dependencies
Parse.Cloud.define("receiveSMS", function(request, response) {


    if (request.params.Body.toLowerCase() == "report") {
        // Send an SMS message
        twilio.sendSMS({
            to: request.params.From,
            from: request.params.To,
            body: 'Please enter the with the following format for reports: longitude/latitude/headline/comments/severity(1-10)'
        }, {
            success: function(httpResponse) {
                response.success("SMS sent!");
            },
            error: function(httpResponse) {
                response.error("Uh oh, something went wrong");
            }
        });
    } else if (request.params.Body.toLowerCase() == "alert") {
        // Send an SMS message
        twilio.sendSMS({
            to: request.params.From,
            from: request.params.To,
            body: 'Please enter the with the following format for alerts: longitude/latitude'
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

        if (information.length == 2) {
            var longitude = parseFloat(information[0]);
            var latitude = parseFloat(information[1]);
            var range = new Parse.Query("Reports");
            range.greaterThan("lon", longitude - 0.1).lessThan("lon", longitude + 0.1).greaterThan("lat", latitude - 0.1).lessThan("lat", latitude + 0.1);
            range.find({
                success: function(results) {
                    if (results.length != 0) {
                        for (var i = 0; i < results.length; i++) {
                            var lonDis = Math.abs(results[i].get("lon") - longitude);
                            var latDis = Math.abs(results[i].get("lat") - latitude);
                            var original = Math.sqrt(Math.pow(lonDis, 2) + Math.pow(latDis, 2));
                            var dis = Math.round(original * 100) / 100
                            twilio.sendSMS({
                                to: request.params.From,
                                from: request.params.To,
                                body: results[i].get("headline") + ": " + results[i].get("comments") + "(severity " + results[i].get("severity") + "). It is " + dis + " mile away from you!!! Stay Safe!!"
                            }, {
                                success: function(httpResponse) {
                                    response.success("SMS sent!");
                                },
                                error: function(httpResponse) {
                                    response.error("Uh oh, something went wrong");
                                }
                            });
                        }
                    } else {
                        twilio.sendSMS({
                            to: request.params.From,
                            from: request.params.To,
                            body: "You are safe!!"
                        }, {
                            success: function(httpResponse) {
                                response.success("SMS sent!");
                            },
                            error: function(httpResponse) {
                                response.error("Uh oh, something went wrong");
                            }
                        });
                    }
                },
                error: function(error) {
                    alert('Failed to run query');
                }
            });
        } else {
            reports.set("phoneNum", (request.params.From).toString());
            reports.set("lon", parseFloat(information[0]));
            reports.set("lat", parseFloat(information[1]));
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
    }


});