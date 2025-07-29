// Dynamic project loading with filters
document.addEventListener('DOMContentLoaded', function() {
    const filters = {
        type: 'all', // 'research', 'industry', 'academic'
        technology: 'all' // 'python', 'java', 'ml', etc.
    };
    
    // Load projects from GitHub API
    fetchProjects();
    
    // Setup filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.dataset.filterType;
            const filterValue = this.dataset.filterValue;
            
            filters[filterType] = filterValue;
            fetchProjects();
        });
    });
    
    // Toggle timeline details
    document.querySelectorAll('.toggle-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.style.display = details.style.display === 'block' ? 'none' : 'block';
            this.textContent = details.style.display === 'block' ? 'Hide Details' : 'View Details';
        });
    });
});

async function fetchProjects() {
    try {
        const response = await fetch('https://api.github.com/users/imbilalbutt/repos?sort=updated&direction=desc');
        const repos = await response.json();
        
        // Filter based on selected filters
        const filteredRepos = repos.filter(repo => {
            // Add your filtering logic based on repo names/descriptions
            return true;
        });
        
        renderProjects(filteredRepos.slice(0, 8));
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderProjects(projects) {
    const container = document.querySelector('.projects-grid');
    container.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Extract technologies from description
        const techs = extractTechnologies(project.description);
        
        card.innerHTML = `
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description || 'No description available'}</p>
                <div class="project-techs">
                    ${techs.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.html_url}" class="btn btn-small" target="_blank">
                        <i class="fab fa-github"></i> Code
                    </a>
                    ${project.homepage ? `
                    <a href="${project.homepage}" class="btn btn-small" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function extractTechnologies(description) {
    // Implement logic to extract technologies from project descriptions
    return ['Python', 'ML', 'Data Science'].slice(0, 3);
}
