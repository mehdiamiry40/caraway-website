// ============================================
// CARAWAY - Cash for Cars Brisbane
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on load
    
    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen);

            // Animate hamburger
        navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            });
        });
        
        // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
}

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
    });
});

    // ============================================
    // FORM HANDLING
    // ============================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Add loading state
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = `
                    <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
                    </svg>
                    Sending...
                `;
                submitBtn.disabled = true;
                
                // Re-enable after form submission (FormSubmit will redirect)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }
        });
    });
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Remove non-numeric characters except spaces
            let value = this.value.replace(/[^\d\s]/g, '');
            
            // Format Australian mobile number
            if (value.startsWith('04')) {
                value = value.replace(/\s/g, '');
                if (value.length > 4) {
                    value = value.slice(0, 4) + ' ' + value.slice(4);
                }
                if (value.length > 8) {
                    value = value.slice(0, 8) + ' ' + value.slice(8);
                }
                if (value.length > 12) {
                    value = value.slice(0, 12);
                }
            }
            
            this.value = value;
        });
    });
    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        
        summary.addEventListener('click', function(e) {
            // Close other open items (optional - for single open behavior)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item && otherItem.hasAttribute('open')) {
            //         otherItem.removeAttribute('open');
            //     }
            // });
        });
    });
    
    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
};

    const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
    document.querySelectorAll('.step, .service-card, .contact-card, .area-region').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        animateOnScroll.observe(el);
    });
    
    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // ============================================
    // TRUST BAR COUNTER ANIMATION
    // ============================================
    const trustNumbers = document.querySelectorAll('.trust-number');
    let hasAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    const trustBar = document.querySelector('.trust-bar');
    if (trustBar) {
        counterObserver.observe(trustBar);
    }
    
    function animateCounters() {
        trustNumbers.forEach(el => {
            const text = el.textContent;
            const hasPlus = text.includes('+');
            const hasDollar = text.includes('$');
            const hasM = text.includes('M');
            
            // Extract the numeric value
            let target = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (hasM) {
                target = 5; // $5M
            }
            
            let current = 0;
            const increment = target / 50;
            const duration = 1500;
            const stepTime = duration / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                
                let display = Math.floor(current).toLocaleString();
                if (hasDollar) display = '$' + display;
                if (hasM) display += 'M';
                if (hasPlus) display += '+';
                
                el.textContent = display;
            }, stepTime);
        });
    }
    
    // ============================================
    // LAZY LOADING IMAGES (if any added later)
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // CONSOLE BRANDING
    // ============================================
    console.log('%c🚗 Caraway - Cash for Cars Brisbane', 'font-size: 20px; font-weight: bold; color: #059669;');
    console.log('%cNeed to sell your car? Call 04 8143 8444', 'font-size: 14px; color: #6b7280;');
    
});

