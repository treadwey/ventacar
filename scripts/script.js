// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    

    // Search form functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchSelects = document.querySelectorAll('.search-select');
    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get selected values
        const searchValues = {};
        searchSelects.forEach((select, index) => {
            const labels = ['make', 'model', 'minPrice', 'maxPrice'];
            searchValues[labels[index]] = select.value;
        });
        
        // Simulate search (in real implementation, this would make an API call)
        console.log('Searching with criteria:', searchValues);
        alert('Búsqueda realizada con los criterios seleccionados. En una implementación real, esto mostraría los resultados filtrados.');
    });

    // Vehicle card hover effects
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    vehicleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });

    // Inventory button functionality
    const inventoryBtn = document.querySelector('.inventory-btn');
    if (inventoryBtn) {
        inventoryBtn.addEventListener('click', function() {
            alert('Redirigiendo al inventario completo...');
            // In real implementation: window.location.href = '/inventory';
        });
    }

    // Loan application button functionality
    const loanBtn = document.querySelector('.loan-btn');
    if (loanBtn) {
        loanBtn.addEventListener('click', function() {
            alert('Redirigiendo a la aplicación de préstamo...');
            // In real implementation: window.location.href = '/loan-application';
        });
    }

    // Social media icons functionality
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            if (this.classList.contains('facebook')) {
                alert('Redirigiendo a Facebook...');
                // window.open('https://facebook.com/atlantaspremierautos', '_blank');
            } else if (this.classList.contains('twitter')) {
                alert('Redirigiendo a Twitter...');
                // window.open('https://twitter.com/atlantaspremier', '_blank');
            }
        });
        
        // Add hover effect
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.preowned-section, .about-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Phone number click functionality
    const phoneNumbers = document.querySelectorAll('.phone-number, .footer-section p');
    phoneNumbers.forEach(phone => {
        if (phone.textContent.includes('(470) 545-7778')) {
            phone.style.cursor = 'pointer';
            phone.addEventListener('click', function() {
                window.location.href = 'tel:+14705457778';
            });
        }
    });

    // Email click functionality
    const emailElements = document.querySelectorAll('.email');
    emailElements.forEach(email => {
        if (email.textContent.includes('info@atlantaspremierautos.com')) {
            email.style.cursor = 'pointer';
            email.addEventListener('click', function() {
                window.location.href = 'mailto:info@atlantaspremierautos.com';
            });
        }
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out';

    // Form validation for search
    function validateSearch() {
        const selects = document.querySelectorAll('.search-select');
        let hasSelection = false;
        
        selects.forEach(select => {
            if (select.value !== select.options[0].value) {
                hasSelection = true;
            }
        });
        
        return hasSelection;
    }

    // Update search button click handler with validation
    searchBtn.removeEventListener('click', searchBtn.onclick);
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!validateSearch()) {
            alert('Por favor selecciona al menos un criterio de búsqueda.');
            return;
        }
        
        const searchValues = {};
        searchSelects.forEach((select, index) => {
            const labels = ['make', 'model', 'minPrice', 'maxPrice'];
            if (select.value !== select.options[0].value) {
                searchValues[labels[index]] = select.value;
            }
        });
        
        console.log('Searching with criteria:', searchValues);
        alert(`Búsqueda realizada con los siguientes criterios: ${Object.entries(searchValues).map(([key, value]) => `${key}: ${value}`).join(', ')}`);
    });

    // Add loading animation to buttons
    function addLoadingAnimation(button) {
        const originalText = button.textContent;
        button.textContent = 'Cargando...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }

    // Apply loading animation to main buttons
    inventoryBtn?.addEventListener('click', function() {
        addLoadingAnimation(this);
    });

    loanBtn?.addEventListener('click', function() {
        addLoadingAnimation(this);
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
});

// Utility functions
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Console welcome message
console.log('%c¡Bienvenido a Atlanta\'s Premier Autos!', 'color: #7ED321; font-size: 20px; font-weight: bold;');
console.log('%cEste es un clon perfecto de la página web original.', 'color: #333; font-size: 14px;');