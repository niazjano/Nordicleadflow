// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
const logo = document.querySelector('.logo img');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        logo.style.height = '30px';
    } else {
        header.style.padding = '1rem 0';
        logo.style.height = '40px';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for fade-in
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle (to be implemented when needed)
// const mobileMenuButton = document.createElement('button');
// mobileMenuButton.classList.add('mobile-menu-button');
// mobileMenuButton.innerHTML = '☰';
// document.querySelector('.nav-container').appendChild(mobileMenuButton);

// mobileMenuButton.addEventListener('click', () => {
//     document.querySelector('.nav-links').classList.toggle('active');
// });

// Sticky CTA button visibility
const stickyCta = document.querySelector('.sticky-cta');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show sticky CTA when scrolling down and hide when scrolling up
    if (scrollTop > lastScrollTop && scrollTop > 300) {
        stickyCta.style.display = 'block';
    } else {
        stickyCta.style.display = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Add smooth scroll to sticky CTA
stickyCta.querySelector('.cta-button').addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#calendar');
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}); 