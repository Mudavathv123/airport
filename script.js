// TON Web Page JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSmoothScrolling();
    initNavbarEffects();
    initAnimations();
    initInteractiveFeatures();
});

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
}

// Navbar Effects on Scroll
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .defi-card, .app-card, .future-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Interactive Features
function initInteractiveFeatures() {
    // Developer section tabs
    initDeveloperTabs();
    
    // Add loading states to buttons
    initButtonLoadingStates();
    
    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(tooltip => new bootstrap.Tooltip(tooltip));
    }
}

// Developer Section Tabs
function initDeveloperTabs() {
    const tabButtons = document.querySelectorAll('input[name="devOptions"]');
    const developerSection = document.querySelector('#developers');
    
    if (!developerSection) return;
    
    const contentMap = {
        miniApps: {
            title: 'Unlock access to millions of Telegram users',
            description: 'Your app can unlock access to millions of Telegram users with one-click app launch, direct advertising, along with viral and retention mechanics based in the messenger.',
            buttonText: 'Build Mini App'
        },
        gamefi: {
            title: 'Empower games with ultra-fast blockchain',
            description: 'TON and TON tokens allow you to create full-fledged, captivating decentralized games that can reach millions of Telegram users.',
            buttonText: 'Build your game'
        },
        defi: {
            title: 'Get early access to decentralized finance',
            description: 'The TON DeFi market is experiencing significant growth. While it\'s still maturing, there\'s great opportunity for new products to gain a massive audience quickly.',
            buttonText: 'Start Building'
        }
    };
    
    tabButtons.forEach(button => {
        button.addEventListener('change', function() {
            if (this.checked) {
                const selectedTab = this.id;
                const content = contentMap[selectedTab];
                
                if (content) {
                    updateDeveloperContent(content);
                }
            }
        });
    });
}

// Update Developer Section Content
function updateDeveloperContent(content) {
    const titleElement = document.querySelector('#developers h3');
    const descriptionElement = document.querySelector('#developers .lead');
    const buttonElement = document.querySelector('#developers .btn-primary');
    
    if (titleElement) {
        titleElement.style.opacity = '0';
        setTimeout(() => {
            titleElement.textContent = content.title;
            titleElement.style.opacity = '1';
        }, 150);
    }
    
    if (descriptionElement) {
        descriptionElement.style.opacity = '0';
        setTimeout(() => {
            descriptionElement.textContent = content.description;
            descriptionElement.style.opacity = '1';
        }, 200);
    }
    
    if (buttonElement) {
        buttonElement.style.opacity = '0';
        setTimeout(() => {
            buttonElement.textContent = content.buttonText;
            buttonElement.style.opacity = '1';
        }, 250);
    }
}

// Button Loading States
function initButtonLoadingStates() {
    const buttons = document.querySelectorAll('.btn:not([data-bs-toggle])');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href === '#' || this.href.endsWith('#')) {
                e.preventDefault();
                
                // Add loading state
                const originalText = this.textContent;
                this.classList.add('loading');
                this.textContent = 'Loading...';
                this.disabled = true;
                
                // Remove loading state after 2 seconds
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
}

// Blockchain animation enhancement
function enhanceBlockchainAnimation() {
    const blocks = document.querySelectorAll('.block');
    
    blocks.forEach((block, index) => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(10deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 136, 204, 0.5)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Call blockchain animation enhancement
setTimeout(enhanceBlockchainAnimation, 1000);

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.6s ease;
    }
    
    .navbar.scrolled {
        background-color: rgba(33, 37, 41, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
    
    #developers h3,
    #developers .lead,
    #developers .btn-primary {
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Preloader (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Handle form submissions (if any)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted');
    });
});

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize ripple effect
addRippleEffect();

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    });
});

if ('PerformanceObserver' in window) {
    performanceObserver.observe({ entryTypes: ['navigation'] });
}