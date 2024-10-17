1. Replacing Temperature Control Functions with PID Controller:
Install the PID Controller Node: As mentioned before, you can install node-red-contrib-pid to add a controller instead of using custom functions.
bash
Copy code
npm install node-red-contrib-pid

Set the desired setpoint (target temperature) using a dashboard input (like a slider or numeric input).

Connect the PID controller node to the temperature input (replacing the Temperature 1 function).
Output from PID: The output from the PID node can then control the climate system by adjusting cooling or heating as needed (instead of using Climatiseur 1).
2. Humidity and Pressure Control:
You can similarly add controllers (either PID or other appropriate controllers) to manage the humidity and pressure in your system.
3. User Interface for Setpoints:
Add sliders or numeric inputs from the Node-RED dashboard to allow users to manually adjust the target setpoints for temperature, humidity, and pressure.
Would you like further guidance on a specific part of this setup, or would you like to int