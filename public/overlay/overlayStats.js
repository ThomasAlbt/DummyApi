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
        const res = await fetch(`/api/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('API Response:', data); // Debug log
        
        if (!data) {
            throw new Error('No data received');
        }

        views.textContent = `${data.click || 0} views`;
        // Format time if it's a number (assuming seconds)
        const timeViewed = data.timeViewed || 0;
        time.textContent = timeViewed > 0 ? `${timeViewed}s` : '0s';

    } catch (error) {
        console.error('Error fetching stats:', error);
        const views = document.getElementById('views');
        const time = document.getElementById('time');
        if (views) views.textContent = 'Error loading';
        if (time) time.textContent = 'Error loading';
    }
}

// Initialize as soon as possible
function initializeOverlay() {
    try {
        // Better ID extraction - handle different URL patterns
        const path = window.location.pathname;
        console.log('Current path:', path); // Debug log
        
        // Match patterns like /overlay/123 or /overlay/123/
        const match = path.match(/\/overlay\/(\d+)\/?$/);
        
        if (!match) {
            throw new Error('Invalid page ID - no numeric ID found in path');
        }
        
        const pageId = parseInt(match[1], 10);
        console.log('Extracted page ID:', pageId); // Debug log
        
        if (isNaN(pageId)) {
            throw new Error('Invalid page ID - not a number');
        }

        getId(pageId);

        // Optional: Set up periodic refresh
        setInterval(() => getId(pageId), 30000); // Refresh every 30 seconds
    } catch (error) {
        console.error('Initialization error:', error);
        const views = document.getElementById('views');
        const time = document.getElementById('time');
        if (views) views.textContent = 'Invalid ID';
        if (time) time.textContent = 'Invalid ID';
    }
}

// Use both DOMContentLoaded and immediate execution for better reliability
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeOverlay);
} else {
    initializeOverlay();
}