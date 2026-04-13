/* ===================================================================
   main.js — LedSignPT Homepage
=================================================================== */

'use strict';

// ── Navbar scroll effect ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

// ── Hamburger menu ────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ── Hero Auto-Slider ──────────────────────────────────────────────
const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
const dots = Array.from(document.querySelectorAll('.slider-dots .dot'));
let currentSlide = 0;
let sliderTimer = null;

if (slides.length > 0) {
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function startSlider() {
        sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    function resetSlider() {
        clearInterval(sliderTimer);
        startSlider();
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
            resetSlider();
        });
    });

    startSlider();
}

// ── Scroll Reveal (fade-up) ───────────────────────────────────────
const fadeEls = document.querySelectorAll(
    '.vantagem-card, .produto-card, .step-card, .testimonial-card, .sobre-stat, .section-header'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Staggered delay based on element position in its grid
            const siblings = Array.from(entry.target.parentElement.children);
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

fadeEls.forEach(el => revealObserver.observe(el));

// ── Smooth anchor scrolling offset (navbar height) ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});
