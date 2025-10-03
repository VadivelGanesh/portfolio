// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initMobileNavigation();
    initSimpleNavigation(); // Simple, clean navigation
    initActiveNavLinks();
    initContactForm();
    initScrollAnimations();
    initTypewriterEffect();
    // Note: scroll effects handled by initUnifiedScrollHandler
});

// Simple Navigation System - Clean and Reliable
function initSimpleNavigation() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Calculate position
                const navbarHeight = 80;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Also handle hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = 80;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Helper function to update active navigation link
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}
}

// Enhanced Active Navigation Links
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 100; // Offset for navbar
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Special case for hero section at the very top
        if (window.pageYOffset < 50) {
            currentSection = 'home';
        }
        
        // Update navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll handler for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateActiveLink);
            ticking = true;
            setTimeout(() => { ticking = false; }, 100);
        }
    }
    
    // Update active link on scroll with throttling
    window.addEventListener('scroll', requestTick);
    
    // Update active link on page load
    updateActiveLink();
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            simulateFormSubmission(name, email, subject, message);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate form submission
function simulateFormSubmission(name, email, subject, message) {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Clear form
        document.getElementById('contactForm').reset();
        
        // Show success message
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // In a real application, you would send the form data to your backend here
        console.log('Form submission:', { name, email, subject, message });
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1rem;
        box-shadow: var(--shadow-hover);
        z-index: 1001;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add type-specific styles
    if (type === 'success') {
        notification.style.borderLeftColor = '#28a745';
    } else if (type === 'error') {
        notification.style.borderLeftColor = '#dc3545';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Resume Download Function
function downloadResume() {
    // In a real application, this would download the actual resume file
    showNotification('Resume download feature will be implemented with your actual resume file.', 'info');
    
    // Example of how to trigger a download:
    // const link = document.createElement('a');
    // link.href = 'assets/V_Ganesh_Resume.pdf';
    // link.download = 'V_Ganesh_Resume.pdf';
    // link.click();
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat, .skill-category, .project-card');
    
    const observerOptions = {
        threshold: 0.1,
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
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Remove this duplicate scroll handler - it's handled in the main scroll function

// Typing effect for hero title (optional enhancement)
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    const originalText = titleElement.innerHTML;
    const textContent = "Hi, I'm V Ganesh";
    
    titleElement.innerHTML = 'Hi, I\'m <span class="highlight"></span>';
    const highlightSpan = titleElement.querySelector('.highlight');
    
    let index = 0;
    const nameText = "V Ganesh";
    
    function typeWriter() {
        if (index < nameText.length) {
            highlightSpan.textContent += nameText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page load
    setTimeout(typeWriter, 1000);
}

// Remove this duplicate scroll handler - it's handled in initParallaxEffects

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in animation for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Utility function to debounce scroll events
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

// Scroll Progress Indicator - Now handled in unified scroll handler

// Enhanced Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before');
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
        
        // Floating animation for profile image
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            const rate = Math.sin(scrolled * 0.001) * 10;
            profileImage.style.transform += ` translateY(${rate}px)`;
        }
    });
}

// Enhanced Typewriter Effect
function initTypewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const originalText = typewriterElement.innerHTML;
        typewriterElement.innerHTML = '';
        
        let charIndex = 0;
        const typeSpeed = 100;
        
        function typeCharacter() {
            if (charIndex < originalText.length) {
                typewriterElement.innerHTML += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeCharacter, typeSpeed);
            } else {
                // Add blinking cursor
                typewriterElement.style.borderRight = '3px solid var(--accent-color)';
                typewriterElement.style.animation = 'blink 1s infinite';
            }
        }
        
        // Start typing after a delay
        setTimeout(typeCharacter, 1000);
    }
}

// Enhanced Scroll Animations with Stagger Effect
function initAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Skills animation with stagger
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) scale(0.8)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        skillObserver.observe(item);
    });
    
    // Project cards with 3D entrance
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(-10deg) rotateY(10deg)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        projectObserver.observe(card);
    });
}

// Mouse Trail Effect
function initMouseTrail() {
    const trail = [];
    const maxTrail = 20;
    
    document.addEventListener('mousemove', function(e) {
        trail.push({ x: e.clientX, y: e.clientY });
        
        if (trail.length > maxTrail) {
            trail.shift();
        }
        
        // Create or update trail elements
        const existingTrails = document.querySelectorAll('.mouse-trail');
        existingTrails.forEach(el => el.remove());
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${6 - (index * 0.2)}px;
                height: ${6 - (index * 0.2)}px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - (index * 0.05)};
                transition: all 0.1s ease;
            `;
            document.body.appendChild(trailElement);
            
            // Remove after animation
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.parentNode.removeChild(trailElement);
                }
            }, 100);
        });
    });
}

// Initialize advanced animations
document.addEventListener('DOMContentLoaded', function() {
    initAdvancedScrollAnimations();
    // initMouseTrail(); // Uncomment if you want mouse trail effect
});

// Unified Scroll Handler - Combines all scroll effects
function initUnifiedScrollHandler() {
    let isScrolling = false;
    
    function handleScroll() {
        const scrollY = window.pageYOffset;
        
        // 1. Update scroll progress
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }
        
        // 2. Navbar effects
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrollY > 100) {
                navbar.style.background = 'var(--navbar-bg)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'var(--navbar-bg)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }
        
        // 3. Parallax effects (light)
        const heroBackground = document.querySelector('.hero::before');
        if (heroBackground && scrollY < window.innerHeight) {
            const rate = scrollY * -0.3;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        isScrolling = false;
    }
    
    function requestScrollUpdate() {
        if (!isScrolling) {
            requestAnimationFrame(handleScroll);
            isScrolling = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

// Initialize the unified scroll handler
document.addEventListener('DOMContentLoaded', function() {
    initUnifiedScrollHandler();
});
