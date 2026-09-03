document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // Mobile Navigation Toggle
    // ----------------------------------------
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ----------------------------------------
    // Scroll Reveal Animation
    // ----------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to reveal on scroll
    const revealElements = document.querySelectorAll(
        '.project-card, .skill-category, .about-content p, .experience-card, .education-card, .gallery-item, .why-content p'
    );

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS class for visible state
    const style = document.createElement('style');
    style.innerHTML = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    // ----------------------------------------
    // Gallery Lightbox
    // ----------------------------------------
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentIndex = 0;

    // Collect gallery data
    const galleryData = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        caption: item.getAttribute('data-caption') || ''
    }));

    // Open lightbox
    function openLightbox(index) {
        if (galleryData.length === 0) return;
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Update lightbox content based on current index
    function updateLightboxContent() {
        lightboxImg.src = galleryData[currentIndex].src;
        lightboxImg.alt = galleryData[currentIndex].caption;
        lightboxCaption.textContent = galleryData[currentIndex].caption;
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateLightboxContent();
    }

    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateLightboxContent();
    }

    // Event listeners for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // Event listeners for lightbox controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });

    // ----------------------------------------
    // Smooth scroll offset for fixed navbar
    // ----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('header')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});