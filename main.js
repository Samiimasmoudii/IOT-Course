const Lifx = require('node-lifx-lan');
const readline = require('readline-sync');

async function main() {
    const bulbs = await Lifx.discover();
    console.log('Bulbs discovered.');

    while (true) {
        console.log(`
        Choose an action:
        1. Turn bulbs ON
        2. Turn bulbs OFF
        3. Change bulb COLOR
        4. Adjust bulb BRIGHTNESS
        5. List Bulbs
        6. Exit
        `);
        
        const choice = readline.questionInt('Enter your choice (1-6): ');

        if (choice === 6) {
            console.log('Exiting...');
            break;
        }

        switch (choice) {
            case 1: // Turn on
                await Lifx.turnOnBroadcast({ color: { css: 'white' } });
                console.log('All bulbs turned on.');
                break;

            case 2: // Turn off
                await Lifx.turnOffBroadcast();
                console.log('All bulbs turned off.');
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
                    await Lifx.turnOnBroadcast({ color: { css: color } });
                    console.log(`All bulbs set to ${color}.`);
                } else {
                    console.log('Invalid color. Please choose from the list.');
                }
                break;

            case 4: // Adjust brightness
                const brightnessChange = readline.question('Enter "increase" or "decrease": ').toLowerCase();
                const amount = parseInt(readline.question('By how much (0-100)? '), 10);

                const allBulbs = await Lifx.getBulbs();
                for (const bulb of allBulbs) {
                    const currentBrightness = await bulb.getBrightness();
                    const newBrightness = brightnessChange === 'increase'
                        ? Math.min(currentBrightness + amount, 100)
                        : Math.max(currentBrightness - amount, 0);
                    await bulb.setBrightness(newBrightness);
                    console.log(`Brightness set to ${newBrightness} for all bulbs.`);
                }
                break;

            case 5: // List bulbs
                console.log('Found bulbs:');
                bulbs.forEach(bulb => {
                    console.log('- Bulb');
                });
                break;

            default:
                console.log('Invalid choice. Please select an option between 1 and 6.');
        }
    }
}

main().catch(console.error);
