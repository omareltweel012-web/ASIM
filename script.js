// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً لك! سنتواصل معك قريباً.');
        contactForm.reset();
    });
}

// Booking button
const bookingBtn = document.querySelector('.btn-primary');
if (bookingBtn) {
    bookingBtn.addEventListener('click', () => {
        alert('سيتم توجيهك لصفحة الحجز...');
    });
}

// Add scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.8s ease';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .doctor-card').forEach(card => {
    observer.observe(card);
});