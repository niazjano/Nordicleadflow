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

// Google Apps Script Web App integration
async function sendToGoogleSheet(data) {
  const webAppUrl = "https://script.google.com/macros/s/AKfycbw66Pd46FmoBow3UKzEPPcIOxx2yUvr9xfKsc5-l5sNjGafGAywDSFw6pCsIdMABF5X/exec";
  
  // Debug: Log what we're sending
  console.log('Sending data to Google Apps Script:', data);
  console.log('Data as URLSearchParams:', new URLSearchParams(data).toString());
  
  const response = await fetch(webAppUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  });

  const result = await response.text();
  console.log("Google Sheet Response:", result);
  return result;
}

// Header scroll effect
const header = document.querySelector('.header');
const logo = document.querySelector('.logo img');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        logo.style.height = '30px';
    } else {
        header.style.padding = '1rem 0';
        logo.style.height = '40px';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for fade-in
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle (to be implemented when needed)
// const mobileMenuButton = document.createElement('button');
// mobileMenuButton.classList.add('mobile-menu-button');
// mobileMenuButton.innerHTML = '☰';
// document.querySelector('.nav-container').appendChild(mobileMenuButton);

// mobileMenuButton.addEventListener('click', () => {
//     document.querySelector('.nav-links').classList.toggle('active');
// });

// Sticky CTA button visibility
const stickyCta = document.querySelector('.sticky-cta');
let lastScrollTop = 0;

if (stickyCta) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show sticky CTA when scrolling down and hide when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            stickyCta.style.display = 'block';
        } else {
            stickyCta.style.display = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add smooth scroll to sticky CTA
    const ctaButton = stickyCta.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector('#calendar');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Lead Form Functionality - COMMENTED OUT (Now using HubSpot form)
// const leadForm = document.getElementById('leadForm');
// const otherServicesCheckbox = document.getElementById('otherServices');
// const otherServicesText = document.getElementById('otherServicesText');

/* COMMENTED OUT - Now using HubSpot form
// Show/hide "Other" text input based on checkbox
if (otherServicesCheckbox && otherServicesText) {
    otherServicesCheckbox.addEventListener('change', function() {
        otherServicesText.style.display = this.checked ? 'block' : 'none';
        if (this.checked) {
            otherServicesText.required = true;
        } else {
            otherServicesText.required = false;
            otherServicesText.value = '';
        }
    });
    
    // Initially hide the text input
    otherServicesText.style.display = 'none';
}

// Form validation and submission
if (leadForm) {
    leadForm.addEventListener('submit', async function(e) {
        console.log('Form submission started');
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = leadForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e53e3e';
                field.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
            } else {
                field.style.borderColor = '#e2e8f0';
                field.style.boxShadow = 'none';
            }
        });
        
        // Check if at least one service is selected
        const serviceCheckboxes = leadForm.querySelectorAll('input[name="services[]"]');
        const checkedServices = Array.from(serviceCheckboxes).filter(cb => cb.checked);
        
        if (checkedServices.length === 0) {
            isValid = false;
            const checkboxGroup = document.querySelector('.checkbox-group');
            if (checkboxGroup) {
                checkboxGroup.style.border = '2px solid #e53e3e';
                checkboxGroup.style.borderRadius = '8px';
                checkboxGroup.style.padding = '0.5rem';
            }
        } else {
            const checkboxGroup = document.querySelector('.checkbox-group');
            if (checkboxGroup) {
                checkboxGroup.style.border = 'none';
                checkboxGroup.style.padding = '0';
            }
        }
        
        // Email validation
        const emailField = document.getElementById('emailAddress');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField && !emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = '#e53e3e';
            emailField.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
        }
        
        // Phone validation (basic)
        const phoneField = document.getElementById('phoneNumber');
        if (phoneField && phoneField.value.length < 8) {
            isValid = false;
            phoneField.style.borderColor = '#e53e3e';
            phoneField.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
        }
        
        if (!isValid) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Check reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showNotification('Please complete the reCAPTCHA verification.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = leadForm.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = `
            <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Sending...
        `;
        submitButton.disabled = true;
        
        // Prepare form data for Google Apps Script
        const formData = {
            fullName: document.getElementById('fullName').value,
            businessName: document.getElementById('businessName').value,
            businessWebsite: document.getElementById('businessWebsite').value || '',
            phoneNumber: document.getElementById('phoneNumber').value,
            emailAddress: document.getElementById('emailAddress').value,
            serviceArea: document.getElementById('serviceArea').value,
            services: checkedServices.map(cb => cb.value).join(', '),
            marketingChallenge: document.getElementById('marketingChallenge').value,
            leadsPerMonth: document.getElementById('leadsPerMonth').value,
            monthlyBudget: document.getElementById('monthlyBudget').value,
            startTimeline: document.getElementById('startTimeline').value,
            additionalInfo: document.getElementById('additionalInfo').value || '',
            contactConsent: document.getElementById('contactConsent').checked ? 'Yes' : 'No'
        };

        try {
            console.log('Sending data to Google Sheets:', formData);
            
            // Send data to Google Sheets via Apps Script Web App
            const result = await sendToGoogleSheet(formData);
            console.log('Google Sheet Response:', result);
            
            // ✅ Show a success message and clear the form
            leadForm.reset();
            grecaptcha.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Replace form content with success message
            const formContainer = leadForm.parentElement;
            console.log('Replacing form with success message');
            formContainer.innerHTML = `
                <div class="success-message" style="text-align: center; padding: 2rem;">
                    <div style="color: #48bb78; font-size: 3rem; margin-bottom: 1rem;">✓</div>
                    <h3 style="color: #48bb78; font-size: 1.5rem; margin-bottom: 1rem;">Thank you!</h3>
                    <p style="color: #48bb78; font-size: 1.125rem;">We'll be in touch soon.</p>
                </div>
            `;
            
            // Scroll to show success message
            formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (error) {
            console.error('Error:', error);
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show error message
            showNotification('There was an error sending your information. Please try again.', 'error');
        }
    });
}
*/ // END COMMENTED OUT FORM FUNCTIONALITY

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' : 
                  type === 'error' ? '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>' :
                  '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#e53e3e' : '#3182ce'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .notification-content svg {
            flex-shrink: 0;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add form field focus effects - COMMENTED OUT (Now using HubSpot form)
// document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
//     field.addEventListener('focus', function() {
//         this.parentElement.style.transform = 'translateY(-2px)';
//     });
//     
//     field.addEventListener('blur', function() {
//         this.parentElement.style.transform = 'translateY(0)';
//     });
// });

// Add smooth scroll to form from navigation
document.querySelectorAll('a[href="#lead-form"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#lead-form');
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Test function for Google Sheets integration
// You can test it by running this in the browser console:
// testGoogleSheetsIntegration()
function testGoogleSheetsIntegration() {
    const testData = {
        name: "John Doe",
        email: "john@example.com"
    };
    
    console.log('Testing Google Sheets integration with:', testData);
    sendToGoogleSheet(testData)
        .then(result => {
            console.log('Test successful:', result);
            alert('Google Sheets integration test successful! Check console for details.');
        })
        .catch(error => {
            console.error('Test failed:', error);
            alert('Google Sheets integration test failed. Check console for details.');
        });
}

