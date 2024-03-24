fetch('../../json/updates.json')
    .then(response => response.json())
    .then(data => {
        const updatesContainer = document.querySelector('.recent-updates .updates');

        data.sort((a, b) => {
            const dateA = new Date(a.timeAgo.split('-').reverse().join('-'));
            const dateB = new Date(b.timeAgo.split('-').reverse().join('-'));
            return dateB - dateA;
        });

        data.forEach(update => {
            const updateDiv = document.createElement('div');
            updateDiv.classList.add('update');

            const currentDate = new Date();
            const parts = update.timeAgo.split('-');
            const userDate = new Date(parts[2], parts[1] - 1, parts[0]);

            const timeDiff = currentDate.getTime() - userDate.getTime();
            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            updateDiv.innerHTML = `
                <div class="message">
                    <p><b>${update.title}</b> ${update.description}</p>
                    <small class="text-muted">${formatTimeAgo(daysDiff, hoursDiff)}</small>
                </div>
            `;

            updatesContainer.appendChild(updateDiv);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

function formatTimeAgo(days, hours) {
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}
