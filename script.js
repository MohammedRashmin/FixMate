// Mobile Menu Toggle - Wait for components to load
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// Mobile dropdown tap toggle
function initializeMobileDropdowns() {
    if (window.innerWidth > 768) return;
    document.querySelectorAll('.dropdown > a').forEach(link => {
        link.addEventListener('click', function(e) {
            const dropdown = this.parentElement;
            const isOpen = dropdown.classList.contains('open');
            // Close all open dropdowns first
            document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
            if (!isOpen) {
                e.preventDefault();
                dropdown.classList.add('open');
            }
        });
    });
}

// Close mobile menu when clicking on a link
function initializeNavLinks() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    if (navLinks && mobileMenuBtn) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            // Skip dropdown parent links — they toggle submenus, not navigate
            if (link.parentElement.classList.contains('dropdown') && !link.closest('.dropdown-menu')) return;
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
            });
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll (supports work-hero and achievement-section)
function updateHeaderAppearance() {
    const header = document.querySelector('.header');
    if (!header) return;
    const topSection = document.querySelector('.work-hero') || document.querySelector('.merchant-hero') || document.querySelector('.achievement-section');

    if (topSection) {
        const sectionTop = topSection.offsetTop;
        const sectionBottom = sectionTop + topSection.offsetHeight;
        const scrollPosition = window.scrollY + header.offsetHeight;

        // While within the top section, use dark translucent header with light text for contrast
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            header.style.background = 'rgba(0, 0, 0, 0.35)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.border = '1px solid rgba(255, 255, 255, 0.25)';
            header.style.color = 'white';
            const logoTexts = header.querySelectorAll('.logo-text');
            const logoIcon = header.querySelector('.logo-icon');
            const topLevelLinks = header.querySelectorAll('.nav-links > li > a');
            const dropdownLinks = header.querySelectorAll('.dropdown-menu a');
            logoTexts.forEach(text => text.style.color = 'white');
            if (logoIcon) logoIcon.style.color = '#00d4ff';
            topLevelLinks.forEach(link => link.style.color = 'white');
            // Ensure dropdown items stay dark on white menu
            dropdownLinks.forEach(link => link.style.color = '#333');
            return;
        }
    }

    // Outside of the top section or if none present
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.9)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.border = '1px solid rgba(0, 0, 0, 0.1)';
        header.style.color = '#333';
        const logoTexts = header.querySelectorAll('.logo-text');
        const logoIcon = header.querySelector('.logo-icon');
        const topLevelLinks = header.querySelectorAll('.nav-links > li > a');
        const dropdownLinks = header.querySelectorAll('.dropdown-menu a');
        logoTexts.forEach(text => text.style.color = '#333');
        if (logoIcon) logoIcon.style.color = '#007bff';
        topLevelLinks.forEach(link => link.style.color = '#333');
        dropdownLinks.forEach(link => link.style.color = '#333');
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.35)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.border = '1px solid rgba(255, 255, 255, 0.25)';
        header.style.color = 'white';
        const logoTexts = header.querySelectorAll('.logo-text');
        const logoIcon = header.querySelector('.logo-icon');
        const topLevelLinks = header.querySelectorAll('.nav-links > li > a');
        const dropdownLinks = header.querySelectorAll('.dropdown-menu a');
        logoTexts.forEach(text => text.style.color = 'white');
        if (logoIcon) logoIcon.style.color = '#00d4ff';
        topLevelLinks.forEach(link => link.style.color = 'white');
        dropdownLinks.forEach(link => link.style.color = '#333');
    }
}

window.addEventListener('scroll', updateHeaderAppearance);
window.addEventListener('load', updateHeaderAppearance);

// Intersection Observer for animations
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

// Observe all cards and sections for animation
document.querySelectorAll('.service-card, .impact-card, .partner-card, .news-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Enhanced counter animation for statistics
function animateCounter(element, target, duration = 3000, suffix = '+', prefix = '') {
    let start = 0;
    const increment = target / (duration / 16);
    const originalText = element.textContent;

    function updateCounter() {
        start += increment;
        if (start < target) {
            const currentValue = Math.floor(start);
            element.textContent = prefix + currentValue + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = prefix + target + suffix;
        }
    }
    updateCounter();
}

// Special animation for rating (clean counting with decimals)
function animateRating(element, target, duration = 3000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateRating() {
        start += increment;
        if (start < target) {
            const currentValue = (Math.floor(start * 10) / 10).toFixed(1);
            element.textContent = currentValue + '★';
            requestAnimationFrame(updateRating);
        } else {
            element.textContent = target.toFixed(1) + '★';
        }
    }
    updateRating();
}

// Special animation for K format (1K to 50K)
function animateCounterK(element, target, duration = 3000) {
    let start = 1;
    const increment = (target - 1) / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            const currentValue = Math.floor(start);
            element.textContent = currentValue + 'K+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + 'K+';
        }
    }
    updateCounter();
}

// Special animation for support (clean typing)
function animateSupport(element, duration = 2000) {
    const text = '24/7';
    let currentIndex = 0;

    function typeSupport() {
        if (currentIndex < text.length) {
            element.textContent = text.substring(0, currentIndex + 1);
            currentIndex++;
            setTimeout(typeSupport, duration / text.length);
        }
    }
    typeSupport();
}

// Enhanced statistics observer with repeatable animations
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const statLabel = entry.target.querySelector('.stat-label');
            const text = statNumber.textContent;

            // Add entrance animation to the stat item
            entry.target.style.animation = 'statItemEntrance 0.8s ease forwards';

            if (text.includes('★')) {
                // For rating, reset to 0 and animate to 5 stars
                statNumber.textContent = '0★';
                setTimeout(() => {
                    animateRating(statNumber, 5);
                }, 500);
            } else if (text.includes('24/7')) {
                // For support, reset and animate
                statNumber.textContent = '';
                setTimeout(() => {
                    animateSupport(statNumber);
                }, 500);
            } else {
                // For numbers, reset to 1K and animate
                if (text.includes('K')) {
                    statNumber.textContent = '1K+';
                    setTimeout(() => {
                        animateCounter(statNumber, 50000, 3000, '+', '');
                    }, 500);
                } else {
                    statNumber.textContent = '0';
                    setTimeout(() => {
                        animateCounter(statNumber, parseInt(text.replace(/\D/g, '')));
                    }, 500);
                }
            }
        }
    });
}, { threshold: 0.3 });

// Observe all stat items for repeatable animations
document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Also observe the entire download-stats section for better control
const downloadStatsSection = document.querySelector('.download-stats');
if (downloadStatsSection) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset all stats when section comes into view
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    const statNumber = item.querySelector('.stat-number');
                    const text = statNumber.textContent;

                    // Reset based on type
                    if (text.includes('★')) {
                        statNumber.textContent = '0.0★';
                        setTimeout(() => {
                            animateRating(statNumber, 4.8);
                        }, index * 200 + 500);
                    } else if (text.includes('24/7')) {
                        statNumber.textContent = '';
                        setTimeout(() => {
                            animateSupport(statNumber);
                        }, index * 200 + 500);
                    } else if (text.includes('K')) {
                        statNumber.textContent = '1K+';
                        setTimeout(() => {
                            animateCounterK(statNumber, 50, 3000);
                        }, index * 200 + 500);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sectionObserver.observe(downloadStatsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Download button hover effects
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// News card hover effects
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Worker card animations
document.querySelectorAll('.worker-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Form validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            input.style.borderColor = '#28a745';
        }
    });

    return isValid;
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-3px) scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTop();

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 100%;
            left: 0;
            width: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-btn.active i {
            transform: rotate(90deg);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks && mobileMenuBtn) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
}

// Add touch gestures for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Service icons mobile carousel
function initServiceCarousel() {
    if (window.innerWidth > 768) return;

    const carousel = document.getElementById('serviceCarousel');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!carousel || !dots.length) return;

    let autoTimer;

    function goTo(index) {
        const itemWidth = carousel.querySelector('.service-icon-item').offsetWidth + 8;
        carousel.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function getCurrentIndex() {
        const itemWidth = carousel.querySelector('.service-icon-item').offsetWidth + 8;
        return Math.round(carousel.scrollLeft / itemWidth);
    }

    // Sync dots on scroll
    carousel.addEventListener('scroll', () => {
        const idx = getCurrentIndex();
        dots.forEach(d => d.classList.remove('active'));
        if (dots[idx]) dots[idx].classList.add('active');
    });

    // Dot click
    dots.forEach((dot, i) => dot.addEventListener('click', () => {
        goTo(i);
        resetAuto();
    }));

    // Auto-advance every 3s
    function startAuto() {
        autoTimer = setInterval(() => {
            const next = (getCurrentIndex() + 1) % dots.length;
            goTo(next);
        }, 3000);
    }

    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }

    startAuto();
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initServiceCarousel();
    // Add fade-in animation to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Wait for components to load and then initialize navigation
function waitForComponents() {
    const checkComponents = () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            // Components are loaded, initialize everything
            initializeMobileMenu();
            initializeNavLinks();
            initializeMobileDropdowns();
            initializeKeyboardNavigation();
        } else {
            // Components not ready yet, check again in 100ms
            setTimeout(checkComponents, 100);
        }
    };
    
    checkComponents();
}

// Start checking for components after a short delay
setTimeout(waitForComponents, 500);
