document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const submitBtn = document.querySelector('.submit-btn');
    const acceptTerms = document.getElementById('acceptTerms');

    // Character counter for message textarea
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 1024;
            const remaining = maxLength - currentLength;
            
            charCount.textContent = remaining;
            
            if (remaining < 50) {
                charCount.style.color = '#ff4444';
            } else if (remaining < 100) {
                charCount.style.color = '#ffaa00';
            } else {
                charCount.style.color = '#999';
            }
        });
    }

    // Form validation
    function validateForm() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const termsAccepted = document.getElementById('acceptTerms').checked;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

        let isValid = true;
        let errors = [];

        if (!firstName) {
            errors.push('First Name is required');
            isValid = false;
        }

        if (!lastName) {
            errors.push('Last Name is required');
            isValid = false;
        }

        if (!phone) {
            errors.push('Phone Number is required');
            isValid = false;
        } else if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ''))) {
            errors.push('Please enter a valid phone number');
            isValid = false;
        }

        if (!email) {
            errors.push('Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }

        if (!message) {
            errors.push('Message is required');
            isValid = false;
        }

        if (!termsAccepted) {
            errors.push('You must accept the terms and conditions');
            isValid = false;
        }

        return { isValid, errors };
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const validation = validateForm();

            if (!validation.isValid) {
                alert('Please correct the following errors:\n\n' + validation.errors.join('\n'));
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset form
                contactForm.reset();
                charCount.textContent = '1024';
                charCount.style.color = '#999';
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';
            }, 2000);
        });
    }

    // Contact preference checkboxes
    const contactPrefCheckboxes = document.querySelectorAll('input[name="contactPref"]');
    contactPrefCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Ensure at least one contact preference is selected
            const checkedBoxes = document.querySelectorAll('input[name="contactPref"]:checked');
            if (checkedBoxes.length === 0) {
                this.checked = true;
            }
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
            }
            this.value = value;
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Language selector functionality
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('click', function() {
            // Simulate language selection dropdown
            const languages = ['English', 'Español', 'Français'];
            const currentLang = 'English';
            
            // This would typically open a dropdown menu
            console.log('Language selector clicked');
        });
    }

    // Social media links
    const socialLinks = document.querySelectorAll('.social-icon, .footer-social-icon');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').classList.contains('fa-facebook-f') ? 'Facebook' : 'Instagram';
            console.log(`Opening ${platform} page`);
            // In a real implementation, these would link to actual social media pages
        });
    });

    // Form field focus effects
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim() !== '') {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });

    // Terms and conditions checkbox validation
    if (acceptTerms) {
        acceptTerms.addEventListener('change', function() {
            if (this.checked) {
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            } else {
                submitBtn.style.opacity = '0.7';
                submitBtn.style.cursor = 'not-allowed';
            }
        });
    }

    // Initialize form state
    if (submitBtn && acceptTerms) {
        submitBtn.style.opacity = acceptTerms.checked ? '1' : '0.7';
        submitBtn.style.cursor = acceptTerms.checked ? 'pointer' : 'not-allowed';
    }
});

// Utility functions
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#39ff14' : type === 'error' ? '#ff4444' : '#333'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-weight: 500;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}