from flask import Flask, request, redirect
import twilio.twiml
from twilio.rest import TwilioRestClient
from parse_rest.connection import register
from parse_rest.datatypes import Object

register("yN4ZvpxkeVf0ZgpFXb3BJKaABIl6nN8a3ue5wf4N",
		 "oPbPeSdwKlryptQy5DSwgKnvKN7w94LOEsvUkTER")

#parse tables
class Reports(Object):
    pass

#connect to the twilio account
account_sid = "ACfb95b68c67b1c421fb351e537fd09421"
auth_token = "6d3a13db188b7d2603b8bfbf75c59f41"
client = TwilioRestClient(account_sid, auth_token)
 
app = Flask(__name__)
 
@app.route("/", methods=['GET', 'POST'])
def hello_monkey():
    """Respond to incoming calls with a simple text message."""
    message_body = request.values.get('Body', None)
    if message_body:
    	information = message_body.split('/')
    	report = Reports(phoneNum=information[0], lon=information[1], lat=information[2], headline=information[3], comments=information[4], severity=information[5])
    	report.save()
    resp = twilio.twiml.Response()
    resp.message("Hello, Mobile Monkey")
    return str(resp)
 
if __name__ == "__main__":
    app.run(debug=True)