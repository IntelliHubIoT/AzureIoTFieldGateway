# AzureIoTFieldGateway
Code samples for using a Raspberry PI with the Azure IoT SDK as a field gateway for Arduino and Photon Particles.  

## Introduction

At present connecting an Arduino to a Microsoft Azure IoTHub is problematic. The Arduino's don't have the processing power or security protocol support to enable communication with an IoTHub. Azure Event Hubs can be used by an Arduino but event hubs don't support messages to device scenario or device management.

The Arduino Yun is a viable option for the future but at the moment there is no Python SDK for the Azure IoT SDK and OpenWRT does not support new enough versions of Node.js or Java to use the Azure IoT SDK.

## Field Gateway

In this example I am using a Raspberry Pi Model B+ running Raspbian with the latest Node.js distro. You will also need to install the express package which you can find at [http://expressjs.com/](http://expressjs.com/) and also the Azure IoT SDK which you can find at [https://github.com/Azure/azure-iot-sdks](https://github.com/Azure/azure-iot-sdks). Installing Raspbian, node, express and the Azure IoT SDK are all quite well documented so follow the instructions found on each of their websites. 

Once you have setup your raspberry Pi copy the raspberry-IoTHub-Server file from the raspberry directory of this solution to your device. To make copying files easy I am using [FileZilla](https://filezilla-project.org/)




