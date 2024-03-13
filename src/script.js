async function fetchRepoData() {
    try {
        const response = await fetch('https://api.github.com/users/JaiSinghRajput/repos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching repository data:', error);
        return [];
    }
}

// Function to generate HTML for repository cards
function generateRepoCards(repos) {
    const repoCardsContainer = document.getElementById('repoCards');

    repos.forEach(repo => {
        const card = document.createElement('div');
        card.classList.add('rounded-lg', 'p-6', 'shadow-md', 'flex', 'flex-col', 'justify-between', 'transition', 'duration-300', 'transform', 'hover:scale-105', 'hover:shadow-xl');

        const title = document.createElement('h3');
        title.classList.add('text-xl', 'font-semibold', 'mb-4', 'text-blue-500', 'cursor-pointer', 'hover:text-blue-600');
        title.textContent = repo.name;
        title.addEventListener('click', () => openRepo(repo));

        const description = document.createElement('p');
        description.classList.add('text-gray-700', 'mb-6');
        description.textContent = repo.description || 'No description provided.';

        const button = document.createElement('button');
        button.classList.add('bg-blue-500', 'text-white', 'py-2', 'px-4', 'rounded-md', 'hover:bg-blue-600', 'transition', 'duration-300', 'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:ring-offset-2', 'focus:ring-opacity-50');
        button.textContent = 'Get Details';
        button.addEventListener('click', () => openReadme(repo));

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(button);

        repoCardsContainer.appendChild(card);
    });
}

function openRepo(repo) {
    const repoURL = `https://github.com/JaiSinghRajput/${repo.name}`;
    window.open(repoURL, '_blank');
}

// Function to open README of a repository
async function openReadme(repo) {
    try {
        openRepo(repo)
    } catch (error) {
        console.error(`Error fetching README for ${repo.name}:`, error);
    }
}

// Fetch repository data and generate cards on page load
window.addEventListener('DOMContentLoaded', async () => {
    const repos = await fetchRepoData();
    generateRepoCards(repos);
});
async function fetchProfileInfo() {
    try {
        const response = await fetch('https://api.github.com/users/JaiSinghRajput');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile info:', error);
        return {};
    }
}

async function updateProfileInfo() {
    try {
        const profileInfo = await fetchProfileInfo();
        document.getElementById('bio').textContent = profileInfo.bio || 'Not provided';
        document.getElementById('repositories').textContent = profileInfo.public_repos || 'Not provided';
    } catch (error) {
        console.error('Error updating profile info:', error);
    }
}

// Update profile info on page load
window.addEventListener('DOMContentLoaded', updateProfileInfo);
