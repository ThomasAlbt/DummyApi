async function getId(id) {
    try {
        const views = document.getElementById('views');
        const time = document.getElementById('time');
        
        if (!views || !time) {
            console.error('Required elements not found');
            return;
        }

        views.textContent = 'Loading...';
        time.textContent = 'Loading...';
        
        // Use absolute path for API
        const res = await fetch(`/api/${id}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (!data) {
            throw new Error('No data received');
        }

        views.textContent = data.click ? `${data.click} views` : '0 views';
        time.textContent = data.time || 'N/A';

    } catch (error) {
        console.error('Error fetching stats:', error);
        document.getElementById('views').textContent = 'Error loading';
        document.getElementById('time').textContent = 'Error loading';
    }
}

// Initialize as soon as possible
function initializeOverlay() {
    try {
        const pathParts = window.location.pathname.split('/');
        const pageId = pathParts[pathParts.length - 1];
        
        if (!pageId || isNaN(pageId)) {
            throw new Error('Invalid page ID');
        }

        getId(pageId);

        // Optional: Set up periodic refresh
        setInterval(() => getId(pageId), 30000); // Refresh every 30 seconds
    } catch (error) {
        console.error('Initialization error:', error);
        document.getElementById('views').textContent = 'Invalid ID';
        document.getElementById('time').textContent = 'Invalid ID';
    }
}

// Use both DOMContentLoaded and load events for better reliability
document.addEventListener('DOMContentLoaded', initializeOverlay);
window.addEventListener('load', initializeOverlay);