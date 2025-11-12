// ===================================
// NAVIGATION
// ===================================

const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove transparent class
    if (currentScroll <= 100) {
        navbar.classList.add('transparent');
    } else {
        navbar.classList.remove('transparent');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
const animatedElements = document.querySelectorAll(
    '.intro-section, .vision-point, .program-card, .gallery-item, .faq-item, .testimonial-content'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// FAQ ACCORDION
// ===================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===================================
// BOOKING FORM
// ===================================

const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Here you would typically send the data to a server
    // For now, we'll simulate a successful submission
    
    try {
        // Simulate API call
        await simulateFormSubmission(formData);
        
        // Hide form and show success message
        bookingForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Optional: Reset form after a delay
        setTimeout(() => {
            bookingForm.reset();
        }, 1000);
        
    } catch (error) {
        alert('Es gab einen Fehler beim Absenden des Formulars. Bitte versuchen Sie es später erneut.');
        console.error('Form submission error:', error);
    }
});

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        console.log('Form data:', data);
        setTimeout(resolve, 1000);
    });
}

// Form validation feedback
const formInputs = bookingForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#e74c3c';
        } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '';
    });
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===================================
// GALLERY IMAGE LIGHTBOX
// ===================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            openLightbox(img.src, img.alt);
        }
    });
});

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <img src="${src}" alt="${alt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close lightbox
    const close = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }, 300);
    };
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', close);
    
    // Fade in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        cursor: pointer;
    }
    
    .lightbox-content {
        position: relative;
        z-index: 2;
        max-width: 90%;
        max-height: 90%;
        animation: zoomIn 0.3s ease;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        line-height: 1;
        transition: transform 0.2s ease;
    }
    
    .lightbox-close:hover {
        transform: scale(1.2);
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(lightboxStyles);

// ===================================
// PARALLAX EFFECT
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// COUNTER ANIMATION
// ===================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ===================================
// LOAD ANIMATIONS
// ===================================

window.addEventListener('load', () => {
    // Initial navbar state
    if (window.pageYOffset <= 100) {
        navbar.classList.add('transparent');
    }
    
    // Trigger any load-specific animations
    document.body.style.opacity = '1';
});

// ===================================
// FORM AUTOSAVE (Optional)
// ===================================

// Save form data to localStorage on input
const saveFormData = () => {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    localStorage.setItem('retreatFormData', JSON.stringify(formData));
};

// Load saved form data
const loadFormData = () => {
    const savedData = localStorage.getItem('retreatFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('name').value = data.name || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('message').value = data.message || '';
    }
};

// Add event listeners for autosave
formInputs.forEach(input => {
    input.addEventListener('input', saveFormData);
});

// Load form data on page load
loadFormData();

// Clear saved data on successful submission
bookingForm.addEventListener('submit', () => {
    localStorage.removeItem('retreatFormData');
});

// ===================================
// SCROLL INDICATOR
// ===================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const introSection = document.querySelector('.intro-section');
        if (introSection) {
            introSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===================================
// PAGE VISIBILITY
// ===================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden (user switched tabs)
        console.log('User left the page');
    } else {
        // Page is visible again
        console.log('User returned to the page');
    }
});

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================

console.log('%c🌟 Becoming YOU Retreat 🌟', 'font-size: 20px; font-weight: bold; color: #d4a574;');
console.log('%cBereit für deine Transformation? 8.-11. Oktober 2026 auf Zypern', 'font-size: 14px; color: #8b7355;');
console.log('%cWebsite entwickelt mit ❤️', 'font-size: 12px; color: #999;');