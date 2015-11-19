# AzureIoTFieldGateway
Code samples for using a Raspberry PI with the Azure IoT SDK as a field gateway for Arduino and Particle Photon.  

## Introduction

At present connecting an Arduino to a Microsoft Azure IoTHub is straightforward. The Arduino's don't have the processing power or security protocol support to enable communication with a Microsoft Azure IoT Hub. Azure Event Hubs can be used by an Arduino but event hubs don't support cloud to device message scenarios or device management.

The Arduino Yun is a viable option for the future but at the moment there is no Python SDK for the Azure IoT SDK and OpenWRT does not support new enough versions of Node.js or Java to use the Azure IoT SDK.

## Field Gateway

In this example I am using a Raspberry Pi Model B+ running Raspbian with the latest Node.js distro. You will also need to install the express package which you can find at [http://expressjs.com/](http://expressjs.com/) and the Node.js Azure IoT SDK which you can find at [https://github.com/Azure/azure-iot-sdks](https://github.com/Azure/azure-iot-sdks). Installing Raspbian, node, express and the Azure IoT SDK are all quite well documented so follow the instructions found on each of their websites. 

You should also follow the Azure IoT SDK instruction for provisioning an IoT Hub and creating a device.

Once you have setup your raspberry Pi copy the raspberry-IoTHub-Server.js file from the raspberry directory of this solution to your device. To make copying files easy I am using [FileZilla](https://filezilla-project.org/) which is connecting to the Pi using SFTP.

###raspberry-iothub-server.js
Change the connectionString to contain the connection string of your newly provisioned IoTHub. You can obtain the connection string using device explorer which is part of the IoT Hub SDK. Go to the management tab, click list and then right click on the device showing and select the "copy connection string for selected device". 

By default this script creates a web server on port 8080 but you can change this by changing the `const PORT` to what ever value you wish. You will also need to change the server setting from localhost to your Pi's IP address or the name of your Pi.

###arduino-iothub-client.ino
The arduino sketch will need changing to fit your needs. The sketch contains a few constants which you should change to control how often the arduino sends a message to the Pi, how often it polls the Pi to check for messages and the device Id of the Arduino. Change the device Id in the arduino iothub file to what ever you want. In my example I'm using a Guid as the device Id but you could give it a friendlier name such as "Arduino1".
You will also need to set the `gatewayAddress` and `gatewayPort` to your where your raspberry-iothub-server.js script is running. 








