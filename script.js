/**
 * Finis Website - Enhanced JavaScript
 * Version: 2.0.0
 * Description: Complete JavaScript with performance, accessibility, and UX improvements
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit function calls
 */
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

/**
 * Throttle function for scroll events
 */
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

// ============================================
// SCROLL HANDLER WITH PERFORMANCE OPTIMIZATION
// ============================================

class ScrollHandler {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScrollY = 0;
        this.ticking = false;
        this.init();
    }
    
    init() {
        if (!this.navbar) return;
        
        // Use requestAnimationFrame for smooth animations
        window.addEventListener('scroll', () => this.requestTick());
        
        // Initialize navbar state
        this.updateNavbar();
    }
    
    requestTick() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => this.updateNavbar());
            this.ticking = true;
        }
    }
    
    updateNavbar() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (only on desktop)
        if (window.innerWidth > 768) {
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                this.navbar.classList.add('nav-hidden');
            } else {
                this.navbar.classList.remove('nav-hidden');
            }
        }
        
        this.lastScrollY = currentScrollY;
        this.ticking = false;
    }
}

// ============================================
// MOBILE MENU HANDLER
// ============================================

class MobileMenu {
    constructor() {
        this.menuBtn = null;
        this.navLinks = document.querySelector('.nav-links');
        this.isOpen = false;
        this.focusTrap = null;
        this.init();
    }
    
    init() {
        if (!this.navLinks) return;
        
        this.createMenuButton();
        this.attachEvents();
        this.handleResize();
    }
    
    createMenuButton() {
        // Check if button already exists
        if (document.querySelector('.mobile-menu-btn')) return;
        
        const menuHTML = `
            <button class="mobile-menu-btn" 
                    aria-label="Menu" 
                    aria-expanded="false"
                    aria-controls="navigation-menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        `;
        
        const nav = document.querySelector('.nav-container');
        nav.insertAdjacentHTML('beforeend', menuHTML);
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        
        // Add ID to nav-links for accessibility
        this.navLinks.id = 'navigation-menu';
    }
    
    attachEvents() {
        if (!this.menuBtn) return;
        
        // Menu toggle
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !e.target.closest('.nav-container')) {
                this.closeMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
                this.menuBtn.focus();
            }
        });
        
        // Close menu when link is clicked
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.closeMenu();
                }
            });
        });
    }
    
    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }
    
    openMenu() {
        this.isOpen = true;
        this.menuBtn.classList.add('active');
        this.navLinks.classList.add('mobile-open');
        this.menuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        this.setupFocusTrap();
    }
    
    closeMenu() {
        this.isOpen = false;
        this.menuBtn.classList.remove('active');
        this.navLinks.classList.remove('mobile-open');
        this.menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        // Remove focus trap
        this.removeFocusTrap();
    }
    
    setupFocusTrap() {
        const focusableElements = this.navLinks.querySelectorAll(
            'a, button, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        this.focusTrap = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        
        document.addEventListener('keydown', this.focusTrap);
    }
    
    removeFocusTrap() {
        if (this.focusTrap) {
            document.removeEventListener('keydown', this.focusTrap);
            this.focusTrap = null;
        }
    }
    
    handleResize() {
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMenu();
            }
        }, 250));
    }
}

// ============================================
// IMAGE LAZY LOADER
// ============================================

class ImageLazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
        this.imageOptions = {
            threshold: 0.01,
            rootMargin: '50px'
        };
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver(
                (entries) => this.handleImages(entries),
                this.imageOptions
            );
            
            this.images.forEach(img => {
                // Skip images that are already loaded
                if (!img.complete) {
                    this.imageObserver.observe(img);
                }
            });
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }
    
    handleImages(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.imageObserver.unobserve(entry.target);
            }
        });
    }
    
    loadImage(img) {
        const src = img.getAttribute('data-src');
        const srcset = img.getAttribute('data-srcset');
        
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
        
        if (srcset) {
            img.srcset = srcset;
            img.removeAttribute('data-srcset');
        }
        
        // Add loaded class for animations
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        // Handle error
        img.addEventListener('error', () => {
            img.classList.add('error');
            console.error(`Failed to load image: ${src || img.src}`);
        });
    }
    
    loadAllImages() {
        this.images.forEach(img => {
            if (!img.complete) {
                this.loadImage(img);
            }
        });
    }
}

// ============================================
// ANIMATION CONTROLLER
// ============================================

class AnimationController {
    constructor() {
        this.animatedElements = document.querySelectorAll(
            '.timeline-item, .feature-card, .project-card, [data-animate]'
        );
        this.animationOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }
    
    init() {
        if (this.animatedElements.length === 0) return;
        
        // Check for reduced motion preference
        if (this.prefersReducedMotion()) {
            this.showAllElements();
            return;
        }
        
        this.setupObserver();
    }
    
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    setupObserver() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleAnimations(entries),
            this.animationOptions
        );
        
        this.animatedElements.forEach(element => {
            // Add initial state
            element.classList.add('animate-ready');
            this.observer.observe(element);
        });
    }
    
    handleAnimations(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class with delay for staggered effect
                const delay = entry.target.dataset.animateDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                
                // Stop observing once animated
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    showAllElements() {
        this.animatedElements.forEach(element => {
            element.classList.add('visible');
        });
    }
}

// ============================================
// SMOOTH SCROLL HANDLER
// ============================================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        if (this.links.length === 0) return;
        
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }
    
    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        // Skip if just "#"
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        // Get navbar height for offset
        const navbar = document.getElementById('navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        
        // Smooth scroll with fallback
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            window.scrollTo(0, targetPosition);
        }
        
        // Update URL without jumping
        if (history.pushState) {
            history.pushState(null, null, href);
        }
        
        // Focus management for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
    }
}

// ============================================
// ENHANCED CONTACT FORM
// ============================================

class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        if (!this.form) return;
        
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.honeypot = null;
        this.init();
    }
    
    init() {
        this.addHoneypot();
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.addFieldValidation();
        this.addInputFormatting();
    }
    
    addHoneypot() {
        // Add invisible field to catch bots
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.className = 'honeypot';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';
        honeypot.setAttribute('aria-hidden', 'true');
        this.form.appendChild(honeypot);
        this.honeypot = honeypot;
    }
    
    addFieldValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add ARIA attributes
            if (input.hasAttribute('required')) {
                input.setAttribute('aria-required', 'true');
            }
            
            // Real-time validation
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                this.clearError(input);
                this.checkFormValidity();
            });
        });
    }
    
    addInputFormatting() {
        // Format phone number
        const phoneInput = this.form.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = value;
                    } else if (value.length <= 6) {
                        value = value.slice(0, 3) + ' ' + value.slice(3);
                    } else {
                        value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 10);
                    }
                }
                e.target.value = value;
            });
        }
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Check if honeypot is filled (bot detection)
        if (this.honeypot && this.honeypot.value) {
            return false;
        }
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }
        
        // Field-specific validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            const digitsOnly = value.replace(/\D/g, '');
            if (!phoneRegex.test(value) || digitsOnly.length < 10) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
        }
        
        else if (field.name === 'name' && value) {
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            }
        }
        
        else if (field.tagName === 'SELECT' && field.hasAttribute('required')) {
            if (!value || value === '') {
                errorMessage = 'Please select an option';
                isValid = false;
            }
        }
        
        else if (field.tagName === 'TEXTAREA' && value) {
            if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            }
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }
        
        return isValid;
    }
    
    showError(field, message) {
        this.clearError(field);
        
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        const errorId = `${field.name || field.id}-error`;
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.id = errorId;
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'polite');
        
        field.setAttribute('aria-describedby', errorId);
        
        // Insert error message after the field
        if (field.parentNode.classList.contains('form-row')) {
            field.parentNode.parentNode.insertBefore(errorElement, field.parentNode.nextSibling);
        } else {
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
    }
    
    clearError(field) {
        field.classList.remove('error');
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        
        const errorElement = field.parentNode.querySelector('.error-message') || 
                            field.parentNode.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    checkFormValidity() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
            }
        });
        
        // Enable/disable submit button based on validity
        if (this.submitBtn) {
            this.submitBtn.disabled = !isValid;
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate honeypot
        if (this.honeypot && this.honeypot.value) {
            console.warn('Bot detected');
            return;
        }
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea, select');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showToast('Please correct the errors in the form', 'error');
            
            // Focus first error field
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Remove honeypot from data
            delete data.website;
            
            // Simulate API call (replace with actual endpoint)
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
            
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Track form submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'engagement',
                    event_label: 'contact_form'
                });
            }
            
            this.showToast('Thank you! We\'ll contact you within 24 hours.', 'success');
            this.form.reset();
            this.checkFormValidity();
            
        } catch (error) {
            this.showToast('Something went wrong. Please try again or call us directly.', 'error');
            console.error('Form submission error:', error);
            
        } finally {
            this.setLoadingState(false);
        }
    }
    
    setLoadingState(isLoading) {
        if (!this.submitBtn) return;
        
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.dataset.originalText = this.submitBtn.textContent;
            this.submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = this.submitBtn.dataset.originalText || 'Request Consultation';
        }
    }
    
    showToast(message, type = 'info') {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        
        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
        
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon" aria-hidden="true">${icon}</span>
                <span class="toast-message">${message}</span>
                <button class="toast-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.updateProgress = throttle(() => this.calculateProgress(), 10);
        window.addEventListener('scroll', this.updateProgress);
        window.addEventListener('resize', this.updateProgress);
    }
    
    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-label', 'Page scroll progress');
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);
        this.bar = progressBar.querySelector('.scroll-progress-bar');
        this.progressBar = progressBar;
    }
    
    calculateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        this.bar.style.width = `${Math.min(scrollPercentage, 100)}%`;
        this.progressBar.setAttribute('aria-valuenow', Math.round(scrollPercentage));
        this.progressBar.setAttribute('aria-valuemin', '0');
        this.progressBar.setAttribute('aria-valuemax', '100');
    }
}

// ============================================
// PERFORMANCE MONITOR
// ============================================

class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        if (!window.performance || !window.PerformanceObserver) return;
        
        // Monitor Core Web Vitals
        this.observeLCP();
        this.observeFID();
        this.observeCLS();
        this.measureLoadTime();
    }
    
    observeLCP() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.log('LCP observation not supported');
        }
    }
    
    observeFID() {
        try {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                });
            });
            
            observer.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            console.log('FID observation not supported');
        }
    }
    
    observeCLS() {
        try {
            let clsValue = 0;
            
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                this.metrics.cls = clsValue;
            });
            
            observer.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            console.log('CLS observation not supported');
        }
    }
    
    measureLoadTime() {
        window.addEventListener('load', () => {
            if (window.performance && window.performance.timing) {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                this.metrics.loadTime = loadTime;
                
                // Report metrics after page load
                setTimeout(() => this.reportMetrics(), 1000);
            }
        });
    }
    
    reportMetrics() {
        console.log('Performance Metrics:', this.metrics);
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                lcp: Math.round(this.metrics.lcp || 0),
                fid: Math.round(this.metrics.fid || 0),
                cls: (this.metrics.cls || 0).toFixed(3),
                load_time: Math.round(this.metrics.loadTime || 0)
            });
        }
    }
}

// ============================================
// MAIN APPLICATION
// ============================================

class FinisApp {
    constructor() {
        this.modules = {};
        this.init();
    }
    
    init() {
        // Core modules
        this.modules.scrollHandler = new ScrollHandler();
        this.modules.mobileMenu = new MobileMenu();
        this.modules.smoothScroll = new SmoothScroll();
        
        // Enhancement modules
        this.modules.lazyLoader = new ImageLazyLoader();
        this.modules.animations = new AnimationController();
        this.modules.contactForm = new ContactForm();
        this.modules.scrollProgress = new ScrollProgress();
        
        // Performance monitoring
        this.modules.performance = new PerformanceMonitor();
        
        // Initialize analytics
        this.initAnalytics();
        
        // Setup global error handling
        this.setupErrorHandling();
        
        // Register service worker
        this.registerServiceWorker();
    }
    
    initAnalytics() {
        // Initialize data layer
        window.dataLayer = window.dataLayer || [];
        
        // Track page view
        this.trackPageView();
        
        // Setup event tracking
        this.setupEventTracking();
    }
    
    trackPageView() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
            });
        }
    }
    
    setupEventTracking() {
        // Track CTA clicks
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.textContent.trim();
                const label = e.target.href || 'button-click';
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'cta_click', {
                        event_category: 'engagement',
                        event_label: label,
                        value: action
                    });
                }
            });
        });
        
        // Track outbound links
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', (e) => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'outbound',
                        event_label: e.target.href
                    });
                }
            });
        });
        
        // Track phone number clicks
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'contact',
                        event_label: 'phone_number'
                    });
                }
            });
        });
        
        // Track email clicks
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'contact',
                        event_label: 'email'
                    });
                }
            });
        });
    }
    
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Application error:', e.error);
            
            // Send to error tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    description: e.message,
                    fatal: false
                });
            }
        });
        
        // Promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exception', {
                    description: 'Unhandled promise rejection',
                    fatal: false
                });
            }
        });
    }
    
    registerServiceWorker() {
        if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registered:', registration.scope);
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed:', error);
                    });
            });
        }
    }
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.finisApp = new FinisApp();
    });
} else {
    // DOM already loaded
    window.finisApp = new FinisApp();
}

// Export for debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FinisApp };
}
