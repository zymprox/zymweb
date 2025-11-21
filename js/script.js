// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky Navbar Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation
const joinForm = document.getElementById('joinForm');

if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Name Validation
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            setError(nameInput);
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        // Email Validation
        const emailInput = document.getElementById('email');
        if (!isValidEmail(emailInput.value)) {
            setError(emailInput);
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        // Message Validation
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            setError(messageInput);
            isValid = false;
        } else {
            removeError(messageInput);
        }
        
        if (isValid) {
            // Simulate form submission
            const btn = joinForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your interest! We will contact you shortly.');
                joinForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        }
    });
}

function setError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Scroll Animation (Intersection Observer)
const observerOptions = {
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

// Add fade-in class to elements we want to animate on scroll
// Note: The hero elements already have fade-in class, so we target others
document.querySelectorAll('.program-card, .trainer-card, .pricing-card, .contact-wrapper').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = `${index % 3 * 0.1}s`; // Stagger effect
    
    // Create a custom observer for these elements since we're manually setting styles
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    scrollObserver.observe(el);
});
