// Form validation and interaction
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('creditForm');
    const submitButton = document.querySelector('.submit-button');
    const ssnInput = document.getElementById('ssn');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    // SSN formatting
    ssnInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 3) {
            value = value.substring(0, 3) + '-' + value.substring(3);
        }
        if (value.length >= 6) {
            value = value.substring(0, 6) + '-' + value.substring(6, 10);
        }
        e.target.value = value;
    });
    
    // Phone number formatting
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 3) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
            }
            if (value.length >= 9) {
                value = value.substring(0, 9) + '-' + value.substring(9, 13);
            }
            e.target.value = value;
        });
    });
    
    // Add Previous Address functionality
    const addPreviousCheckbox = document.getElementById('addPrevious');
    addPreviousCheckbox.addEventListener('change', function() {
        if (this.checked) {
            addPreviousAddressFields();
        } else {
            removePreviousAddressFields();
        }
    });
    
    // Add Previous Employment functionality
    const addPrevEmploymentCheckbox = document.getElementById('addPrevEmployment');
    addPrevEmploymentCheckbox.addEventListener('change', function() {
        if (this.checked) {
            addPreviousEmploymentFields();
        } else {
            removePreviousEmploymentFields();
        }
    });
    
    // Add Reference functionality
    const addReferenceCheckbox = document.getElementById('addReference');
    addReferenceCheckbox.addEventListener('change', function() {
        if (this.checked) {
            addReferenceFields();
        } else {
            removeReferenceFields();
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitButton.classList.add('loading');
            submitButton.textContent = 'SUBMITTING...';
            
            // Simulate form submission
            setTimeout(() => {
                alert('¡Aplicación enviada exitosamente! Nos pondremos en contacto contigo pronto.');
                submitButton.classList.remove('loading');
                submitButton.textContent = 'SUBMIT';
                form.reset();
            }, 2000);
        }
    });
    
    // Form validation
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ff4444';
                isValid = false;
            } else {
                field.style.borderColor = '#00ff00';
            }
        });
        
        // Validate SSN format
        const ssnValue = ssnInput.value;
        if (ssnValue && !/^\d{3}-\d{2}-\d{4}$/.test(ssnValue)) {
            ssnInput.style.borderColor = '#ff4444';
            isValid = false;
        }
        
        // Check terms agreement
        const agreeTerms = document.getElementById('agreeTerms');
        if (!agreeTerms.checked) {
            alert('Debes aceptar los términos y condiciones para continuar.');
            isValid = false;
        }
        
        if (!isValid) {
            alert('Por favor, completa todos los campos requeridos correctamente.');
        }
        
        return isValid;
    }
    
    // Add Previous Address Fields
    function addPreviousAddressFields() {
        const residentialSection = document.querySelector('.form-section-title:nth-of-type(2)').parentNode;
        const addPrevCheckbox = document.getElementById('addPrevious').parentNode;
        
        const prevAddressHTML = `
            <div class="previous-address-fields">
                <div class="form-section-title">Previous Address</div>
                <div class="form-row">
                    <div class="form-group full-width">
                        <label for="prevAddress">Previous Address</label>
                        <input type="text" id="prevAddress" name="prevAddress">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="prevCity">City</label>
                        <input type="text" id="prevCity" name="prevCity">
                    </div>
                    <div class="form-group">
                        <label for="prevState">State</label>
                        <select id="prevState" name="prevState">
                            <option value="">Select State</option>
                            <option value="GA">Georgia</option>
                            <option value="AL">Alabama</option>
                            <option value="FL">Florida</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="prevZipCode">Zip Code</label>
                        <input type="text" id="prevZipCode" name="prevZipCode">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="prevYearsAtAddress">Years at Previous Address</label>
                        <input type="number" id="prevYearsAtAddress" name="prevYearsAtAddress">
                    </div>
                </div>
            </div>
        `;
        
        addPrevCheckbox.insertAdjacentHTML('beforebegin', prevAddressHTML);
    }
    
    function removePreviousAddressFields() {
        const prevAddressFields = document.querySelector('.previous-address-fields');
        if (prevAddressFields) {
            prevAddressFields.remove();
        }
    }
    
    // Add Previous Employment Fields
    function addPreviousEmploymentFields() {
        const employmentSection = document.querySelector('.form-section-title:nth-of-type(3)').parentNode;
        const addPrevEmpCheckbox = document.getElementById('addPrevEmployment').parentNode;
        
        const prevEmploymentHTML = `
            <div class="previous-employment-fields">
                <div class="form-section-title">Previous Employment</div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="prevEmployer">Previous Employer</label>
                        <input type="text" id="prevEmployer" name="prevEmployer">
                    </div>
                    <div class="form-group">
                        <label for="prevJobTitle">Previous Job Position</label>
                        <input type="text" id="prevJobTitle" name="prevJobTitle">
                    </div>
                    <div class="form-group">
                        <label for="prevEmployerPhone">Previous Employer Phone</label>
                        <input type="tel" id="prevEmployerPhone" name="prevEmployerPhone">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="prevMonthlyIncome">Previous Monthly Income</label>
                        <input type="number" id="prevMonthlyIncome" name="prevMonthlyIncome">
                    </div>
                    <div class="form-group">
                        <label for="prevYearsEmployed">Years at Previous Job</label>
                        <input type="number" id="prevYearsEmployed" name="prevYearsEmployed">
                    </div>
                </div>
            </div>
        `;
        
        addPrevEmpCheckbox.insertAdjacentHTML('beforebegin', prevEmploymentHTML);
    }
    
    function removePreviousEmploymentFields() {
        const prevEmploymentFields = document.querySelector('.previous-employment-fields');
        if (prevEmploymentFields) {
            prevEmploymentFields.remove();
        }
    }
    
    // Add Reference Fields
    function addReferenceFields() {
        const referencesSection = document.querySelector('.form-section-title:nth-of-type(4)').parentNode;
        const addRefCheckbox = document.getElementById('addReference').parentNode;
        
        const additionalRefHTML = `
            <div class="additional-reference-fields">
                <div class="form-row">
                    <div class="form-group">
                        <label for="refName3">Name</label>
                        <input type="text" id="refName3" name="refName3">
                    </div>
                    <div class="form-group">
                        <label for="refRelation3">Relation</label>
                        <input type="text" id="refRelation3" name="refRelation3">
                    </div>
                    <div class="form-group">
                        <label for="refPhone3">Phone</label>
                        <input type="tel" id="refPhone3" name="refPhone3">
                    </div>
                </div>
            </div>
        `;
        
        addRefCheckbox.insertAdjacentHTML('beforebegin', additionalRefHTML);
        
        // Apply phone formatting to new phone input
        const newPhoneInput = document.getElementById('refPhone3');
        newPhoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 3) {
                value = '(' + value.substring(0, 3) + ') ' + value.substring(3);
            }
            if (value.length >= 9) {
                value = value.substring(0, 9) + '-' + value.substring(9, 13);
            }
            e.target.value = value;
        });
    }
    
    function removeReferenceFields() {
        const additionalRefFields = document.querySelector('.additional-reference-fields');
        if (additionalRefFields) {
            additionalRefFields.remove();
        }
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Chat button functionality
    const chatButton = document.querySelector('.chat-button');
    chatButton.addEventListener('click', function() {
        alert('¡Función de chat próximamente disponible! Por favor llama al (404) 474-7433 para asistencia inmediata.');
    });
    
    // Real-time form validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff4444';
            } else if (this.value.trim()) {
                this.style.borderColor = '#00ff00';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#00ff00';
        });
    });
});

// Console log for debugging
console.log('[v0] Atlanta\'s Premier Autos Apply Online page loaded successfully');