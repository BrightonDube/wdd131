// Dynamically displays the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Displays the document's last modified date
document.getElementById('lastModified').textContent = `Last Modification: ${formatDate(document.lastModified)}`;

// Helper function to format the date more readably
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-ZA', options);
}

// Wind chill calculation
document.addEventListener('DOMContentLoaded', () => {
    // Static values for temperature and wind speed (matching the displayed values)
    const temperature = 10; // in Celsius
    const windSpeed = 5; // in km/h
    
    // Display the wind chill
    const windChillElement = document.getElementById('windchill');
    
    // Check if conditions are met for wind chill calculation
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${windChill.toFixed(1)} °C`;
    } else {
        windChillElement.textContent = 'N/A';
    }
});

// Function to calculate wind chill (using metric formula)
function calculateWindChill(temperature, windSpeed) {
    return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
}