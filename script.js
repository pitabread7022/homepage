// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
    // Initialize all components
    initializeNavigation();
    initializeSmoothScrolling();
    initializeScrollEffects();
    initializeContactForm();
    initializeCounters();
    initializeTypingEffect();
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    console.log('Portfolio website loaded successfully! 🚀');
}

// Mobile Navigation Toggle
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects (navbar background, parallax)
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        // Navbar background change
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        
        // Parallax effect for floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(window.pageYOffset * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Form submission handler
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Validate all required fields
    const isValid = validateForm();
    if (!isValid) return;
    
    // Get form data
    const formData = new FormData(e.target);
    const submitBtn = e.target.querySelector('#submitBtn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend integration)
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        e.target.reset();
        clearAllErrors();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Form validation
function validateForm() {
    const requiredFields = ['name', 'email', 'message'];
    let isValid = true;
    
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + 'Error');
    
    // Clear previous error
    field.classList.remove('error');
    if (errorElement) errorElement.textContent = '';
    
    // Check if empty
    if (!value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) errorElement.textContent = message;
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) errorElement.textContent = '';
}

// Clear all errors
function clearAllErrors() {
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Counter animation for hero stats
function initializeCounters() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 500);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Typing effect for hero title
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    setTimeout(() => {
        typeWriterPreserveHtml(heroTitle, 50);
    }, 500);
}

function typeWriterPreserveHtml(container, speed = 100) {
    const charSpans = [];

    // Wrap each character of every text node in a hidden span
    function wrapTextNodes(node) {
        const children = Array.from(node.childNodes);
        children.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.nodeValue || '';
                const frag = document.createDocumentFragment();
                for (let i = 0; i < text.length; i++) {
                    const span = document.createElement('span');
                    span.textContent = text[i];
                    span.style.visibility = 'hidden';
                    frag.appendChild(span);
                    charSpans.push(span);
                }
                node.replaceChild(frag, child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                wrapTextNodes(child);
            }
        });
    }
    wrapTextNodes(container);

    let index = 0;
    (function revealNext() {
        if (index < charSpans.length) {
            charSpans[index].style.visibility = 'visible';
            index += 1;
            setTimeout(revealNext, speed);
        }
    })();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Add loading states to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary') && !e.target.disabled) {
        e.target.classList.add('loading');
        setTimeout(() => {
            e.target.classList.remove('loading');
        }, 1000);
    }
});

// Add hover effects to expertise cards
document.addEventListener('DOMContentLoaded', function() {
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
