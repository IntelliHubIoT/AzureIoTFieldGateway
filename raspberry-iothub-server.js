// Include express.js
var express = require('express');

'use strict';

// Change the port and server if needed
const PORT = 8080;
const SERVER = "localhost";

// The connection string to your IoT Hub. E.g. Hostname=<your namespace>.azure-devices.net;DeviceId=<your devicename>;SharedAccessKey=<your shared access key>
var connectionString = '<your connection string>';

var device = require('azure-iot-device');
var server = express();
var messagesForDevices = [];

// Create the IoT Hub client
var client = new device.Client(connectionString, new device.Https());

// In this example http://localhost:8080/ is the path the arduino should send it's message to.
server.get('/', function(req, res) {
		var readings = req.query.readings;
		var deviceId = req.query.deviceid;
		
		// Remove any extra curley braces
		readings = readings.replace("{","");
		readings = readings.replace("}", "");
		
		// Create an Io THub message. 
		var message = new device.Message("{\"deviceId\" : \"" + deviceId + "\", " + readings + "}");
		
		console.log("Sending message: " + message.getData());
		// Send the message to the IoT Hub.
		client.sendEvent(message, printResultFor('send'));
		
		// Return data sent status back to the arduino. At the moment the arduino doesn't do anything with this status. We could build transient fault handling logic into the Arduino with a retry policy. 		
		res.send("Data sent");
});

// In this example http://localhost:8080/devicemessages?deviceid=<arduino device id> is the path the arduino uses to check for device messages. The arduino's device id is passed in as a parameter.
server.get('/deviceMessages', function(req, res) {
	
	var deviceId = req.query.deviceid;
	
	var message;
	
	// Get the message for the device id.
	messagesForDevices.forEach(function(element) {
		console.log(element);
		if (element._deviceId.toString() == deviceId.toString())
		{
			message = element;
			return;	
		}
	}, this);
	
	// Return the message.
	res.send(message);
	
	// Remove the message from the array.
	messagesForDevices.shift();
});

// Simple page to test the intranet connection to the Pi. 
server.get('/testconnection', function(req, res)
{
	res.send("Test connection suceeded.");
});

// Initialise the server on the port and server consts configured above
var server = server.listen(PORT, SERVER, function() {
	var host = (server.address().address);
	var port = server.address().port;
	
	var d = new Date();

	console.log("Server started %s", d.ddmmyyyyhhMMss());
	console.log("Server is running at http://%s:%s", host, port);
});

// Basic logging function
function printResultFor(op) {
	return function printresult(err, res) {
		if (err) console.log(op + "error: " + err.toString());
		if (res && (res.statusCode !== 204)) console.log(op + " status: " + res.statusCode + " " + res.statusMessage);
	}
}

// Monitor messages from IoT Hub and print them in the console.
setInterval(function(){
	// Poll the Azure IoT Hub periodically for cloud to device message
  	client.receive(function (err, res, msg) {
    	if (!err && res.statusCode !== 204) {
      		client.complete(msg, printResultFor('complete'));
			// Parse the JSON in the message data
			var jsonContent = JSON.parse(msg.getData());
			// Logging of message content
			console.log('deviceId: ' + jsonContent.deviceId);
			console.log('message: ' + jsonContent.message);
			
			// Create a new device message
			var message = new DeviceMessage(jsonContent.deviceId, jsonContent.message, Date.now());
			// Add the message to the array.
			messagesForDevices.unshift(message);
    	}
    	else if (err)
    	{
      		printResultFor('receive: ')(err, res);
    	}
  	});
}, 100);

// Date function
Date.prototype.ddmmyyyyhhMMss = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   var hh = this.getHours().toString();
   var MM = this.getMinutes().toString();
   var ss = this.getSeconds().toString();
   return (dd[1]?dd:"0"+dd[0]) + "/" + (mm[1]?mm:"0"+mm[0]) + "/" + yyyy + " " + (hh[1]?hh:"0"+hh[0]) + ":" + (MM[1]?MM:"0"+MM[0]) + ":" + (ss[1]?ss:"0"+ss[0]); // padding
};

// Device message
var DeviceMessage = function (deviceId, message, timeStamp)
{
	this._deviceId = deviceId;
	this._message = message;
	this._timeStamp = timeStamp;
};

