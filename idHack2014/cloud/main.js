// Include Cloud Code module dependencies
Parse.Cloud.define("receiveSMS", function(request, response) {
    console.log("Received a new text: " + request.params.Body);



    response.success();
});