// Clean Portfolio JavaScript - Essential Functions Only

document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    initThemeToggle();
    initMobileNavigation();
    initCleanNavigation();
    initContactForm();
    initTypewriterAnimation();
    initEducationAnimations();
    initAboutAnimations();
    initExperienceAnimations();
    initYearsExperience();
});

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    });
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
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Clean Navigation System
function initCleanNavigation() {
    // Handle all navigation links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    allNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Calculate scroll position
                const navbarHeight = 80;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Simple smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

// Update Active Navigation Link
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Update Active Navigation on Scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Special case for top of page
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

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                contactForm.reset();
                alert('Thank you for your message! I\'ll get back to you soon.');
            }, 2000);
        });
    }
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Typewriter Animation for Hero Title
function initTypewriterAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // Text to type
    const fullText = "Hi, I'm V Ganesh";
    const highlightStart = fullText.indexOf("V Ganesh");
    
    // Clear the current content
    heroTitle.innerHTML = '';
    
    // Create a container for the typewriter effect
    const typewriterContainer = document.createElement('span');
    typewriterContainer.className = 'typewriter-text';
    heroTitle.appendChild(typewriterContainer);
    
    // Create cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.innerHTML = '|';
    heroTitle.appendChild(cursor);
    
    let charIndex = 0;
    const typeSpeed = 100; // milliseconds per character
    
    function typeCharacter() {
        if (charIndex < fullText.length) {
            const char = fullText.charAt(charIndex);
            
            // Check if we're at the start of "V Ganesh" to add highlighting
            if (charIndex === highlightStart) {
                typewriterContainer.innerHTML += '<span class="highlight">';
            }
            
            typewriterContainer.innerHTML += char;
            
            // Close the highlight span after "V Ganesh"
            if (charIndex === fullText.length - 1) {
                typewriterContainer.innerHTML += '</span>';
            }
            
            charIndex++;
            setTimeout(typeCharacter, typeSpeed);
        } else {
            // Animation complete - start blinking cursor
            cursor.style.animation = 'blink 1s infinite';
            
            // Remove cursor after 3 seconds
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 3000);
        }
    }
    
    // Start typing after a delay
    setTimeout(() => {
        typeCharacter();
    }, 1000);
}

// About Me section animations
function initAboutAnimations() {
    const aboutBlock = document.querySelector('.about-text');
    const statBlocks = document.querySelectorAll('.stat');
    if (!aboutBlock) return;

    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

    const aboutObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Reveal about text
                aboutBlock.classList.add('in-view');

                // Stagger stats
                statBlocks.forEach((el, idx) => {
                    setTimeout(() => el.classList.add('in-view'), idx * 150);
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    aboutObserver.observe(aboutBlock);
}

// Experience section animations
function initExperienceAnimations() {
    const items = document.querySelectorAll('.exp-item');
    if (!items.length) return;
    const obs = new IntersectionObserver((entries, ob) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('in-view');
                ob.unobserve(e.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    items.forEach(i => obs.observe(i));
}

// Auto-calc Years of Experience (supports fixed-month override)
function initYearsExperience() {
    const el = document.getElementById('yearsExp');
    if (!el) return;

    // CONFIG: If you only have internship experience right now, set this to true
    // and adjust fixedMonths to your total months. Later, set to false to auto-calc.
    const useFixedMonths = true;
    const fixedMonths = 8; // total experience in months (e.g., 8-month internship)

    if (useFixedMonths) {
        el.textContent = `${fixedMonths}m`;
        return;
    }

    // Auto-calc from a start date (use when you want it to grow automatically)
    const start = new Date('2023-06-01'); // set your professional start date
    const now = new Date();
    const diffYears = (now - start) / (1000 * 60 * 60 * 24 * 365.25);

    if (diffYears < 1) {
        const months = Math.max(1, Math.round(diffYears * 12));
        el.textContent = `${months}m`;
    } else {
        el.textContent = `${diffYears.toFixed(1)}+`;
    }
}

// Education section animations
function initEducationAnimations() {
    const eduItems = document.querySelectorAll('.edu-item');
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

    const onIntersect = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const item = entry.target;
                item.classList.add('in-view');

                // Stagger badges inside each item
                const badges = item.querySelectorAll('.edu-badge');
                badges.forEach((badge, idx) => {
                    setTimeout(() => badge.classList.add('in-view'), idx * 120);
                });

                observer.unobserve(item);
            }
        });
    };

    const observer = new IntersectionObserver(onIntersect, observerOptions);
    eduItems.forEach((item) => observer.observe(item));
}

// Resume Download
function downloadResume() {
    alert('Resume download feature will be implemented with your actual resume file.');
    // Uncomment and modify when you have your resume PDF:
    // const link = document.createElement('a');
    // link.href = 'assets/V_Ganesh_Resume.pdf';
    // link.download = 'V_Ganesh_Resume.pdf';
    // link.click();
}
