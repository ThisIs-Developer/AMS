$(document).ready(function() {
    // Initial page load
    loadPage('../Admin/admin');

    // Handle navigation clicks
    $('#confirmLogoutBtn').on('click', function(event) {
        event.preventDefault();
        logout();
    });

    // Handle back button
    window.addEventListener('popstate', function(event) {
        navigateToCurrentRoute();
    });
});

function loadPage(pageName) {
    $('#content').load(pageName + '.html', function(response, status, xhr) {
        if (status === 'error') {
            console.error('Error loading page:', xhr.statusText);
        } else {
            handlePageLoad(pageName);
        }
    });
}

function handlePageLoad(pageName) {
    switch (pageName) {
        case '../Admin/admin':
            // Add event listeners, handle logic for admin page
            break;
        case '../Logout/logout':
            // Handle logout logic
            localStorage.clear();
            navigateToCurrentRoute(); // Redirect to the login page or homepage
            break;
        default:
            console.error('Unknown page:', pageName);
            break;
    }
}

function navigateToCurrentRoute() {
    const route = window.location.pathname.split('/').pop();
    loadPage(route);
}

function logout() {
    history.pushState(null, '', '../Login/login.html');
    loadPage('../Logout/logout');
}

