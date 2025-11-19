/* ========================================
   FINIS WEBSITE - COMPLETE ENHANCED STYLESHEET
   Acoustic Architecture, Precisely Crafted
   ======================================== */

/* === RESET & BASE === */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* === CSS VARIABLES === */
:root {
    /* Brand Colors */
    --teal: #006B5D;
    --warm-white: #FAFAFA;
    --charcoal: #1F2937;
    --copper: #B87333;
    --light-grey: #E5E7EB;
    --red-accent: #DC2626;
    
    /* Gradients */
    --gradient-teal: linear-gradient(135deg, #006B5D 0%, #008574 100%);
    --gradient-copper: linear-gradient(135deg, #B87333 0%, #D4924A 100%);
    
    /* Spacing */
    --section-padding: 6rem 2rem;
    --border-radius: 12px;
    
    /* Transitions */
    --transition-fast: 0.3s ease;
    --transition-medium: 0.6s ease;
}

/* === BODY & TYPOGRAPHY === */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: var(--charcoal);
    background-color: var(--warm-white);
    overflow-x: hidden;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 300;
    letter-spacing: -0.02em;
    line-height: 1.1;
}

h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 300;
    letter-spacing: -0.01em;
    line-height: 1.2;
    margin-bottom: 1.5rem;
}

h3 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 1rem;
}

h4 {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 0.75rem;
}

p {
    font-size: 1.125rem;
    line-height: 1.7;
    color: #4B5563;
}

/* === SKIP LINK (ACCESSIBILITY) === */
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--teal);
    color: white;
    padding: 0.5rem 1rem;
    text-decoration: none;
    z-index: 9999;
    border-radius: 0 0 8px 0;
}

.skip-link:focus {
    top: 0;
}

/* === SCROLL PROGRESS BAR === */
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(0, 107, 93, 0.1);
    z-index: 1100;
}

.scroll-progress-bar {
    height: 100%;
    background: var(--gradient-teal);
    width: 0;
    transition: width 0.1s ease;
}

/* === NAVIGATION === */
nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(250, 250, 250, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1.5rem 0;
    transition: all var(--transition-fast);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

nav.scrolled {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
}

nav.nav-hidden {
    transform: translateY(-100%);
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.75rem;
    font-weight: 300;
    color: var(--teal);
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: color var(--transition-fast);
    z-index: 1001;
}

.logo:hover {
    color: var(--copper);
}

.logo img {
    height: 40px;
    width: auto;
    display: block;
}

.nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
}

.nav-links a {
    color: var(--charcoal);
    text-decoration: none;
    font-weight: 400;
    transition: color var(--transition-fast);
    position: relative;
}

.nav-links a:hover {
    color: var(--teal);
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--teal);
    transition: width var(--transition-fast);
}

.nav-links a:hover::after {
    width: 100%;
}

/* === MOBILE MENU BUTTON === */
.mobile-menu-btn {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;
}

.hamburger-line {
    display: block;
    width: 25px;
    height: 2px;
    background: var(--charcoal);
    margin: 5px 0;
    transition: all 0.3s ease;
}

.mobile-menu-btn.active .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active .hamburger-line:nth-child(2) {
    opacity: 0;
}

.mobile-menu-btn.active .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

/* === HERO SECTION === */
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8rem 2rem 4rem;
    position: relative;
    overflow: hidden;
    background-image: url('images/hero-background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(250, 250, 250, 0.3);
    z-index: 0;
}

.hero-content,
.hero-stats {
    position: relative;
    z-index: 1;
}

.hero-content {
    max-width: 900px;
    text-align: center;
    margin-bottom: 4rem;
    animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-subtitle {
    font-size: 1.25rem;
    margin: 2rem 0;
    color: #6B7280;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}

.hero-cta {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-top: 3rem;
    flex-wrap: wrap;
}

/* === BUTTONS === */
.btn-primary, 
.btn-secondary {
    padding: 1rem 2.5rem;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1.125rem;
    text-decoration: none;
    transition: all var(--transition-fast);
    cursor: pointer;
    border: none;
    display: inline-block;
}

.btn-primary {
    background: var(--gradient-teal);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 107, 93, 0.2);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 107, 93, 0.3);
}

.btn-secondary {
    background: transparent;
    color: var(--teal);
    border: 2px solid var(--teal);
}

.btn-secondary:hover {
    background: var(--teal);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 107, 93, 0.2);
}

/* === HERO STATS === */
.hero-stats {
    display: flex;
    gap: 4rem;
    justify-content: center;
    animation: fadeInUp 1.2s ease-out;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform var(--transition-fast);
}

.stat:hover {
    transform: translateY(-5px);
}

.stat-number {
    font-size: 3rem;
    font-weight: 300;
    color: var(--teal);
    background: var(--gradient-teal);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-label {
    font-size: 1rem;
    color: #6B7280;
    margin-top: 0.5rem;
    text-align: center;
}

/* === SECTION CONTAINERS === */
.section-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--section-padding);
}

.section-intro {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 4rem;
}

.section-subtitle {
    font-size: 1.25rem;
    color: #6B7280;
    text-align: center;
    max-width: 700px;
    margin: 0 auto 3rem;
}

/* === VALUE PROPOSITION === */
.value-proposition {
    background: white;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    margin-top: 4rem;
}

.feature-card {
    padding: 2.5rem;
    background: var(--warm-white);
    border-radius: var(--border-radius);
    transition: all var(--transition-fast);
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
}

.feature-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-teal);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: 1.5rem;
}

/* === APPROACH TIMELINE === */
.approach {
    background: var(--warm-white);
}

.timeline {
    max-width: 900px;
    margin: 4rem auto 0;
}

.timeline-item {
    display: flex;
    gap: 2rem;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all var(--transition-medium);
}

.timeline-item.visible {
    opacity: 1;
    transform: translateY(0);
}

.timeline-number {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    background: var(--gradient-teal);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 300;
    box-shadow: 0 4px 15px rgba(0, 107, 93, 0.2);
}

.timeline-content h3 {
    color: var(--teal);
    margin-bottom: 0.5rem;
}

/* === FEATURED PROJECTS === */
.featured-projects {
    background: white;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
}

.view-all {
    color: var(--teal);
    text-decoration: none;
    font-weight: 500;
    transition: all var(--transition-fast);
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.view-all:hover {
    transform: translateX(5px);
    color: var(--copper);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
}

.project-card {
    background: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
    transition: all var(--transition-fast);
    cursor: pointer;
}

.project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
}

.project-image {
    height: 250px;
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 1.5rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.project-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
    transition: background var(--transition-fast);
}

.project-card:hover .project-image::before {
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
}

.project-overlay {
    width: 100%;
    position: relative;
    z-index: 1;
}

.project-category {
    background: rgba(255, 255, 255, 0.95);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--charcoal);
    display: inline-block;
}

.project-info {
    padding: 2rem;
}

.project-info h3 {
    color: var(--charcoal);
    margin-bottom: 0.75rem;
}

.project-stats {
    display: flex;
    gap: 2rem;
    margin-top: 1.5rem;
    list-style: none;
    font-size: 0.875rem;
}

.project-stats li {
    flex: 1;
}

.project-stats strong {
    color: var(--teal);
    font-size: 1.25rem;
    display: block;
    margin-bottom: 0.25rem;
}

/* === CONTACT SECTION === */
.contact {
    background: var(--charcoal);
    color: white;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
}

.contact-info h2 {
    color: white;
}

.contact-info p {
    color: #D1D5DB;
    margin-bottom: 2rem;
}

.contact-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.contact-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.contact-item strong {
    color: var(--copper);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.contact-item a {
    color: white;
    text-decoration: none;
    font-size: 1.125rem;
    transition: color var(--transition-fast);
}

.contact-item a:hover {
    color: var(--copper);
}

.contact-item span {
    color: white;
    font-size: 1.125rem;
}

/* === CONTACT FORM === */
.contact-form form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
    width: 100%;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: white;
    font-size: 1rem;
    font-family: inherit;
    transition: all var(--transition-fast);
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
    outline: none;
    border-color: var(--copper);
    background: rgba(255, 255, 255, 0.15);
}

.contact-form select option {
    background: var(--charcoal);
    color: white;
}

.contact-form textarea {
    resize: vertical;
    min-height: 120px;
}

/* Form validation styles */
.error-message {
    display: block;
    color: #EF4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

input.error,
textarea.error,
select.error {
    border-color: #EF4444 !important;
}

/* === TOAST NOTIFICATIONS === */
.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    transform: translateX(400px);
    transition: transform 0.3s ease;
    z-index: 9999;
    max-width: 350px;
}

.toast.show {
    transform: translateX(0);
}

.toast-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.toast-success {
    border-left: 4px solid #10B981;
}

.toast-error {
    border-left: 4px solid #EF4444;
}

.toast-icon {
    font-size: 1.25rem;
}

.toast-success .toast-icon {
    color: #10B981;
}

.toast-error .toast-icon {
    color: #EF4444;
}

/* === FOOTER === */
footer {
    background: #111827;
    color: white;
    padding: 3rem 2rem 2rem;
}

.footer-content {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-section .logo {
    color: var(--copper);
    margin-bottom: 1rem;
}

.footer-section p {
    color: #9CA3AF;
    font-size: 1rem;
}

.footer-section h4 {
    color: white;
    margin-bottom: 1rem;
}

.footer-section ul {
    list-style: none;
}

.footer-section ul li {
    margin-bottom: 0.75rem;
}

.footer-section a {
    color: #9CA3AF;
    text-decoration: none;
    transition: color var(--transition-fast);
}

.footer-section a:hover {
    color: var(--copper);
}

.footer-bottom {
    max-width: 1400px;
    margin: 0 auto;
    padding-top: 2rem;
    text-align: center;
    color: #6B7280;
    font-size: 0.875rem;
}

/* === UTILITY CLASSES === */
.text-center {
    text-align: center;
}

.text-gradient {
    background: var(--gradient-teal);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.fade-in {
    animation: fadeInUp 1s ease-out;
}

/* === RESPONSIVE DESIGN === */

/* Mobile Navigation Styles */
@media (max-width: 768px) {
    .mobile-menu-btn {
        display: block;
    }
    
    .nav-links {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: rgba(250, 250, 250, 0.98);
        flex-direction: column;
        padding: 2rem;
        transition: left 0.3s ease;
        z-index: 999;
    }
    
    .nav-links.active {
        left: 0;
    }
    
    .nav-links li {
        margin: 1rem 0;
    }
    
    .nav-links a {
        display: block;
        padding: 0.75rem;
        font-size: 1.125rem;
    }
    
    .nav-links a::after {
        display: none;
    }
}

/* Tablets and smaller laptops */
@media (max-width: 968px) {
    .nav-links {
        gap: 1.5rem;
        font-size: 0.9rem;
    }
    
    .hero {
        background-attachment: scroll;
    }
    
    .hero-cta {
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    
    .hero-cta .btn-primary,
    .hero-cta .btn-secondary {
        width: 100%;
        max-width: 300px;
    }
    
    .hero-stats {
        gap: 2rem;
    }
    
    .contact-content {
        grid-template-columns: 1fr;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
}

/* Mobile devices */
@media (max-width: 768px) {
    h1 {
        font-size: 2.5rem;
    }
    
    h2 {
        font-size: 2rem;
    }
    
    .nav-container {
        padding: 0 1rem;
    }
    
    .logo {
        font-size: 1.5rem;
    }
    
    .hero {
        padding: 6rem 1rem 3rem;
    }
    
    .hero-stats {
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .stat-number {
        font-size: 2.5rem;
    }
    
    .section-container {
        padding: 4rem 1.5rem;
    }
    
    .features-grid,
    .projects-grid {
        grid-template-columns: 1fr;
    }
    
    .timeline-item {
        gap: 1rem;
    }
    
    .timeline-number {
        width: 50px;
        height: 50px;
        font-size: 1.25rem;
    }
    
    .project-stats {
        flex-direction: column;
        gap: 1rem;
    }
}

/* Small mobile devices */
@media (max-width: 480px) {
    h1 {
        font-size: 2rem;
    }
    
    .hero-cta .btn-primary,
    .hero-cta .btn-secondary {
        padding: 0.875rem 2rem;
        font-size: 1rem;
    }
}

/* === PRINT STYLES === */
@media print {
    nav,
    .hero-cta,
    .contact-form,
    footer,
    .scroll-progress {
        display: none;
    }
    
    .hero {
        background: white;
        min-height: auto;
        padding: 2rem;
    }
    
    .hero::before {
        display: none;
    }
}
