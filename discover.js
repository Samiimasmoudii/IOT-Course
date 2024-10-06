const Lifx = require('node-lifx-lan');

async function discoverLamps() {
    try {
        console.log('Discovering LIFX lamps...');
        const bulbs = await Lifx.discover();
        
        if (bulbs.length === 0) {
            console.log('No lamps found.');
        } else {
            console.log('Lamps found:');
            bulbs.forEach(bulb => {
                console.log(`- Label: ${bulb.label}, IP: ${bulb.address}, MAC: ${bulb.mac}`);
            });
        }
    } catch (error) {
        console.error('Error discovering lamps:', error);
    }
}

discoverLamps();
