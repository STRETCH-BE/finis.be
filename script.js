// ========================================
// FINIS WEBSITE - COMPLETE JAVASCRIPT
// Acoustic Architecture, Precisely Crafted
// Version: 2.0.0
// ========================================

// === NAVBAR SCROLL EFFECTS ===
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === MOBILE MENU FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (mobileMenuBtn) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle active class on button for hamburger animation
            this.classList.toggle('active');
            
            // Toggle mobile-open class on nav links
            navLinks.classList.toggle('mobile-open');
            
            // Toggle body class for backdrop
            body.classList.toggle('menu-open');
            
            // Update aria-expanded for accessibility
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Prevent body scroll when menu is open
            if (body.classList.contains('menu-open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside (on the backdrop)
        document.addEventListener('click', function(e) {
            if (body.classList.contains('menu-open') && 
                !navLinks.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Handle escape key to close menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && body.classList.contains('menu-open')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.focus(); // Return focus to menu button
            }
        });
    }
});

// === INTERSECTION OBSERVER FOR ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Also handle animate-ready elements
            if (entry.target.classList.contains('animate-ready')) {
                entry.target.classList.add('animate-in');
            }
        }
    });
}, observerOptions);

// Observe elements when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Elements with data-animate attribute
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// === SCROLL PROGRESS BAR ===
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// === SMART NAVBAR HIDE/SHOW ON SCROLL ===
let lastScrollTop = 0;
let scrollDebounce = false;

window.addEventListener('scroll', function() {
    if (scrollDebounce) return;
    
    scrollDebounce = true;
    setTimeout(() => {
        scrollDebounce = false;
    }, 100);
    
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbarHeight = navbar.offsetHeight;
    
    // Skip if mobile menu is open
    if (document.body.classList.contains('menu-open')) {
        return;
    }
    
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight * 2) {
        // Scrolling down & past 2x navbar height
        navbar.classList.add('nav-hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('nav-hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// === SMOOTH SCROLLING FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            const body = document.body;
            
            if (body.classList.contains('menu-open')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// === PROJECT CARDS HOVER EFFECTS ===
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    // Make cards clickable
    card.addEventListener('click', function() {
        const projectTitle = this.querySelector('h3').textContent;
        // Navigate to project detail page (when implemented)
        console.log(`Navigate to project: ${projectTitle}`);
        // window.location.href = `/projects/${projectTitle.toLowerCase().replace(/\s+/g, '-')}`;
    });
});

// === FORM HANDLING WITH VALIDATION ===
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    // Add honeypot field for bot protection
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.className = 'honeypot';
    honeypot.tabIndex = -1;
    honeypot.setAttribute('autocomplete', 'off');
    contactForm.appendChild(honeypot);
    
    // Form validation
    const validateForm = (form) => {
        let isValid = true;
        const errors = {};
        
        // Name validation
        const nameInput = form.querySelector('#contact-name');
        if (!nameInput.value.trim() || nameInput.value.length < 2) {
            errors.name = 'Please enter your name (at least 2 characters)';
            isValid = false;
        }
        
        // Email validation
        const emailInput = form.querySelector('#contact-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Phone validation (optional but if filled, should be valid)
        const phoneInput = form.querySelector('#contact-phone');
        if (phoneInput.value.trim()) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(phoneInput.value) || phoneInput.value.replace(/\D/g, '').length < 10) {
                errors.phone = 'Please enter a valid phone number';
                isValid = false;
            }
        }
        
        // Project type validation
        const projectType = form.querySelector('#project-type');
        if (!projectType.value) {
            errors.project = 'Please select a project type';
            isValid = false;
        }
        
        // Message validation
        const messageInput = form.querySelector('#contact-message');
        if (!messageInput.value.trim() || messageInput.value.length < 10) {
            errors.message = 'Please enter a message (at least 10 characters)';
            isValid = false;
        }
        
        // Check honeypot
        if (honeypot.value) {
            isValid = false;
        }
        
        return { isValid, errors };
    };
    
    // Display validation errors
    const displayErrors = (errors) => {
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(elem => {
            elem.textContent = '';
        });
        document.querySelectorAll('.error').forEach(elem => {
            elem.classList.remove('error');
        });
        
        // Display new errors
        Object.keys(errors).forEach(key => {
            const errorElement = document.getElementById(`${key}-error`);
            const inputElement = document.querySelector(`[name="${key}"], #contact-${key}, #project-type`);
            
            if (errorElement && inputElement) {
                errorElement.textContent = errors[key];
                inputElement.classList.add('error');
            }
        });
    };
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const tempForm = contactForm;
            const { errors } = validateForm(tempForm);
            const inputName = this.name || this.id.replace('contact-', '').replace('project-', '');
            
            // Clear error for this field if it's now valid
            const errorElement = document.getElementById(`${inputName}-error`) || 
                                document.getElementById(`${this.id.replace('contact-', '')}-error`);
            if (errorElement) {
                if (!errors[inputName]) {
                    errorElement.textContent = '';
                    this.classList.remove('error');
                }
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const { isValid, errors } = validateForm(this);
        
        if (!isValid) {
            displayErrors(errors);
            // Focus first error field
            const firstError = this.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
            showToast('Please correct the errors in the form', 'error');
            return;
        }
        
        // Prepare form data
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            if (key !== 'website') { // Exclude honeypot
                data[key] = value;
            }
        });
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            showToast('Thank you! We\'ll contact you within 24 hours.', 'success');
            this.reset();
            
            // Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': data.project_type
                });
            }
            
            // Store in background sync if available
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                navigator.serviceWorker.ready.then(registration => {
                    return registration.sync.register('contact-form-sync');
                });
            }
        } catch (error) {
            showToast('Something went wrong. Please try again or call us directly.', 'error');
            console.error('Form submission error:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// === TOAST NOTIFICATION SYSTEM ===
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };
    
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" aria-label="Close notification">×</button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        removeToast(toast);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeToast(toast);
    }, 5000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
    return container;
}

function removeToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
        toast.remove();
    }, 300);
}

// === LAZY LOADING FOR IMAGES ===
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    // Observe all images with data-src
    document.addEventListener('DOMContentLoaded', () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// === PERFORMANCE MONITORING ===
if ('PerformanceObserver' in window) {
    // Monitor long tasks
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
                console.warn('Long task detected:', entry);
            }
        }
    });
    
    // Start observing
    try {
        perfObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
        // Long task monitoring not supported
    }
}

// === PAGE VISIBILITY API ===
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - pause animations, videos, etc.
        console.log('Page hidden');
    } else {
        // Page is visible again
        console.log('Page visible');
    }
});

// === SERVICE WORKER REGISTRATION ===
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
                
                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60000); // Check every minute
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
    
    // Handle service worker updates
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
}

// === PRINT STYLES HANDLER ===
window.addEventListener('beforeprint', function() {
    // Expand all collapsed content
    document.querySelectorAll('.collapsed').forEach(elem => {
        elem.classList.remove('collapsed');
    });
});

window.addEventListener('afterprint', function() {
    // Restore collapsed state
    console.log('Printing completed');
});

// === KEYBOARD NAVIGATION ENHANCEMENTS ===
document.addEventListener('keydown', function(e) {
    // Skip to main content with Alt + 1
    if (e.altKey && e.key === '1') {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView();
        }
    }
    
    // Skip to navigation with Alt + 2
    if (e.altKey && e.key === '2') {
        const nav = document.getElementById('navbar');
        if (nav) {
            const firstLink = nav.querySelector('a');
            if (firstLink) firstLink.focus();
        }
    }
    
    // Skip to contact with Alt + 3
    if (e.altKey && e.key === '3') {
        const contact = document.getElementById('contact');
        if (contact) {
            contact.scrollIntoView();
            const firstInput = contact.querySelector('input');
            if (firstInput) firstInput.focus();
        }
    }
});

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('Finis website initialized');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
    }
    
    // Set current year in footer
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(elem => {
        elem.textContent = currentYear;
    });
    
    // Initialize any third-party libraries here
    
    // Performance mark
    if ('performance' in window) {
        performance.mark('finis-interactive');
    }
});

// === UTILITY FUNCTIONS ===
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// === ERROR HANDLING ===
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // Could send to error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send to error tracking service
});
