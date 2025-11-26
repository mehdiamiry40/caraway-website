// ============================================
// DARK MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to system preference
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
}

// Initialize theme
applyTheme(getPreferredTheme());

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        
        // Add a subtle animation
        themeToggle.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 200);
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// ============================================
// MOBILE STICKY CTA
// ============================================
const mobileCTA = document.getElementById('mobile-sticky-cta');
const heroSection = document.getElementById('home');

function handleMobileCTA() {
    if (!mobileCTA || !heroSection) return;
    
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const shouldShow = heroBottom < 0;
    
    if (shouldShow) {
        mobileCTA.classList.add('show');
    } else {
        mobileCTA.classList.remove('show');
    }
}

window.addEventListener('scroll', handleMobileCTA);
handleMobileCTA(); // Check on load

// ============================================
// ANIMATED NUMBER COUNTERS
// ============================================
function animateCounter(element) {
    const target = parseInt(element.dataset.count, 10);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = t => t * (2 - t); // Easing function
    
    let frame = 0;
    element.classList.add('counting');
    
    const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(target * progress);
        
        element.textContent = prefix + currentCount.toLocaleString() + suffix;
        
        if (frame === totalFrames) {
            clearInterval(counter);
            element.classList.remove('counting');
        }
    }, frameDuration);
}

// Observer for number counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.dataset.count) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe all stat numbers with data-count attribute
document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    counterObserver.observe(el);
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.querySelector('.header');

function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);
handleHeaderScroll(); // Check on load

// Mobile Navigation Toggle with Animation and Accessibility
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    return {
        handleKeyDown: (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    };
}

if (navToggle && navMenu) {
    let focusTrap = null;

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : '';

        // Set up or remove focus trap
        if (!isOpen) {
            // Menu opening - set up focus trap
            focusTrap = trapFocus(navMenu);
            navMenu.addEventListener('keydown', focusTrap.handleKeyDown);
            // Focus first link
            const firstLink = navMenu.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        } else {
            // Menu closing - remove focus trap
            if (focusTrap) {
                navMenu.removeEventListener('keydown', focusTrap.handleKeyDown);
                focusTrap = null;
            }
            // Return focus to toggle button
            navToggle.focus();
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            if (focusTrap) {
                navMenu.removeEventListener('keydown', focusTrap.handleKeyDown);
                focusTrap = null;
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            if (focusTrap) {
                navMenu.removeEventListener('keydown', focusTrap.handleKeyDown);
                focusTrap = null;
            }
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            navToggle.focus();
            if (focusTrap) {
                navMenu.removeEventListener('keydown', focusTrap.handleKeyDown);
                focusTrap = null;
            }
        }
    });
}

// Smooth scroll for anchor links (skip-link keeps native behaviour)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetSelector = this.getAttribute('href');
        if (!targetSelector || targetSelector === '#') {
            return;
        }

        const target = document.querySelector(targetSelector);
        if (!target) {
            return;
        }

        const isSkipLink = this.classList.contains('skip-link');
        if (isSkipLink) {
            target.focus();
            return;
        }

        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Form Submission Handler
const quoteForm = document.getElementById('quoteForm');
const submitButton = quoteForm ? quoteForm.querySelector('button[type="submit"]') : null;
const formMessage = document.getElementById('form-message');

if (quoteForm) {
    // Set the redirect URL after form submission
    const currentUrl = window.location.href.split('#')[0];
    const nextInput = quoteForm.querySelector('input[name="_next"]');
    if (nextInput) {
        nextInput.value = currentUrl + '#get-quote?success=true';
    }

    quoteForm.addEventListener('submit', function(e) {
        try {
            // Don't prevent default - let FormSubmit handle it
            // But we'll add visual feedback
            
            if (submitButton) {
                submitButton.classList.add('btn-loading');
                submitButton.disabled = true;
                submitButton.setAttribute('aria-busy', 'true');
            }
            
            if (formMessage) {
                formMessage.className = 'form-message form-message-loading';
                formMessage.textContent = 'Sending your quote request...';
                formMessage.style.display = 'block';
                formMessage.setAttribute('role', 'status');
            }
            
            // Reset form after a delay (fallback if FormSubmit doesn't redirect)
            setTimeout(() => {
                const formData = new FormData(quoteForm);
                // Check if form is still submitting (basic check)
                if (submitButton && submitButton.disabled) {
                    // FormSubmit should handle redirect, but if it doesn't after 10 seconds, show error
                    setTimeout(() => {
                        if (submitButton && submitButton.disabled) {
                            if (formMessage) {
                                formMessage.className = 'form-message form-message-error';
                                formMessage.textContent = 'There was an issue sending your request. Please try again or call us directly.';
                                formMessage.style.display = 'block';
                            }
                            if (submitButton) {
                                submitButton.classList.remove('btn-loading');
                                submitButton.disabled = false;
                                submitButton.setAttribute('aria-busy', 'false');
                                submitButton.textContent = 'Get My Free Quote';
                            }
                        }
                    }, 10000);
                }
            }, 100);
            
        } catch (error) {
            console.error('Form submission error:', error);
            if (formMessage) {
                formMessage.className = 'form-message form-message-error';
                formMessage.textContent = 'An error occurred. Please try again or call us at 04 8143 8444.';
                formMessage.style.display = 'block';
            }
            if (submitButton) {
                submitButton.classList.remove('btn-loading');
                submitButton.disabled = false;
                submitButton.setAttribute('aria-busy', 'false');
                submitButton.textContent = 'Get My Free Quote';
            }
        }
    });
    
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        if (formMessage) {
            formMessage.className = 'form-message form-message-success';
            formMessage.innerHTML = '✓ Thank you! We\'ve received your quote request and will contact you shortly with your cash for cars quote.';
            formMessage.style.display = 'block';
            
            // Scroll to form message
            setTimeout(() => {
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname + '#get-quote');
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on sibling index
            const parent = entry.target.parentElement;
            const siblings = Array.from(parent.children);
            const itemIndex = siblings.indexOf(entry.target);
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, itemIndex * 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation with staggered effect
document.querySelectorAll('.step, .benefit, .area, .story-card, .vehicle-card, .trust-item, .factor, .blog-card, .local-benefit, .region, .faq-item, .testimonial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Phone number formatting and validation
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    try {
        // Format phone number as user types
        phoneInput.addEventListener('input', function(e) {
            try {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.length <= 2) {
                        value = value;
                    } else if (value.length <= 6) {
                        value = value.slice(0, 2) + ' ' + value.slice(2);
                    } else if (value.length <= 10) {
                        value = value.slice(0, 2) + ' ' + value.slice(2, 6) + ' ' + value.slice(6);
                    } else {
                        value = value.slice(0, 2) + ' ' + value.slice(2, 6) + ' ' + value.slice(6, 10);
                    }
                }
                e.target.value = value;
                
                // Clear validation error as user types
                if (e.target.setCustomValidity) {
                    const digits = value.replace(/\D/g, '');
                    if (digits.length >= 10) {
                        e.target.setCustomValidity('');
                        e.target.classList.remove('error');
                    }
                }
            } catch (error) {
                console.error('Phone formatting error:', error);
            }
        });
        
        // Enhanced phone validation
        phoneInput.addEventListener('blur', function() {
            try {
                const value = this.value.replace(/\D/g, '');
                if (value.length > 0 && value.length < 10) {
                    this.setCustomValidity('Please enter a valid Australian phone number (10 digits)');
                    this.classList.add('error');
                } else if (value.length === 10) {
                    this.setCustomValidity('');
                    this.classList.remove('error');
                }
            } catch (error) {
                console.error('Phone validation error:', error);
            }
        });
        
        // Real-time validation feedback
        phoneInput.addEventListener('invalid', function(e) {
            try {
                e.preventDefault();
                this.classList.add('error');
                if (this.value.trim() === '') {
                    this.setCustomValidity('Phone number is required');
                }
            } catch (error) {
                console.error('Phone invalid handler error:', error);
            }
        });
    } catch (error) {
        console.error('Phone input setup error:', error);
    }
}

// Form validation improvements
if (quoteForm) {
    try {
        const yearInput = document.getElementById('year');

        // Dynamically set max year to current year (with one year buffer for new models)
        if (yearInput) {
            try {
                const currentYear = new Date().getFullYear();
                const maxYear = currentYear + 1; // Allow one year ahead for new model year
                yearInput.setAttribute('max', maxYear);

                yearInput.addEventListener('blur', function() {
                    try {
                        const year = parseInt(this.value);
                        const currentYear = new Date().getFullYear();
                        if (isNaN(year)) {
                            this.setCustomValidity('Please enter a valid year');
                            this.classList.add('error');
                        } else if (year > currentYear + 1) {
                            this.setCustomValidity('Year cannot be more than one year in the future');
                            this.classList.add('error');
                        } else if (year < 1900) {
                            this.setCustomValidity('Please enter a valid year (1900 or later)');
                            this.classList.add('error');
                        } else {
                            this.setCustomValidity('');
                            this.classList.remove('error');
                        }
                    } catch (error) {
                        console.error('Year validation error:', error);
                    }
                });
                
                yearInput.addEventListener('input', function() {
                    const year = parseInt(this.value);
                    if (!isNaN(year) && year >= 1900 && year <= new Date().getFullYear() + 1) {
                        this.classList.remove('error');
                    }
                });
            } catch (error) {
                console.error('Year input setup error:', error);
            }
        }
        
        // Add real-time validation feedback for all required fields
        const requiredFields = quoteForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('invalid', function(e) {
                try {
                    e.preventDefault();
                    this.classList.add('error');
                    // Focus on first invalid field
                    if (!quoteForm.querySelector('.error')) {
                        this.focus();
                    }
                } catch (error) {
                    console.error('Field validation error:', error);
                }
            });
            
            field.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.remove('error');
                }
            });
        });
        
    } catch (error) {
        console.error('Form validation setup error:', error);
    }
}

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    
    if (header) {
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items (optional - remove if you want multiple open)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.classList.remove('active');
            //         otherItem.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
            //     }
            // });
            
            // Toggle current item
            item.classList.toggle('active');
            header.setAttribute('aria-expanded', !isActive);
            
            // Smooth scroll to item if opening
            if (!isActive) {
                setTimeout(() => {
                    const rect = item.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetY = scrollTop + rect.top - 100; // 100px offset from top
                    
                    window.scrollTo({
                        top: targetY,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
        
        // Keyboard accessibility
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add phone tracking for analytics
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function() {
        // Track phone clicks for analytics
        console.log('Phone click tracked:', this.href);
    });
});

// Add form tracking
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
        // Track form submissions
        console.log('Form submission tracked:', this.id || 'quoteForm');
    });
});

// Cash for Cars Calculator Functionality
let currentStep = 1;
const calcErrorMessage = document.getElementById('calc-error');

function setCalcError(message = '') {
    if (!calcErrorMessage) return;
    if (message) {
        calcErrorMessage.textContent = message;
        calcErrorMessage.style.display = 'block';
    } else {
        calcErrorMessage.textContent = '';
        calcErrorMessage.style.display = 'none';
    }
}

function nextStep() {
    const make = document.getElementById('calc-make').value;
    const model = document.getElementById('calc-model').value;
    const year = document.getElementById('calc-year').value;
    const condition = document.getElementById('calc-condition').value;
    
    if (!make || !model || !year || !condition) {
        setCalcError('Please complete every field so we can calculate a localised estimate.');
        return;
    }
    
    setCalcError('');
    
    // Calculate estimate
    const estimate = calculateEstimate(make, year, condition);
    
    // Update the estimate display
    document.getElementById('estimate').textContent = estimate.toLocaleString();
    
    // Show step 2
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    currentStep = 2;
    
    // Track calculator usage
    console.log('Calculator used - Make:', make, 'Model:', model, 'Year:', year, 'Condition:', condition, 'Estimate:', estimate);
}

function prevStep() {
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('step2').classList.add('hidden');
    currentStep = 1;
    setCalcError('');
    
    // Clear form
    document.getElementById('calc-make').value = '';
    document.getElementById('calc-model').value = '';
    document.getElementById('calc-year').value = '';
    document.getElementById('calc-condition').value = '';
}

function calculateEstimate(make, year, condition) {
    let basePrice = 0;
    
    // Base price by make
    const makeValues = {
        'toyota': 8000,
        'mazda': 7000,
        'ford': 7500,
        'holden': 6000,
        'nissan': 7000,
        'honda': 7500,
        'bmw': 12000,
        'mercedes': 13000,
        'audi': 12000,
        'volkswagen': 8000,
        'other': 5000
    };
    
    basePrice = makeValues[make] || makeValues['other'];
    
    // Year adjustment (depreciation)
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - parseInt(year);
    
    if (carAge <= 2) {
        basePrice *= 1.0; // No depreciation
    } else if (carAge <= 5) {
        basePrice *= 0.8; // 20% depreciation
    } else if (carAge <= 10) {
        basePrice *= 0.6; // 40% depreciation
    } else if (carAge <= 15) {
        basePrice *= 0.4; // 60% depreciation
    } else {
        basePrice *= 0.25; // 75% depreciation for older cars
    }
    
    // Condition adjustment
    const conditionMultipliers = {
        'excellent': 1.0,
        'good': 0.8,
        'fair': 0.6,
        'poor': 0.4,
        'not-running': 0.25
    };
    
    const finalPrice = Math.round(basePrice * (conditionMultipliers[condition] || 0.5));
    
    // Ensure minimum and maximum bounds
    return Math.max(200, Math.min(15000, finalPrice));
}

// Enhanced WhatsApp integration
function trackWhatsAppClick(source) {
    console.log('WhatsApp clicked from:', source);
    // Here you can add analytics tracking
}

// WhatsApp button tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', function() {
        trackWhatsAppClick('whatsapp_button');
    });
});

// Enhanced analytics tracking
function trackConversion(type, value) {
    console.log('Conversion tracked:', type, value);
    // Here you can add to Google Analytics or other tracking systems
}

// Page load analytics
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cash for Cars Brisbane page loaded');
    trackConversion('page_load', window.location.pathname);
});

// Form submission tracking with enhanced details
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const formId = this.id || 'quoteForm';
        const formData = new FormData(this);
        const make = formData.get('make') || 'N/A';
        const year = formData.get('year') || 'N/A';
        
        trackConversion('form_submit', {
            form_id: formId,
            car_make: make,
            car_year: year,
            page: window.location.pathname
        });
    });
});

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function() {
        trackConversion('phone_click', {
            phone_number: this.href.replace('tel:', ''),
            page: window.location.pathname,
            button_text: this.textContent.trim()
        });
    });
});
