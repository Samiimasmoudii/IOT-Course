// Récupération des états et initialisation
let zones_humidite_superieure_60 = context.get("zones_humidite_superieure_60") || 0;
let production_status = context.get("production_status") || "on"; // Production par défaut en marche

// Récupération de l'état actuel des climatiseurs
let climStatuses = {
    zone1: context.get("climatisation_zone1") || "off",
    zone2: context.get("climatisation_zone2") || "off",
    zone3: context.get("climatisation_zone3") || "off",
    zone4: context.get("climatisation_zone4") || "off"
};

// Fonction pour mettre à jour l'état d'un climatiseur
function updateClimStatus(zone, newState) {
    let currentState = climStatuses[`zone${zone}`];
    if (currentState !== newState) {
        climStatuses[`zone${zone}`] = newState;
        context.set(`climatisation_zone${zone}`, newState);
        return { topic: `clim${zone}`, payload: newState }; // Retourne le message à envoyer
    }
    return null; // Pas de changement d'état
}

// Fonction pour arrêter la production dans une zone spécifique
function stopProductionInZone(zone) {
    production_status = "off"; // Production arrêtée
    context.set("production_status", "off");
    return { topic: `prod${zone}`, payload: "off" }; // Retourne le message pour arrêter la production dans la zone
}

// Fonction pour arrêter la production dans toutes les zones
function stopAllProduction() {
    production_status = "off"; // Production arrêtée
    context.set("production_status", "off");
    return { topic: "production", payload: "off" }; // Retourne le message pour arrêter la production globale
}

// Traitement du message
if (msg.topic.startsWith("Temperature")) {
    let zone = msg.topic.replace("Temperature", "");
    let temperature = msg.payload;

    if (temperature >= 12) {
        return updateClimStatus(zone, "on"); // Allume le climatiseur
    } else if (temperature <= 8) {
        return updateClimStatus(zone, "off"); // Éteint le climatiseur
    }
} else if (msg.topic.startsWith("Humidity")) {
    let zone = msg.topic.replace("Humidity", "");
    let humidity = msg.payload;

    if (humidity > 60) {
        zones_humidite_superieure_60++;
        context.set("zones_humidite_superieure_60", zones_humidite_superieure_60);

        // Si deux zones dépassent 60% d'humidité, arrêter la production de toutes les zones
        if (zones_humidite_superieure_60 >= 2) {
            return stopAllProduction();
        }
    } else if (humidity > 40) {
        return updateClimStatus(zone, "on"); // Active le climatiseur si humidité > 40%
    }
} else if (msg.topic.startsWith("Pressure")) {
    let zone = msg.topic.replace("Pressure", ""); // Récupérer le numéro de zone
    let pressure = msg.payload;

    if (pressure > 1.2) {
        return stopProductionInZone(zone); // Arrête la production dans la zone si pression > 1.2 bar
    }
}

return null; // Aucune action si aucune condition n'est remplie
