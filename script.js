// Initialize Lucide icons
lucide.createIcons();

// --- PRELOADER LOGIC ---
const preloader = document.getElementById('preloader');
const mainContent = document.getElementById('main-content');
const skipButton = document.getElementById('skip-button');

const lines = [
    "It's Rehan.",
    "It's <span style='color: #ef4444'>not</span> Rehaaaaaaaaan.",
    "It's Rehan."
];

let animationComplete = false;

function playLine(text, duration) {
    return new Promise((resolve) => {
        const el = document.createElement('div');
        el.className = 'loader-text';
        el.innerHTML = text;
        preloader.appendChild(el);

        // Animate IN
        requestAnimationFrame(() => el.classList.add('text-enter'));

        // Wait, then Animate OUT
        setTimeout(() => {
            el.classList.remove('text-enter');
            el.classList.add('text-exit');

            // Cleanup after exit animation (Matches CSS 0.5s)
            setTimeout(() => {
                el.remove();
                resolve();
            }, 500);
        }, duration);
    });
}

function finishPreloader() {
    if (animationComplete) return;
    animationComplete = true;

    // Hide skip button
    if (skipButton) {
        skipButton.style.opacity = '0';
        setTimeout(() => skipButton.remove(), 300);
    }

    // Finish preloader
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);

    // Reveal Site
    mainContent.classList.add('visible');
    document.body.style.overflow = 'auto';
}

async function runSequence() {
    // CHANGED: Much shorter durations
    await playLine(lines[0], 600);   // Fast Intro
    await playLine(lines[1], 900);   // Just enough to read the joke
    await playLine(lines[2], 600);   // Fast confirm

    finishPreloader();
}

// Skip button handler
if (skipButton) {
    skipButton.addEventListener('click', () => {
        finishPreloader();
    });
}

// Start
runSequence();

// Clock
setInterval(() => {
    const now = new Date();
    const clock = document.getElementById('clock');
    if (clock) clock.innerText = now.toLocaleTimeString('en-US', { hour12: false });
}, 1000);

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Reinitialize Lucide icons in the mobile menu
    setTimeout(() => lucide.createIcons(), 100);
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking on nav links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        closeMobileMenu();
    }
});
