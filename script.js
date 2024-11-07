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

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

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