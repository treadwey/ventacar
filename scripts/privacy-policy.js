document.addEventListener('DOMContentLoaded', function() {
    // Language selector functionality
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            console.log('Language changed to:', selectedLanguage);
            // Here you would implement actual language switching logic
        });
    }

    // Smooth scrolling for anchor links
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

    // Add scroll effect to navigation
    let lastScrollTop = 0;
    const navigation = document.querySelector('.navigation');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navigation.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navigation.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add transition to navigation
    navigation.style.transition = 'transform 0.3s ease-in-out';

    // Social media links functionality
    document.querySelectorAll('.social-icon, .social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('facebook') ? 'Facebook' : 'Instagram';
            console.log(`Opening ${platform} page`);
            // Here you would implement actual social media navigation
        });
    });

    // Contact info click handlers
    document.querySelectorAll('.info-item').forEach(item => {
        const span = item.querySelector('span');
        if (span) {
            const text = span.textContent.trim();
            
            // Phone number handler
            if (text.includes('(470)')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    window.location.href = `tel:${text.replace(/\D/g, '')}`;
                });
            }
            
            // Email handler
            if (text.includes('@')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', function() {
                    window.location.href = `mailto:${text}`;
                });
            }
        }
    });

    // Add hover effects to privacy sections
    document.querySelectorAll('.privacy-section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add reading progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ff0000ff, #cc0000ff);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Footer navigation active state
    const currentPage = window.location.pathname;
    document.querySelectorAll('.footer-nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage.includes('privacy') && link.textContent.includes('PRIVACY'))) {
            link.classList.add('active');
        }
    });

    // Add fade-in animation for privacy content
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.privacy-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    console.log('Atlanta\'s Premier Autos Privacy Policy page loaded successfully');
});