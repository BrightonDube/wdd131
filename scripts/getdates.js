// Dynamically displays the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Displays the document's last modified date
document.getElementById('lastModified').textContent = `Last Updated: ${formatDate(document.lastModified)}`;

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