// ===== Dynamic Campaign (Home) =====
const campaign = {
    title: "Typhoon Relief Drive",
    raised: 35000,
    goal: 50000
};

const campaignDiv = document.getElementById("dynamicCampaign");
if (campaignDiv) {
    campaignDiv.innerHTML = `
        <h3>${campaign.title}</h3>
        <p>Raised: ₱${campaign.raised.toLocaleString()} / ₱${campaign.goal.toLocaleString()}</p>
        <progress value="${campaign.raised}" max="${campaign.goal}"></progress>
    `;
}

// ===== Modal =====
function openModal() {
    document.getElementById("modal").style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ===== Accordion =====
function toggleAccordion(el) {
    const panel = el.nextElementSibling;
    if (panel && panel.classList.contains("panel")) {
        const isOpen = panel.style.display === "block";
        panel.style.display = isOpen ? "none" : "block";
        el.classList.toggle("active");
    }
}

// ===== Events + Filter =====
const events = [
    "Medical Mission - March 10",
    "Blood Donation Drive - April 5",
    "Disaster Preparedness Seminar - May 12",
    "Community Health Check - June 8"
];

const eventList = document.getElementById("eventList");

if (eventList) {
    displayEvents(events);
}

function displayEvents(list) {
    eventList.innerHTML = "";
    
    const eventCount = document.getElementById("eventCount");
    if (eventCount) {
        eventCount.textContent = list.length;
    }
    
    if (list.length === 0) {
        eventList.innerHTML = "<li>No events found</li>";
        return;
    }
    list.forEach(ev => {
        const li = document.createElement("li");
        li.textContent = ev;
        eventList.appendChild(li);
    });
}

function filterEvents() {
    const search = document
        .getElementById("searchEvent")
        .value.toLowerCase();
    const filtered = events.filter(e =>
        e.toLowerCase().includes(search)
    );
    displayEvents(filtered);
}

// ===== Enhanced Email Validation =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Enhanced Phone Validation =====
function isValidPhone(phone) {
    if (!phone || phone === '') return true;
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// ===== Volunteer Form + LocalStorage (Enhanced) =====
const form = document.getElementById("volunteerForm");
const msg = document.getElementById("msg");

if (form && !form.hasAttribute('data-local-only')) {
    // Only attach this handler if the form is NOT the enhanced volunteer form
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : "";
        const interests = document.getElementById("interests") ? document.getElementById("interests").value : "";

        if (name === "" || email === "") {
            showMessage(msg, "Please fill in all required fields.", "error");
        } else if (!isValidEmail(email)) {
            showMessage(msg, "Please enter a valid email address.", "error");
        } else if (phone && !isValidPhone(phone)) {
            showMessage(msg, "Please enter a valid phone number.", "error");
        } else {
            const volunteerData = {
                name: name,
                email: email,
                phone: phone,
                interests: interests,
                registrationDate: new Date().toISOString()
            };
            
            localStorage.setItem("volunteerData", JSON.stringify(volunteerData));
            
            showMessage(msg, "Registration successful! We'll contact you soon.", "success");
            form.reset();
        }
    });
}

// ===== Unified Message Display Function =====
function showMessage(element, message, type = "success") {
    if (!element) return;
    
    if (type === "error") {
        element.style.color = "#721c24";
        element.style.background = "#f8d7da";
        element.style.border = "2px solid #f5c6cb";
    } else if (type === "success") {
        element.style.color = "#155724";
        element.style.background = "#d4edda";
        element.style.border = "2px solid #c3e6cb";
    } else if (type === "info") {
        element.style.color = "#004085";
        element.style.background = "#cce5ff";
        element.style.border = "2px solid #b8daff";
    }
    
    element.style.padding = "15px 20px";
    element.style.borderRadius = "12px";
    element.style.marginTop = "20px";
    element.textContent = message;
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 8000);
    
    element.style.display = 'block';
}

// ===== Contact Form Handler =====
const contactForm = document.getElementById("contactForm");
const contactMsg = document.getElementById("contactMsg");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const phone = document.getElementById("contactPhone") ? document.getElementById("contactPhone").value.trim() : "";
        const subject = document.getElementById("contactSubject").value;
        const message = document.getElementById("contactMessage").value.trim();

        if (name === "" || email === "" || subject === "" || message === "") {
            showMessage(contactMsg, "Please fill in all required fields.", "error");
        } else if (!isValidEmail(email)) {
            showMessage(contactMsg, "Please enter a valid email address.", "error");
        } else if (phone && !isValidPhone(phone)) {
            showMessage(contactMsg, "Please enter a valid phone number.", "error");
        } else {
            const contactData = {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
                submittedAt: new Date().toISOString()
            };
            
            let contacts = JSON.parse(localStorage.getItem("contactSubmissions")) || [];
            contacts.push(contactData);
            localStorage.setItem("contactSubmissions", JSON.stringify(contacts));
            
            showMessage(contactMsg, "Thank you for your message! We'll get back to you within 24 hours.", "success");
            contactForm.reset();
            
            contactMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// ===== About Page - Dynamic Statistics Counter =====
const stats = [
    { id: "livesImpacted", target: 10000, suffix: "+" },
    { id: "volunteers", target: 500, suffix: "+" },
    { id: "operations", target: 50, suffix: "+" },
    { id: "yearsService", target: 15, suffix: "" }
];

window.addEventListener("DOMContentLoaded", function() {
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateCounter(element, stat.target, stat.suffix);
        }
    });
});

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, stepTime);
}

// ===== Active Page Indicator in Navigation =====
document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav .links a");
    
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.style.fontWeight = "700";
            link.style.color = "#e38282";
            link.style.borderBottom = "3px solid #c62828";
        }
    });
});

// ===== Smooth Scroll for Internal Links =====
document.addEventListener("DOMContentLoaded", function() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== Footer Social Links Tracking =====
document.addEventListener("DOMContentLoaded", function() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.getAttribute('title') || 'Unknown';
            console.log(`Social link clicked: ${platform}`);
        });
    });
});

// ===== Back to Top Button =====
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('backToTop');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
            scrollButton.style.opacity = '1';
        } else {
            scrollButton.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollButton.style.display = 'none';
                }
            }, 300);
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== Form Input Animations =====
document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (this.parentElement) {
                this.parentElement.classList.add('input-focused');
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.parentElement) {
                this.parentElement.classList.remove('input-focused');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
        
        if (input.value.trim() !== '') {
            input.classList.add('filled');
        }
    });
});

// ===== Emergency Hotline Click Tracking =====
document.addEventListener("DOMContentLoaded", function() {
    const emergencyLinks = document.querySelectorAll('a[href^="tel:"]');
    
    emergencyLinks.forEach(link => {
        link.addEventListener('click', function() {
            const number = this.getAttribute('href').replace('tel:', '');
            console.log('Emergency hotline clicked:', number);
        });
    });
});

// ===== localStorage Data Management =====
function clearVolunteerData() {
    if (confirm('⚠️ Are you sure you want to clear your volunteer registration data?')) {
        localStorage.removeItem('volunteerData');
        localStorage.removeItem('lastVolunteerRegistration');
        localStorage.removeItem('allVolunteerRegistrations');
        alert('✅ All volunteer data cleared successfully!');
        location.reload();
    }
}

function clearContactData() {
    if (confirm('⚠️ Are you sure you want to clear all contact submissions?')) {
        localStorage.removeItem('contactSubmissions');
        alert('✅ Contact data cleared successfully!');
        location.reload();
    }
}

function clearAllData() {
    if (confirm('⚠️ WARNING: This will clear ALL saved data including volunteer registrations, contact submissions, and form progress. This cannot be undone. Continue?')) {
        localStorage.clear();
        sessionStorage.clear();
        alert('✅ All data cleared successfully!');
        location.reload();
    }
}

// ===== Display Saved Data =====
function displaySavedVolunteerData() {
    const data = localStorage.getItem('volunteerData');
    const allData = localStorage.getItem('allVolunteerRegistrations');
    
    console.log('=== VOLUNTEER DATA ===');
    if (data) {
        console.log('Last Registration:', JSON.parse(data));
    } else {
        console.log('No last registration found');
    }
    
    if (allData) {
        const registrations = JSON.parse(allData);
        console.log(`Total Registrations: ${registrations.length}`);
        console.log('All Registrations:', registrations);
    } else {
        console.log('No registrations found');
    }
}

function displaySavedContactData() {
    const data = localStorage.getItem('contactSubmissions');
    
    console.log('=== CONTACT SUBMISSIONS ===');
    if (data) {
        const submissions = JSON.parse(data);
        console.log(`Total Submissions: ${submissions.length}`);
        console.log('All Submissions:', submissions);
    } else {
        console.log('No contact submissions found');
    }
}

function displayAllLocalStorageData() {
    console.log('=== ALL LOCALSTORAGE DATA ===');
    console.log('Total items:', localStorage.length);
    
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`${key}:`, value);
    }
}

// ===== Export All Data =====
function exportAllData() {
    const allData = {
        volunteerData: localStorage.getItem('volunteerData'),
        allVolunteerRegistrations: localStorage.getItem('allVolunteerRegistrations'),
        contactSubmissions: localStorage.getItem('contactSubmissions'),
        exportDate: new Date().toISOString()
    };
    
    const jsonContent = JSON.stringify(allData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split('T')[0];
    
    link.setAttribute('href', url);
    link.setAttribute('download', `humancare_data_backup_${timestamp}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('✅ All data exported successfully!');
}

// ===== Print Functionality =====
function printContactInfo() {
    window.print();
}

// ===== Copy Email to Clipboard =====
function copyEmailToClipboard(email) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function() {
            const notification = document.createElement('div');
            notification.textContent = '✅ Email copied to clipboard!';
            notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#4caf50;color:white;padding:15px 25px;border-radius:8px;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.2);font-weight:600;';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy email:', err);
            alert('Email: ' + email);
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.cssText = 'position:fixed;left:-9999px;';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            alert('✅ Email copied: ' + email);
        } catch (err) {
            console.error('Failed to copy email:', err);
            alert('Email: ' + email);
        }
        
        document.body.removeChild(textArea);
    }
}

// ===== Copy Text to Clipboard (Generic) =====
function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification(successMessage, 'success');
        }).catch(function(err) {
            console.error('Failed to copy:', err);
            showNotification('Failed to copy', 'error');
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.cssText = 'position:fixed;left:-9999px;';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification(successMessage, 'success');
        } catch (err) {
            console.error('Failed to copy:', err);
            showNotification('Failed to copy', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// ===== Show Notification =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = 'position:fixed;top:20px;right:20px;padding:15px 25px;border-radius:8px;z-index:10000;box-shadow:0 4px 12px rgba(0,0,0,0.2);font-weight:600;transition:all 0.3s ease;';
    
    if (type === 'success') {
        notification.style.background = '#4caf50';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.background = '#f44336';
        notification.style.color = 'white';
    } else if (type === 'info') {
        notification.style.background = '#2196f3';
        notification.style.color = 'white';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== Page Load Performance Tracking =====
window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// ===== Offline Detection =====
window.addEventListener('online', function() {
    showNotification('✅ You are back online!', 'success');
});

window.addEventListener('offline', function() {
    showNotification('⚠️ You are offline. Some features may not work.', 'error');
});

// ===== Console Welcome Message =====
console.log('%c🏥 HumanCare NGO', 'font-size: 24px; font-weight: bold; color: #c62828;');
console.log('%cThank you for visiting our website!', 'font-size: 14px; color: #555;');
console.log('%cTo view saved data, use:', 'font-size: 12px; color: #777;');
console.log('%cdisplaySavedVolunteerData() or displaySavedContactData()', 'font-size: 12px; color: #2196f3; font-family: monospace;');
console.log('%cTo export all data:', 'font-size: 12px; color: #777;');
console.log('%cexportAllData()', 'font-size: 12px; color: #2196f3; font-family: monospace;');

// ===== Debug Mode Toggle =====
let debugMode = false;

function toggleDebugMode() {
    debugMode = !debugMode;
    console.log(`Debug mode: ${debugMode ? 'ON' : 'OFF'}`);
    
    if (debugMode) {
        displayAllLocalStorageData();
    }
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleDebugMode();
    }
});