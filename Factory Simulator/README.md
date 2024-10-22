Project Title: Factory Simulator using Node-RED

Overview
This Node-RED project simulates a factory environment with multiple zones, each equipped with sensors (temperature, humidity, pressure) and a air conditionner. The system uses MQTT for communication between the sensors, AC, and a central controller.

Key Features
Sensor Simulation: Generates realistic sensor data for temperature, humidity, and pressure.
Centralized Control: A controller manages the climatizers based on sensor readings and predefined rules.
Production Management: Stops production in zones based on environmental conditions.
MQTT Communication: Uses MQTT for communication between components.
Node-RED Implementation: The entire system is built using Node-RED, providing a visual and flexible development environment.


###Prerequisites
Node.js and npm (or yarn) installed
Node-RED installed
MQTT broker (e.g., Mosquitto) or use existing broker on node-red
Installation
Simply Download Factory Simulator\V2.2_Submitted\Project.json and run it in node-red



Sensor Simulation: Generates sensor data using random functions in a defined range.
MQTT Output: Publishes sensor data to MQTT topics.
Delay: Simulates delays between sensor readings and acts as a loop.
Range: Maps sensor values to ranges for controlling climatizers.
The central controller node subscribes to MQTT topics from all zones, processes the data, and sends control messages to the AC and production units.

The logic of the central controlle is found under  V2.2/controller.js
The logic of the Temperature sensor is found under  V2.2/temperature.js

Customization
You can customize the simulation by:

Modifying sensor parameters: Adjust the ranges, noise levels, and drift factors for sensors.
Changing control rules: Modify the conditions for turning AC on or off and stopping production.
Adding new sensors or zones: Create additional subflows to simulate more sensors or zones.
Contributing
Contributions are welcome! Please feel free to fork the repository, make changes, and submit a pull request.

Work by Sami Masmoudi & Wael Abdallah