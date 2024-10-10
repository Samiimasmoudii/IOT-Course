const SENSITIVITY = 0.5;
const MAX_TEMP = 8;
const MIN_TEMP = 4;
let Number = 0; 
let T = Math.floor(Math.random() * (MAX_TEMP - MIN_TEMP + 1)) + MIN_TEMP;  // Initial random temperature

let T_values = [T];  // Array to store temperature values

while (Number < 100) {
    let newT = Math.floor(Math.random() * (MAX_TEMP - MIN_TEMP + 1)) + MIN_TEMP;

    while (T >= newT - SENSITIVITY) {
        T -= SENSITIVITY*0.5;
    }
    while (T <= newT - SENSITIVITY) {
        T += SENSITIVITY*0.5;
    }

    T_values.push(T);  // Append updated temperature to the array
    Number += 1;
}

console.log(T_values);  // Print the temperature values to the console
