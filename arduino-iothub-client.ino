#include <Bridge.h>
#include <HttpClient.h>
#include <Wire.h>
#include <SoftwareSerial.h>

// How often in milliseconds should the arduino send messages to the IoT Hub
const int sendInterval = 5000;
// How often in milliseconds should the arduino poll the Pi for messages
const int receiveInterval = 500;
// The device id of your arduino. This is not the Azure IoTHub device id
const String deviceID = "9ca3adcb-99b0-4546-a0e7-bbf234c3bb82"; 
// The IP address of your Pi
const String gatewayAddress = "192.168.1.64";
// The port the node.js app is running on
const String gatewayPort = "8080";

unsigned long sendPreviousMillis = 0;
unsigned long receivePreviousMillis = 0;

void setup() {
  // Arduino Yun Bridge
  Bridge.begin();
  
}

void loop() {
  // put your main code here, to run repeatedly:
  unsigned long sendCurrentMillis = millis();
  unsigned long receiveCurrentMillis = millis();

  if (sendCurrentMillis - sendPreviousMillis >= sendInterval)
  {
    // Update the send previous millis with the current millis time
    sendPreviousMillis = sendCurrentMillis;
    
    // Get the readings from a sensor
    long temperature = random(20, 30); // Simulate data in this example using random
    long humidity = random(40,60);
    
    // Send a message to the Pi. The sensor readings are sent as a html encoded JSON message. The reading field names are wrapped in quotes and readings are seperated by commas
    HttpClient client;
    client.get("http://" + gatewayAddress + ":" + gatewayPort + "/?readings={%22temperature%22:" + String(temperature) + "%2C%22humidity%22:" + String(humidity) + "}&deviceid=" + deviceID);
  }

  if (receiveCurrentMillis - receivePreviousMillis >= receiveInterval)
  {
    // Update the recieve previous millis with the current millis time
    receivePreviousMillis = receiveCurrentMillis;

    // Poll the Pi for messages
    HttpClient client;
    String messageReceived = "";
    
    client.get("http://" + gatewayAddress + ":" + gatewayPort + "/deviceMessages?deviceid=" + deviceID);
    // Read the data
    while (client.available()) {
      char c = client.read();
      messageReceived += c;
    }
    
    // Check the message to see what action it contains
    if (messageReceived.indexOf("FlashLED"))
    {
      // Do action based on message
    }
    else if (messageReceived.indexOf("BEEP"))
    {
      // Do action based on message
    }
  }
}
