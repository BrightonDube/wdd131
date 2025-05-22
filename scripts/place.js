// Function to calculate wind chill (using metric formula)
function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
}

// Update wind chill with sample data
function updateWindChill() {
    const temperature = 25; // Sample temperature in Celsius
    const windSpeed = 8;    // Sample wind speed in km/h
    const windChillElement = document.getElementById('windchill');
    
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${windChill.toFixed(1)} °C`;
    } else {
        windChillElement.textContent = 'N/A';
    }
}

// Update wind chill when the page loads
document.addEventListener('DOMContentLoaded', updateWindChill);