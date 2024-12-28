// ============================
// Skills Section
// ============================
const skills = [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "React", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "MongoDB", level: 65 },
    { name: "Python", level: 60 },
    { name: "Java", level: 30 },
    { name: "C++", level: 60 },
    { name: "C", level: 75 },
];

const skillsContainer = document.querySelector('.skills-container');

skills.forEach(skill => {
    const skillDiv = document.createElement('div');
    skillDiv.classList.add('skill');

    skillDiv.innerHTML = `
    <span class="skill-name">${skill.name}</span>
    <div class="progress-bar">
        <div class="progress" style="width: ${skill.level}%;"></div>
    </div>
    `;

    skillsContainer.appendChild(skillDiv);
});

// ============================
// Journey Section
// ============================
const milestones = [
    {
        year: "2022",
        title: "High School Achievements",
        description: "Excelled in academics and developed a keen interest in computer science and mathematics."
    },
    {
        year: "2022",
        title: "Discovered My Passion for Coding",
        description: "Began exploring coding and technology, participating in  building small projects."
    },
    {
        year: "2023",
        title: "Started Web Development",
        description: "Embarked on my web development journey, learning HTML, CSS, and JavaScript to create dynamic web pages."
    },
    {
        year: "2023",
        title: "Persuing Graduation with a Computer Science Degree",
        description: "Completed my Bachelor’s degree, gaining foundational knowledge in software development and problem-solving."
    },
];

const timelineContainer = document.querySelector('.timeline');

milestones.forEach(milestone => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.innerHTML = `
    <span>${milestone.year}</span>
    <h3>${milestone.title}</h3>
    <p>${milestone.description}</p>
    `;
    timelineContainer.appendChild(eventElement);
});

// ============================
// GitHub Projects Section
// ============================
const username = "jaisinghrajput"; // Replace with your GitHub username

async function fetchProjects() {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    const projectsContainer = document.querySelector('.projects-container');

    for (let i = 0; i < repos.length; i++) {
        const repo = repos[i];

        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available."}</p>
            `;
        projectCard.addEventListener('click', () => fetchdiscription(repo.name));
        projectsContainer.appendChild(projectCard);
    }
}

async function fetchdiscription(repoName) {
    const discriptionUrl = `https://api.github.com/repos/${username}/${repoName}/contents/discription.txt`;
    const modal = document.getElementById('discription-modal');
    const discriptionContent = document.getElementById('discription-content');

    try {
        const response = await fetch(discriptionUrl);
        if (response.ok) {
            const data = await response.json();
            const markdown = atob(data.content); // Decode base64 content
            discriptionContent.textContent = markdown;
        } else {
            discriptionContent.textContent = "discription.txt not found.";
        }
    } catch (error) {
        discriptionContent.textContent = "An error occurred while fetching the discription.";
    }

    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById('discription-modal');
    modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('discription-modal');
    if (event.target === modal) {
        closeModal();
    }
});

fetchProjects();

// ============================
// Navbar Interaction
// ============================
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

document.addEventListener('click', (event) => {
    const menu = document.querySelector('.menu');
    const menuBtn = document.querySelector('.menu-btn');
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// ============================
// Profiles Section
// ============================
const profiles = [
    {
        name: "GitHub",
        image: "https://cdn-icons-png.flaticon.com/512/733/733553.png",
        link: "https://github.com/jaisinghrajput"
    },
    {
        name: "LinkedIn",
        image: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
        link: "https://linkedin.com/in/jai-singh-148364242"
    },
    {
        name: "Twitter",
        image: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
        link: "https://twitter.com/jai820"
    },
    {
        name: "Instagram",
        image: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        link: "https://instagram.com/jaisingh._.rajput"
    },
    {
        name: "Facebook",
        image: "https://cdn-icons-png.flaticon.com/512/145/145802.png",
        link: "https://www.facebook.com/jaisingh.rajput.54943600"
    }
];

const container = document.getElementById('profiles-container');

profiles.forEach((profile) => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
        <img src="${profile.image}" alt="${profile.name} Icon">
        <h3>${profile.name}</h3>
        <a href="${profile.link}" target="_blank">Visit Profile</a>
    `;
    container.appendChild(card);
});

// ============================
// Footer Year Update
// ============================
function updateYear() {
    const year = new Date().getFullYear();
    document.getElementById('year').textContent = year;
}
updateYear();

document.querySelectorAll('section').forEach(section => {
    section.classList.add("animate");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
        }
    });
});

document.querySelectorAll(".animate").forEach(el => observer.observe(el));
