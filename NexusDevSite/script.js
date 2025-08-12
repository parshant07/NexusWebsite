// Lenis Smooth Scroll Integration
let lenis;

// Initialize Lenis smooth scroll
function initLenis() {
    if (typeof Lenis !== 'undefined' && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        lenis = new Lenis({
            duration: 2.5,
            easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 0.8,
            smoothTouch: false,
            touchMultiplier: 1.5,
            infinite: false,
            normalizeWheel: true,
            wheelMultiplier: 0.6,
            syncTouch: true,
            syncTouchLerp: 0.05,
            lerp: 0.05
        });

        // Perfect Lenis + GSAP ScrollTrigger synchronization
        lenis.on('scroll', (e) => {
            ScrollTrigger.update();
        });

        // Add Lenis to GSAP's ticker for frame-perfect sync
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable lag smoothing for consistent animation timing
        gsap.ticker.lagSmoothing(0);

        // Create a unified scroll experience with continuous animation loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Enhance ScrollTrigger integration
        ScrollTrigger.addEventListener('refresh', () => lenis.resize());
        ScrollTrigger.defaults({ scroller: document.body });

        // Accessibility: Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            lenis.destroy();
            document.documentElement.style.scrollBehavior = 'smooth';
            return;
        }

        // Frame-by-frame scrolling with precise control
        let isScrolling = false;
        
        document.addEventListener('keydown', (e) => {
            if (isScrolling) return;
            
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                isScrolling = true;
                lenis.scrollTo(window.scrollY + window.innerHeight * 0.3, {
                    duration: 3,
                    easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
                    onComplete: () => { isScrolling = false; }
                });
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                isScrolling = true;
                lenis.scrollTo(window.scrollY - window.innerHeight * 0.3, {
                    duration: 3,
                    easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
                    onComplete: () => { isScrolling = false; }
                });
            } else if (e.key === 'Home') {
                e.preventDefault();
                isScrolling = true;
                lenis.scrollTo(0, {
                    duration: 4,
                    easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
                    onComplete: () => { isScrolling = false; }
                });
            } else if (e.key === 'End') {
                e.preventDefault();
                isScrolling = true;
                lenis.scrollTo(document.body.scrollHeight, {
                    duration: 4,
                    easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
                    onComplete: () => { isScrolling = false; }
                });
            }
        });

        // Frame-by-frame navigation for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    lenis.scrollTo(target, {
                        duration: 4,
                        easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
                        offset: -80
                    });
                }
            });
        });

        // Add frame-by-frame wheel control
        let wheelTimeout;
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            clearTimeout(wheelTimeout);
            
            const delta = e.deltaY;
            const scrollAmount = Math.abs(delta) > 100 ? delta * 0.3 : delta * 0.8;
            
            lenis.scrollTo(window.scrollY + scrollAmount, {
                duration: 0.8,
                easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            });
            
            wheelTimeout = setTimeout(() => {
                lenis.start();
            }, 100);
        }, { passive: false });

        console.log('🎬 Frame-by-frame Lenis scroll with precise control initialized');
    } else {
        console.log('Lenis or GSAP not loaded, using enhanced fallback smooth scroll');
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.scrollBehavior = 'smooth';
        
        // Enhanced fallback for unified scrolling feel
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    }
}

// Frame-by-frame smooth scroll function
function smoothScrollTo(target, duration = 3000, offset = 80) {
    if (lenis) {
        lenis.scrollTo(target, { 
            offset: -offset,
            duration: duration / 1000,
            easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
        });
    } else {
        // Enhanced fallback smooth scroll with better easing
        const startPosition = window.pageYOffset;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        function animation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Enhanced easing function for smoother animation
            const easeInOutQuart = progress < 0.5 
                ? 8 * progress * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 4) / 2;
            
            window.scrollTo(0, startPosition + distance * easeInOutQuart);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
}

// Custom animation functions
function animate(element, properties, duration = 1000, easing = 'ease-out') {
    const startTime = performance.now();
    const startProps = {};
    
    // Get initial values
    for (let prop in properties) {
        if (prop === 'opacity') {
            startProps[prop] = parseFloat(getComputedStyle(element).opacity) || 0;
        } else if (prop === 'translateY' || prop === 'translateX') {
            startProps[prop] = 0;
        } else if (prop === 'scale') {
            startProps[prop] = 1;
        }
    }
    
    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing
        let easedProgress = progress;
        if (easing === 'ease-out') {
            easedProgress = 1 - Math.pow(1 - progress, 3);
        } else if (easing === 'ease-in-out') {
            easedProgress = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        }
        
        // Apply properties
        let transform = '';
        for (let prop in properties) {
            const startVal = startProps[prop];
            const endVal = properties[prop];
            const currentVal = startVal + (endVal - startVal) * easedProgress;
            
            if (prop === 'opacity') {
                element.style.opacity = currentVal;
            } else if (prop === 'translateY') {
                transform += `translateY(${currentVal}px) `;
            } else if (prop === 'translateX') {
                transform += `translateX(${currentVal}px) `;
            } else if (prop === 'scale') {
                transform += `scale(${currentVal}) `;
            }
        }
        
        if (transform) {
            element.style.transform = transform.trim();
        }
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

// Live Chat & Analytics System
class LiveChatAnalytics {
    constructor() {
        this.analytics = {
            totalVisitors: 0,
            chatInteractions: 0,
            formSubmissions: 0,
            activities: []
        };
        
        this.chatMessages = [];
        this.isTyping = false;
        
        this.init();
        this.loadAnalytics();
    }
    
    init() {
        this.setupChatWidget();
        this.setupAnalyticsDashboard();
        this.trackPageView();
        this.trackSectionViews();
    }
    
    setupChatWidget() {
        const chatToggle = document.getElementById('chat-toggle');
        const chatWindow = document.getElementById('chat-window');
        const chatClose = document.getElementById('chat-close');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        const chatBadge = document.getElementById('chat-badge');
        
        // Toggle chat window
        chatToggle?.addEventListener('click', () => {
            const isActive = chatWindow.classList.contains('active');
            if (!isActive) {
                chatWindow.classList.add('active');
                chatBadge.style.display = 'none';
                this.trackActivity('Chat opened');
            }
        });
        
        // Close chat window
        chatClose?.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
        
        // Send message
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (message) {
                this.addUserMessage(message);
                chatInput.value = '';
                this.analytics.chatInteractions++;
                this.updateAnalytics();
                this.trackActivity(`Chat message: "${message.substring(0, 30)}..."`);
                
                // Simulate bot response
                setTimeout(() => {
                    this.addBotResponse(message);
                }, 1000 + Math.random() * 2000);
            }
        };
        
        chatSend?.addEventListener('click', sendMessage);
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    addUserMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'message user-message';
        messageEl.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${this.formatTime()}</div>
        `;
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    addBotResponse(userMessage) {
        const responses = [
            "That sounds like an exciting project! We specialize in custom software solutions. What's your timeline?",
            "Great question! We have experience with mobile apps, web development, and AI integration. Tell me more about your requirements.",
            "I'd love to help you with that. Our team has worked on similar projects. Would you like to schedule a consultation?",
            "Interesting! We can definitely assist with that type of development. What's your budget range for this project?",
            "Perfect! We offer comprehensive development services. Let me connect you with our project manager for a detailed discussion."
        ];
        
        const chatMessages = document.getElementById('chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'message bot-message';
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        messageEl.innerHTML = `
            <div class="message-content">${randomResponse}</div>
            <div class="message-time">${this.formatTime()}</div>
        `;
        
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    setupAnalyticsDashboard() {
        const analyticsToggle = document.getElementById('analytics-toggle');
        const analyticsDashboard = document.getElementById('analytics-dashboard');
        const analyticsClose = document.getElementById('analytics-close');
        
        // Open analytics (admin only - you could add authentication here)
        analyticsToggle?.addEventListener('click', () => {
            analyticsDashboard.classList.add('active');
            this.updateAnalytics();
        });
        
        // Close analytics
        analyticsClose?.addEventListener('click', () => {
            analyticsDashboard.classList.remove('active');
        });
        
        // Close on backdrop click
        analyticsDashboard?.addEventListener('click', (e) => {
            if (e.target === analyticsDashboard) {
                analyticsDashboard.classList.remove('active');
            }
        });
    }
    
    trackPageView() {
        this.analytics.totalVisitors++;
        this.trackActivity('Page visited');
        this.saveAnalytics();
    }
    
    trackSectionViews() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.id;
                    this.trackActivity(`Viewed ${sectionName} section`);
                    
                    // Trigger advanced scroll animations
                    this.triggerAdvancedScrollAnimations(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    triggerAdvancedScrollAnimations(section) {
        const sectionId = section.id;
        
        // Apply different animations based on section
        switch(sectionId) {
            case 'services':
                this.animateServiceCards();
                break;
            case 'showcase':
                this.animateShowcaseItems();
                break;
            case 'testimonials':
                this.animateTestimonialCards();
                break;
            case 'about':
                this.animateAboutCards();
                break;
            case 'faq':
                this.animateFaqItems();
                break;
        }
    }
    
    animateServiceCards() {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(60px) rotateX(-15deg)';
            
            setTimeout(() => {
                animate(card, {
                    opacity: 1,
                    translateY: 0
                }, 800, 'ease-out');
                
                // Remove rotateX separately to avoid conflicts
                setTimeout(() => {
                    card.style.transform = 'translateY(0px) rotateX(0deg)';
                }, 50);
            }, index * 200);
        });
    }
    
    animateShowcaseItems() {
        const items = document.querySelectorAll('.showcase-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px) scale(0.9)';
            
            setTimeout(() => {
                animate(item, {
                    opacity: 1,
                    translateX: 0,
                    scale: 1
                }, 700, 'ease-out');
            }, index * 150);
        });
    }
    
    animateTestimonialCards() {
        const cards = document.querySelectorAll('.testimonial-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.95)';
            
            setTimeout(() => {
                animate(card, {
                    opacity: 1,
                    translateY: 0,
                    scale: 1
                }, 650, 'ease-out');
            }, index * 250);
        });
    }
    
    animateAboutCards() {
        const cards = document.querySelectorAll('.about-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) rotateY(-10deg)';
            
            setTimeout(() => {
                animate(card, {
                    opacity: 1,
                    translateY: 0
                }, 750, 'ease-out');
                
                // Handle rotation separately
                setTimeout(() => {
                    card.style.transform = 'translateY(0px) rotateY(0deg)';
                }, 100);
            }, index * 200);
        });
    }
    
    animateFaqItems() {
        const items = document.querySelectorAll('.faq-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                animate(item, {
                    opacity: 1,
                    translateX: 0
                }, 600, 'ease-out');
            }, index * 120);
        });
    }
    
    trackActivity(activity) {
        this.analytics.activities.unshift({
            text: activity,
            time: this.formatTime(),
            timestamp: Date.now()
        });
        
        // Keep only last 50 activities
        if (this.analytics.activities.length > 50) {
            this.analytics.activities = this.analytics.activities.slice(0, 50);
        }
        
        this.saveAnalytics();
    }
    
    updateAnalytics() {
        document.getElementById('total-visitors').textContent = this.analytics.totalVisitors;
        document.getElementById('chat-interactions').textContent = this.analytics.chatInteractions;
        document.getElementById('form-submissions').textContent = this.analytics.formSubmissions;
        
        const conversionRate = this.analytics.totalVisitors > 0 
            ? ((this.analytics.chatInteractions + this.analytics.formSubmissions) / this.analytics.totalVisitors * 100).toFixed(1)
            : 0;
        document.getElementById('conversion-rate').textContent = conversionRate + '%';
        
        // Update activity feed
        const activityContainer = document.getElementById('lead-activity');
        activityContainer.innerHTML = '';
        
        this.analytics.activities.slice(0, 10).forEach(activity => {
            const activityEl = document.createElement('div');
            activityEl.className = 'activity-item';
            activityEl.innerHTML = `
                <span class="activity-time">${activity.time}</span>
                <span class="activity-text">${activity.text}</span>
            `;
            activityContainer.appendChild(activityEl);
        });
    }
    
    formatTime() {
        const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    saveAnalytics() {
        localStorage.setItem('nexusAnalytics', JSON.stringify(this.analytics));
    }
    
    loadAnalytics() {
        const saved = localStorage.getItem('nexusAnalytics');
        if (saved) {
            this.analytics = { ...this.analytics, ...JSON.parse(saved) };
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lenis smooth scroll
    setTimeout(() => {
        initLenis();
    }, 200);
    
    feather.replace();
    
    // Apply colored backgrounds to hero icons
    setTimeout(() => {
        const heroIcons = document.querySelectorAll('.card i[data-feather]');
        heroIcons.forEach((icon) => {
            const card = icon.closest('.card');
            if (card) {
                const cardClass = card.classList[1];
                icon.style.cssText = `
                    width: 24px !important;
                    height: 24px !important;
                    color: #ffffff !important;
                    padding: 8px !important;
                    border-radius: 8px !important;
                    transition: all 0.3s ease !important;
                `;
                
                if (cardClass === 'card-1') {
                    icon.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                } else if (cardClass === 'card-2') {
                    icon.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
                } else if (cardClass === 'card-3') {
                    icon.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
                } else if (cardClass === 'card-4') {
                    icon.style.background = 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)';
                }
            }
        });
        console.log('🎨 Hero icon colors applied');
        
        // Ensure image loading and error handling
        const allImages = document.querySelectorAll('img');
        allImages.forEach(img => {
            img.style.cssText += `
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                z-index: 10 !important;
            `;
            
            // Add error handling for failed image loads
            img.onerror = function() {
                const fallbackColors = ['667eea', '4facfe', '43e97b', 'fa709a', 'f093fb', 'a8edea'];
                const randomColor = fallbackColors[Math.floor(Math.random() * fallbackColors.length)];
                const projectName = this.alt.replace(/[^a-zA-Z0-9]/g, '+');
                this.src = `https://via.placeholder.com/600x400/${randomColor}/ffffff?text=${projectName}`;
            };
        });
        console.log('📷 Image loading optimized with fallback handling');
    }, 200);
    
    // Add loading state
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('loaded');
    }
    
    // Initialize all enhanced features
    setTimeout(() => {
        initializeAnimations();
        // Magnetic effects disabled per user request
    setupIconPopupEffects();
    setupScrollTriggeredAIBackground();
        setupServicesAnimations();
        setupWorkSectionAnimations();
        setupGlobalScrollAnimations();
        // AI background removed for cleaner design
        
        // Initialize Live Chat & Analytics
        window.chatAnalytics = new LiveChatAnalytics();
    }, 300);
});

// Enhanced Animation System
function initializeAnimations() {
    // Hero title reveal animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            animate(heroTitle, {
                opacity: 1,
                translateY: 0
            }, 1200, 'ease-out');
        }, 300);
    }
    
    // Hero description reveal
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
        heroDesc.style.opacity = '0';
        heroDesc.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            animate(heroDesc, {
                opacity: 1,
                translateY: 0
            }, 1000, 'ease-out');
        }, 600);
    }
    
    // Hero buttons reveal
    const heroButtons = document.querySelectorAll('.hero-cta .btn');
    heroButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            animate(btn, {
                opacity: 1,
                translateY: 0
            }, 800, 'ease-out');
        }, 900 + (index * 150));
    });
    
    // Floating cards enhanced animation
    const floatingCards = document.querySelectorAll('.card');
    floatingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.8)';
        
        setTimeout(() => {
            animate(card, {
                opacity: 1,
                translateY: 0,
                scale: 1
            }, 1000, 'ease-out');
        }, 1200 + (index * 200));
    });
    
    // Stats counter animation
    setTimeout(() => {
        animateStats();
    }, 1800);
}

// Scroll-triggered animations
function setupScrollTriggers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('section-title')) {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    animate(element, { opacity: 1, translateY: 0 }, 800, 'ease-out');
                }
                
                if (element.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            animate(card, { opacity: 1, translateY: 0 }, 600, 'ease-out');
                        }, index * 150);
                    });
                }
                
                if (element.classList.contains('showcase-item')) {
                    const items = document.querySelectorAll('.showcase-item');
                    items.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            animate(item, { opacity: 1, translateY: 0 }, 700, 'ease-out');
                        }, index * 100);
                    });
                }
                
                if (element.classList.contains('testimonial-card')) {
                    const cards = document.querySelectorAll('.testimonial-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            animate(card, { opacity: 1, translateY: 0 }, 650, 'ease-out');
                        }, index * 200);
                    });
                }
                
                if (element.classList.contains('about-card')) {
                    const cards = document.querySelectorAll('.about-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            animate(card, { opacity: 1, translateY: 0 }, 750, 'ease-out');
                        }, index * 150);
                    });
                }
                
                if (element.classList.contains('faq-item')) {
                    const items = document.querySelectorAll('.faq-item');
                    items.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                        setTimeout(() => {
                            animate(item, { opacity: 1, translateX: 0 }, 600, 'ease-out');
                        }, index * 100);
                    });
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const elementsToAnimate = [
        '.section-title', '.service-card', '.showcase-item', 
        '.testimonial-card', '.about-card', '.faq-item'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
}

// Advanced Scroll Animation System
class AdvancedScrollAnimations {
    constructor() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupTextRevealAnimations();
        this.setupCounterAnimations();
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '-50px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleScrollAnimation(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe various elements for scroll animations
        const elementsToAnimate = [
            '.section-title',
            '.section-subtitle',
            '.service-card',
            '.showcase-item',
            '.testimonial-card',
            '.about-card',
            '.faq-item',
            '.stat',
            '.floating-card'
        ];
        
        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                observer.observe(el);
            });
        });
    }
    
    handleScrollAnimation(element) {
        const animations = {
            '.section-title': () => this.animateSlideUp(element, 800, 0),
            '.section-subtitle': () => this.animateSlideUp(element, 600, 200),
            '.service-card': () => this.animateServiceCard(element),
            '.showcase-item': () => this.animateShowcaseItem(element),
            '.testimonial-card': () => this.animateTestimonialCard(element),
            '.about-card': () => this.animateAboutCard(element),
            '.faq-item': () => this.animateFaqItem(element),
            '.stat': () => this.animateStatCard(element),
            '.floating-card': () => this.animateFloatingCard(element)
        };
        
        // Find matching animation
        for (const [selector, animationFn] of Object.entries(animations)) {
            if (element.matches(selector)) {
                animationFn();
                break;
            }
        }
    }
    
    animateSlideUp(element, duration = 600, delay = 0) {
        setTimeout(() => {
            animate(element, {
                opacity: 1,
                translateY: 0
            }, duration, 'ease-out');
        }, delay);
    }
    
    animateServiceCard(element) {
        // Skip custom animation if GSAP services animation is active
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            return; // GSAP handles service card animations with staggered reveal
        }
        
        const cards = document.querySelectorAll('.service-card');
        const index = Array.from(cards).indexOf(element);
        
        element.style.transform = 'translateY(60px) scale(0.8)';
        setTimeout(() => {
            animate(element, {
                opacity: 1,
                translateY: 0,
                scale: 1
            }, 900, 'ease-out');
        }, index * 200);
    }
    
    animateShowcaseItem(element) {
        // Skip custom animation if GSAP parallax is active
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            return; // GSAP handles showcase animations with parallax
        }
        
        const items = document.querySelectorAll('.showcase-item');
        const index = Array.from(items).indexOf(element);
        
        element.style.transform = 'translateY(60px) scale(0.8)';
        setTimeout(() => {
            animate(element, {
                opacity: 1,
                translateY: 0,
                scale: 1
            }, 900, 'ease-out');
        }, index * 200);
    }
    
    animateTestimonialCard(element) {
        const cards = document.querySelectorAll('.testimonial-card');
        const index = Array.from(cards).indexOf(element);
        
        element.style.transform = 'translateY(60px) scale(0.8)';
        setTimeout(() => {
            animate(element, {
                opacity: 1,
                translateY: 0,
                scale: 1
            }, 900, 'ease-out');
        }, index * 200);
    }
    
    animateAboutCard(element) {
        const cards = document.querySelectorAll('.about-card');
        const index = Array.from(cards).indexOf(element);
        
        element.style.transform = 'translateY(60px) scale(0.8)';
        setTimeout(() => {
            animate(element, {
                opacity: 1,
                translateY: 0,
                scale: 1
            }, 900, 'ease-out');
        }, index * 200);
    }
    
    animateFaqItem(element) {
        const items = document.querySelectorAll('.faq-item');
        const index = Array.from(items).indexOf(element);
        
        element.style.transform = 'translateY(60px) scale(0.8)';
        setTimeout(() => {
            animate(element, {
                opacity: 1,
                translateY: 0,
                scale: 1
            }, 900, 'ease-out');
        }, index * 200);
    }
    
    animateStatCard(element) {
        const stats = document.querySelectorAll('.stat');
        const index = Array.from(stats).indexOf(element);
        
        element.style.transform = 'translateY(60px) scale(0.8)';
        setTimeout(() => {
            animate(element, {
                opacity: 1,
                translateY: 0,
                scale: 1
            }, 900, 'ease-out');
            
            // Trigger number animation
            const number = element.querySelector('h3');
            if (number) {
                this.animateNumber(number);
            }
        }, index * 200);
    }
    
    animateFloatingCard(element) {
        const cards = document.querySelectorAll('.floating-card');
        const index = Array.from(cards).indexOf(element);
        
        element.style.transform = 'translateY(60px) scale(0.8)';
        setTimeout(() => {
            animate(element, {
                opacity: 1,
                translateY: 0,
                scale: 1
            }, 900, 'ease-out');
        }, index * 200);
    }
    
    setupTextRevealAnimations() {
        const textElements = document.querySelectorAll('h1, h2, h3, .hero-description');
        
        textElements.forEach(element => {
            const text = element.textContent;
            const words = text.split(' ');
            
            element.innerHTML = words.map(word => 
                `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(20px);">${word}</span>`
            ).join(' ');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateTextReveal(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(element);
        });
    }
    
    animateTextReveal(element) {
        const words = element.querySelectorAll('.word');
        words.forEach((word, index) => {
            setTimeout(() => {
                animate(word, {
                    opacity: 1,
                    translateY: 0
                }, 400, 'ease-out');
            }, index * 100);
        });
    }
    
    animateNumber(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (number) {
            element.textContent = '0' + (hasPlus ? '+' : '');
            
            const duration = 2000;
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easedProgress * number);
                
                element.textContent = current + (hasPlus ? '+' : '');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            
            requestAnimationFrame(updateCounter);
        }
    }
    
    setupParallaxEffects() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            // Hero background parallax
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground && scrolled < window.innerHeight) {
                heroBackground.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
            }
            
            // Floating cards parallax
            const floatingCards = document.querySelectorAll('.floating-card');
            floatingCards.forEach((card, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = scrolled * speed;
                card.style.transform += ` translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', requestTick, { passive: true });
        }
    }
    
    setupCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.counter);
                    this.animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }
}

// Initialize Advanced Scroll Animations
function setupAdvancedAnimations() {
    window.scrollAnimations = new AdvancedScrollAnimations();
}

// Vanilla Tilt removed from Services Section per user request

// Setup Staggered Reveal and Scroll-Synced Growth for Services Section
function setupServicesAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const serviceCards = document.querySelectorAll('.service-card');
        const servicesSection = document.querySelector('.services');
        
        // Simple fade-in animation for service cards
        serviceCards.forEach((card, index) => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
        
        // Enhanced slide-from-side hover effects
        serviceCards.forEach((card, index) => {
            // Individual card hover enhancement with slide effect
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    x: 10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.service-icon'), {
                    x: 5,
                    scale: 1.1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    x: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.service-icon'), {
                    x: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
        
        console.log('✨ Simple fade-in animations for service cards');
    } else {
        console.log('GSAP/ScrollTrigger not loaded, skipping services animations');
    }
}

// Clean background - AI effects removed

// Setup GSAP ScrollTrigger animations for entire page
function setupGlobalScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Enhanced section headers with dynamic slide entrance
        const sectionHeaders = document.querySelectorAll('.section-header, .section-title, h2, h1');
        sectionHeaders.forEach((header, index) => {
            gsap.fromTo(header,
                {
                    x: -100,
                    opacity: 0,
                    skewX: -15
                },
                {
                    x: 0,
                    opacity: 1,
                    skewX: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: header,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Simple fade-in animation for about cards
        const aboutCards = document.querySelectorAll('.about-card, .feature-card, .stat-card');
        aboutCards.forEach((card, index) => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Simple fade-in animation for testimonial cards
        const testimonialCards = document.querySelectorAll('.testimonial-card, .review-card, .client-card');
        testimonialCards.forEach((card, index) => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Enhanced FAQ items with progressive slide reveal
        const faqItems = document.querySelectorAll('.faq-item, .accordion-item, .question-item');
        faqItems.forEach((item, index) => {
            gsap.fromTo(item,
                {
                    x: -80 - (index * 10),
                    opacity: 0,
                    skewX: -10
                },
                {
                    x: 0,
                    opacity: 1,
                    skewX: 0,
                    duration: 1,
                    ease: "power3.out",
                    delay: index * 0.12,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                        onComplete: () => {
                            // Subtle slide bounce
                            gsap.to(item, {
                                x: 5,
                                duration: 0.15,
                                ease: "power2.out",
                                yoyo: true,
                                repeat: 1
                            });
                        }
                    }
                }
            );

            // FAQ hover effects
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    x: 15,
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    x: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Simple fade-in animation for contact cards
        const contactCards = document.querySelectorAll('.contact-card, .info-card, .details-card');
        contactCards.forEach((card, index) => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Enhanced contact form with sophisticated slide entrance
        const contactForm = document.querySelector('.contact-form-container');
        if (contactForm) {
            gsap.fromTo(contactForm,
                {
                    x: 150,
                    opacity: 0,
                    rotationY: 20,
                    transformOrigin: "left center"
                },
                {
                    x: 0,
                    opacity: 1,
                    rotationY: 0,
                    duration: 1.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contactForm,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                        onComplete: () => {
                            // Form elements slide in sequence
                            const formElements = contactForm.querySelectorAll('.form-group, .btn');
                            formElements.forEach((element, index) => {
                                gsap.fromTo(element,
                                    { x: 30, opacity: 0 },
                                    {
                                        x: 0,
                                        opacity: 1,
                                        duration: 0.5,
                                        ease: "power2.out",
                                        delay: index * 0.1
                                    }
                                );
                            });
                        }
                    }
                }
            );
        }

        // Animate footer content
        const footerSections = document.querySelectorAll('.footer-section');
        footerSections.forEach((section, index) => {
            gsap.fromTo(section,
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    delay: index * 0.15,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 95%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        console.log('✨ Simple fade-in animations initialized for all sections');
    } else {
        console.log('GSAP/ScrollTrigger not loaded, skipping global scroll animations');
    }
}

// Setup Clean Work Section Animations
function setupWorkSectionAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const showcaseItems = document.querySelectorAll('.showcase-item');
        const showcaseImages = document.querySelectorAll('.showcase-image img');
        
        // Connected animation for work items linking to section heading
        const workHeading = document.querySelector('#showcase .section-title');
        
        // Create connection lines from heading to each item
        showcaseItems.forEach((item, index) => {
            // Create invisible connection line
            const line = document.createElement('div');
            line.className = 'connection-line';
            line.style.cssText = `
                position: absolute;
                background: linear-gradient(45deg, #667eea, #764ba2);
                height: 2px;
                z-index: 10;
                opacity: 0;
                transform-origin: left center;
                pointer-events: none;
            `;
            document.body.appendChild(line);
            
            // Animate items with connection effect
            gsap.fromTo(item, {
                opacity: 0,
                y: 50,
                scale: 0.8
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.7)",
                delay: index * 0.3,
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                    onStart: () => {
                        // Animate connection line from heading to item
                        if (workHeading && item) {
                            const headingRect = workHeading.getBoundingClientRect();
                            const itemRect = item.getBoundingClientRect();
                            
                            const startX = headingRect.left + headingRect.width / 2;
                            const startY = headingRect.bottom;
                            const endX = itemRect.left + itemRect.width / 2;
                            const endY = itemRect.top;
                            
                            const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                            const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
                            
                            line.style.left = startX + 'px';
                            line.style.top = startY + 'px';
                            line.style.width = '0px';
                            line.style.transform = `rotate(${angle}deg)`;
                            line.style.opacity = '0.6';
                            
                            gsap.to(line, {
                                width: distance + 'px',
                                duration: 0.8,
                                ease: "power2.out",
                                onComplete: () => {
                                    gsap.to(line, {
                                        opacity: 0,
                                        duration: 0.5,
                                        delay: 0.5
                                    });
                                }
                            });
                        }
                    }
                }
            });
        });
        
        // Subtle parallax for showcase images
        showcaseImages.forEach((img, index) => {
            gsap.to(img, {
                y: -20,
                scale: 1.03,
                duration: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: img.closest('.showcase-item'),
                    start: "top 90%",
                    end: "bottom 10%",
                    scrub: 1
                }
            });
        });
        
        console.log('🔗 Connected animations for Our Work section initialized');
    } else {
        console.log('GSAP/ScrollTrigger not loaded, skipping work animations');
    }
}

// Create floating background elements for parallax
function createFloatingElements(section) {
    const floatingElement1 = document.createElement('div');
    floatingElement1.className = 'parallax-float parallax-float-1';
    
    const floatingElement2 = document.createElement('div');
    floatingElement2.className = 'parallax-float parallax-float-2';
    
    const floatingElement3 = document.createElement('div');
    floatingElement3.className = 'parallax-float parallax-float-3';
    
    section.appendChild(floatingElement1);
    section.appendChild(floatingElement2);
    section.appendChild(floatingElement3);
    
    // Animate floating elements with different speeds
    gsap.to('.parallax-float-1', {
        y: -80,
        rotation: 45,
        duration: 1,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top 100%",
            end: "bottom 0%",
            scrub: 0.8
        }
    });
    
    gsap.to('.parallax-float-2', {
        y: -120,
        rotation: -30,
        duration: 1,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top 100%",
            end: "bottom 0%",
            scrub: 1.2
        }
    });
    
    gsap.to('.parallax-float-3', {
        y: -60,
        rotation: 60,
        duration: 1,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top 100%",
            end: "bottom 0%",
            scrub: 2
        }
    });
}

// Magnetic hover effects completely removed per user request
function setupMagneticEffects() {
    // All magnetic cursor effects have been disabled
    return;
}

// Tilt/Parallax effect for About Us cards
function setupTiltEffects() {
    const tiltCards = document.querySelectorAll('.about-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10; // Max 10 degrees
            const rotateY = (x - centerX) / centerX * 10;   // Max 10 degrees
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
            `;
            this.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.320, 1)';
        });
    });
}

// Animation functions for different elements
function animateSectionTitle(element) {
    animate(element, {
        opacity: 1,
        translateY: 0
    }, 800, 'ease-out');
}

function animateServiceCard(element) {
    animate(element, {
        opacity: 1,
        translateY: 0
    }, 600, 'ease-out');
}

function animateShowcaseItem(element) {
    animate(element, {
        opacity: 1,
        translateY: 0
    }, 700, 'ease-out');
}

function animateTestimonialCard(element) {
    animate(element, {
        opacity: 1,
        translateY: 0
    }, 650, 'ease-out');
}

function animateAboutCard(element) {
    animate(element, {
        opacity: 1,
        translateY: 0
    }, 750, 'ease-out');
}

function staggerServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            animate(card, {
                opacity: 1,
                translateY: 0,
                scale: 1
            }, 600, 'ease-out');
        }, index * 150);
    });
}

// Enhanced stats animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach((stat, index) => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (number) {
            stat.textContent = '0' + (hasPlus ? '+' : '');
            
            setTimeout(() => {
                animateCounter(stat, number, hasPlus);
            }, index * 200);
        }
    });
}

function animateCounter(element, target, hasPlus = false) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease-out animation
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easedProgress * target);
        
        element.textContent = current + (hasPlus ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// FAQ Accordion with smooth animations
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const itemAnswer = item.querySelector('.faq-answer');
            itemAnswer.style.maxHeight = '0';
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Icon popup effects for all interactive icons
function setupIconPopupEffects() {
    const allIcons = document.querySelectorAll('.service-icon, .contact-icon, [data-feather]');
    
    allIcons.forEach(icon => {
        // Add enhanced popup effect with GSAP
        icon.addEventListener('mouseenter', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: Math.random() * 10 - 5,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        icon.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });
        
        // Add click animation
        icon.addEventListener('click', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(icon, {
                    scale: 0.95,
                    duration: 0.1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.to(icon, {
                            scale: 1.1,
                            duration: 0.2,
                            ease: "back.out(1.7)"
                        });
                    }
                });
            }
        });
    });
    
    console.log('💫 Icon popup effects initialized for all interactive elements');
}

// Scroll-triggered AI background effects
function setupScrollTriggeredAIBackground() {
    let scrollTimeout;
    let isAIBackgroundActive = false;
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercent = scrollY / (documentHeight - windowHeight);
        
        // Activate AI background when scrolled past 15% of the page
        if (scrollPercent > 0.15 && !isAIBackgroundActive) {
            document.body.classList.add('ai-background-active');
            isAIBackgroundActive = true;
            console.log('🤖 AI background activated on scroll');
        } else if (scrollPercent <= 0.15 && isAIBackgroundActive) {
            document.body.classList.remove('ai-background-active');
            isAIBackgroundActive = false;
            console.log('🎨 AI background deactivated');
        }
        
        // Clear existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Add subtle scroll-based transformations
        if (isAIBackgroundActive && typeof gsap !== 'undefined') {
            const intensity = Math.sin(scrollPercent * Math.PI * 2) * 0.5;
            gsap.set(document.body, {
                '--ai-intensity': intensity,
                duration: 0.1
            });
        }
    }
    
    // Throttled scroll listener
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    console.log('🌟 Scroll-triggered AI background system initialized');
}

// Note: Anchor link handling is now integrated into initLenis() for unified behavior

// Enhanced form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(this)) {
            showMessage('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission with enhanced animation
        animate(submitBtn, { scale: 0.95 }, 200, 'ease-in-out');
        
        setTimeout(() => {
            contactForm.reset();
            showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            animate(submitBtn, { scale: 1 }, 200, 'ease-in-out');
        }, 2000);
    });
}

// Form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#f44336';
            animate(field, { scale: 1.02 }, 200, 'ease-in-out');
            setTimeout(() => animate(field, { scale: 1 }, 200, 'ease-in-out'), 200);
            isValid = false;
        } else {
            field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }
    });
    
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#f44336';
            isValid = false;
        }
    }
    
    return isValid;
}

// Enhanced message display
function showMessage(message, type) {
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => {
        animate(msg, { opacity: 0, translateY: -20 }, 300, 'ease-in');
        setTimeout(() => msg.remove(), 300);
    });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    messageDiv.style.display = 'block';
    
    const formContainer = document.querySelector('.contact-form-container');
    if (formContainer && contactForm) {
        formContainer.insertBefore(messageDiv, contactForm);
        
        animate(messageDiv, {
            opacity: 1,
            translateY: 0
        }, 400, 'ease-out');
        
        setTimeout(() => {
            animate(messageDiv, {
                opacity: 0,
                translateY: -20
            }, 300, 'ease-in');
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

// Active navigation link
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });

// Enhanced image loading
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transform = 'scale(1.1)';
            
            img.onload = function() {
                animate(this, {
                    opacity: 1,
                    scale: 1
                }, 600, 'ease-out');
            };
            
            observer.unobserve(img);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});



// Enhanced interactions without custom cursor

// Console welcome message
console.log('%c🚀 Welcome to Nexus App Developers!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cWe build amazing software solutions with smooth animations!', 'color: #b8b8b8; font-size: 12px;');

