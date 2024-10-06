const Lifx = require('node-lifx-lan');
const readline = require('readline-sync');

// Replace with your lamp's MAC address
const lampMacAddress = 'D0:73:D5:23:84:F0';  // Replace with your lamp's actual MAC address

async function main() {
    const bulbs = await Lifx.discover();
    console.log('Bulbs discovered.');

    const bulb = bulbs.find(b => b.mac.toLowerCase() === lampMacAddress.toLowerCase());

    if (!bulb) {
        console.log('Lamp with the specified MAC address not found.');
        return;
    } else {
        console.log(`Found lamp: ${bulb.label}`);
    }

    while (true) {
        console.log(`
        Choose an action:
        1. Turn lamp ON
        2. Turn lamp OFF
        3. Change lamp COLOR
        4. Adjust lamp BRIGHTNESS
        5. List Lamp Details
        6. Exit
        `);

        const choice = readline.questionInt('Enter your choice (1-6): ');

        if (choice === 6) {
            console.log('Exiting...');
            break;
        }

        switch (choice) {
            case 1: // Turn on
                await bulb.turnOn({ color: { css: 'white' } });
                console.log(`${bulb.label} turned on.`);
                break;

            case 2: // Turn off
                await bulb.turnOff();
                console.log(`${bulb.label} turned off.`);
                break;

            case 3: // Change color
                const color = readline.question(`
                Choose color:
                - red
                - green
                - blue
                - cyan
                - white
                - purple
                
                Enter color: `).toLowerCase();

                if (['red', 'green', 'blue', 'cyan', 'white', 'purple'].includes(color)) {
                    await bulb.setColor({ css: color });
                    console.log(`${bulb.label} set to ${color}.`);
                } else {
                    console.log('Invalid color. Please choose from the list.');
                }
                break;

            case 4: // Adjust brightness
                const brightnessChange = readline.question('Enter "increase" or "decrease": ').toLowerCase();
                const amount = parseInt(readline.question('By how much (0-100)? '), 10);

                const currentBrightness = await bulb.getBrightness();
                const newBrightness = brightnessChange === 'increase'
                    ? Math.min(currentBrightness + amount, 100)
                    : Math.max(currentBrightness - amount, 0);
                await bulb.setBrightness(newBrightness);
                console.log(`${bulb.label} brightness set to ${newBrightness}.`);
                break;

            case 5: // List lamp details
                console.log(`Lamp: ${bulb.label}, MAC: ${bulb.mac}, IP: ${bulb.address}`);
                break;

            default:
                console.log('Invalid choice. Please select an option between 1 and 6.');
        }
    }
}

main().catch(console.error);
