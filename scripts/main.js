
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Load GitHub projects dynamically
    fetch('https://api.github.com/users/imbilalbutt/repos?sort=updated&direction=desc')
        .then(response => response.json())
        .then(repos => {
            const projectsGrid = document.querySelector('.projects-grid');
            const featuredRepos = repos.slice(0, 6); // Show 6 most recent repos
            
            featuredRepos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                projectCard.innerHTML = `
                    <div class="project-info">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'No description available'}</p>
                        <div class="project-links">
                            <a href="${repo.html_url}" class="btn btn-small" target="_blank">View Code</a>
                            ${repo.homepage ? `<a href="${repo.homepage}" class="btn btn-small" target="_blank">Live Demo</a>` : ''}
                        </div>
                    </div>
                `;
                
                projectsGrid.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub repos:', error);
        });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                alert('Message sent successfully!');
                contactForm.reset();
            })
            .catch(error => {
                alert('Error sending message. Please try again later.');
                console.error('Form submission error:', error);
            });
        });
    }
});
