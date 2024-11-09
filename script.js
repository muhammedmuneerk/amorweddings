document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });



    // Portfolio filtering and gallery //
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryImage = document.getElementById('gallery-image');
    const imageCaption = document.querySelector('.image-caption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    let portfolioItems = [];

    // Fetch portfolio items (replace with your actual data)
    const fetchPortfolioItems = async () => {
        // Simulated API call
        return [
            { src: 'images/armorig-1.jpg', alt: 'Elegant Lace Gown', category: 'suits', caption: 'A timeless suits masterpiece' },
            { src: 'images/armorig-2.jpg', alt: 'Classic Tuxedo', category: 'suits', caption: 'Sophisticated style for the modern suits' },
            { src: 'images/armorig-3.jpg', alt: 'Romantic A-line Dress', category: 'suits', caption: 'Ethereal beauty for your special day' },
            { src: 'images/armorig-4.jpg', alt: 'Wedding Accessories', category: 'suits', caption: 'The perfect finishing touches' },
            { src: 'images/WhatsApp Image 2024-11-07 at 18.02.06_d7e791d8.jpg', alt: 'Modern Minimalist Gown', category: 'suits', caption: 'Sleek and sophisticated suits style' },
            { src: 'images/WhatsApp Image 2024-11-07 at 18.02.07_e4f03702.jpg', alt: 'Contemporary Suit', category: 'suits', caption: 'Bold and stylish for the fashion-forward suits' },
            { src: 'images/Arabic khammees design by Amor wedding collection for men.jpg', alt: 'Arabic khammees', category: 'traditionalwear', caption: 'Arabic khammees emirates dubai oman arabic' },
            { src: 'images/Arabic khammees design by Amor wedding collection for men.jpg', alt: 'Arabic khammees', category: 'traditionalwear', caption: 'Arabic khammees emirates dubai oman arabic' },
            { src: 'images/Arabic khammees design by Amor wedding collection for men.jpg', alt: 'Arabic khammees', category: 'traditionalwear', caption: 'Arabic khammees emirates dubai oman arabic' },
        ];
    };

    const renderPortfolioItems = (items) => {
        portfolioGrid.innerHTML = items.map((item, index) => `
            <div class="portfolio-item" data-category="${item.category}" data-index="${portfolioItems.indexOf(item)}">
                <img src="${item.src}" alt="${item.alt}" class="portfolio-img">
                <div class="portfolio-overlay">
                    <h3>${item.alt}</h3>
                    <p>${item.caption}</p>
                </div>
            </div>
        `).join('');

        // Add click event listeners to portfolio items
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', openGallery);
        });
    };

    

    const openGallery = (e) => {
        const clickedItem = e.currentTarget;
        currentIndex = parseInt(clickedItem.dataset.index);
        updateGalleryImage();
        galleryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeGallery = () => {
        galleryModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    };

    const updateGalleryImage = () => {
        const item = portfolioItems[currentIndex];
        galleryImage.src = item.src;
        galleryImage.alt = item.alt;
        imageCaption.textContent = item.caption;
    };

    const navigateGallery = (direction) => {
        currentIndex = (currentIndex + direction + portfolioItems.length) % portfolioItems.length;
        updateGalleryImage();
    };

    // Event listeners
    closeModal.addEventListener('click', closeGallery);
    prevBtn.addEventListener('click', () => navigateGallery(-1));
    nextBtn.addEventListener('click', () => navigateGallery(1));

    // Swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    galleryModal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    galleryModal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        if (touchEndX < touchStartX) navigateGallery(1); // Swipe left
        if (touchEndX > touchStartX) navigateGallery(-1); // Swipe right
    };

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filteredItems = filter === 'all' 
                ? portfolioItems 
                : portfolioItems.filter(item => item.category === filter);
            renderPortfolioItems(filteredItems);
        });
    });

    // Initialize gallery
    (async () => {
        portfolioItems = await fetchPortfolioItems();
        renderPortfolioItems(portfolioItems);
    })();

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }

    prevButton.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    nextButton.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    // Show first testimonial initially
    showTestimonial(currentTestimonial);

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formGroups = document.querySelectorAll('.form-group');

    // Add animation to form inputs
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        input.addEventListener('focus', () => {
            label.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                label.classList.remove('active');
            }
        });
    });

    // Form submission with validation and AJAX
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic form validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (!name.value || !email.value || !message.value) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission with a delay
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');

        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        try {
            // Simulate an API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success message
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();

            // Reset button state
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';

            // Reset labels
            formGroups.forEach(group => {
                const label = group.querySelector('label');
                label.classList.remove('active');
            });
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');

            // Reset button state
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
        }
    });

    // Newsletter Subscription (you may want to replace this with actual subscription logic)
    // const newsletterForm = document.getElementById('newsletter-form');
    // newsletterForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     alert('Thank you for subscribing to our newsletter!');
    //     newsletterForm.reset();
    // });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const loadImage = (image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = () => {
            image.removeAttribute('data-src');
            image.classList.add('fade-in');
        };
    };

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        lazyImages.forEach(img => loadImage(img));
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    const headerScrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerScrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Footer year update
    const currentYear = new Date().getFullYear();
    document.querySelector('.footer-bottom p').innerHTML = `© ${currentYear} Amor Weddings. All rights reserved. Created by MMK.`;
});