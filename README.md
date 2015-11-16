# AzureIoTFieldGateway
Code samples for using a Raspberry PI with the Azure IoT SDK as a field gateway for Arduino and Photon Particles.  

# Introduction
At present connecting an Arduino to a Microsoft Azure IoTHub is problematic. The Arduino's don't have the processing power or security protocol support to enable communication with an IoTHub. Azure Event Hubs can be used by an Arduino but event hubs don't support messages to device scenario or device management.

The Arduino Yun is a viable option for the future but at the moment there is no Python SDK for the Azure IoT SDK and OpenWRT does not support new enough versions of Node.js or Java to use the Azure IoT SDK.

# Field Gateway

