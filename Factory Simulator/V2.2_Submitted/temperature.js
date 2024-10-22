


const MAX =1.3;
const MIN =0.9;
const SENSITIVITY = 0.05;
let T = msg.payload;
// Function to update the temperature value

    let newT = Math.random() * (MAX - MIN )+ MIN;

    if (T >= newT - SENSITIVITY) {
        T -= SENSITIVITY/5 ;
    } else if (T <= newT - SENSITIVITY) {
        T += SENSITIVITY /5;
    }

    // Update the message payload with the new temperature value
    msg.payload = T;






return msg;