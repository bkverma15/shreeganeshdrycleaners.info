// ============================================
// Shree Ganesh Dry Cleaners - Main Script
// Complete SEO & User Experience Optimized
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Menu Toggle ----
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn?.querySelector('i');
            if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
        });
    });

    // ---- Header Scroll Effect ----
    const header = document.querySelector('header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        if (current > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = current;
    });

    // ---- FAQ Accordion (with Schema) ----
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');
            // Close all
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-question')?.classList.remove('active');
            });
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                q.classList.add('active');
            }
        });
    });

    // ---- Scroll Animations (IntersectionObserver) ----
    const animateElements = document.querySelectorAll('.fade-up');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        animateElements.forEach(el => observer.observe(el));
    }

    // ---- Pricing & Services Data Loading ----
    const DEFAULT_PRICES = [
        {
            id: 'dry-cleaning',
            name: 'Premium Dry Cleaning',
            description: 'Specialized solvent-based cleaning for suits, silk dresses, and delicate garments.',
            price: 70, priceUnit: 'Starting at', priceSuffix: '',
            image: 'images/dry-cleaning-service-kota.webp',
            features: ['Eco-friendly solvents', 'Delicate fabric safe', 'Professional stain removal', 'Premium finishing'],
            category: 'cleaning', badge: 'Most Popular',
            slug: 'dry-cleaning-service-in-kota'
        },
        {
            id: 'laundry',
            name: 'Wash & Fold Laundry',
            description: 'Everyday laundry made easy. We wash, dry, and neatly fold your casual wear, bedsheets.',
            price: 20, priceUnit: 'Starting at', priceSuffix: '/ pc',
            image: 'images/laundry-service-kota.webp',
            features: ['Wash & dry included', 'Neat folding', 'Color separation', 'Same-day option'],
            category: 'laundry', badge: null,
            slug: 'laundry-service-in-kota'
        },
        {
            id: 'steam-ironing',
            name: 'Professional Steam Ironing',
            description: 'Crisp, wrinkle-free finishes for your shirts and trousers using industrial-grade steam press.',
            price: 30, priceUnit: 'Starting at', priceSuffix: '/ pc',
            image: 'images/steam-ironing-service-kota.webp',
            features: ['Industrial steam press', 'Wrinkle-free finish', 'Quick turnaround', 'Perfect crease lines'],
            category: 'pressing', badge: null,
            slug: null
        },
        {
            id: 'saree-cleaning',
            name: 'Saree Dry Cleaning',
            description: 'Expert dry cleaning for silk sarees, bridal sarees, and delicate ethnic wear with precision care.',
            price: 120, priceUnit: 'Starting at', priceSuffix: '',
            image: 'images/saree-dry-cleaning-kota.webp',
            features: ['Hand-finishing', 'Zari & embellishment care', 'Stain protection', 'Premium packaging'],
            category: 'cleaning', badge: null,
            slug: 'saree-dry-cleaning-in-kota'
        },
        {
            id: 'coat-cleaning',
            name: 'Coat & Blazer Dry Cleaning',
            description: 'Expert dry cleaning for formal suits, blazers, and coats with precision pressing and care.',
            price: 120, priceUnit: 'Starting at', priceSuffix: '',
            image: 'images/coat-dry-cleaning-kota.webp',
            features: ['Hand-finishing', 'Shoulder shaping', 'Lining protection', 'Premium packaging'],
            category: 'cleaning', badge: null,
            slug: 'coat-dry-cleaning-in-kota'
        },
        {
            id: 'shoe-cleaning',
            name: 'Shoe Cleaning Service',
            description: 'Professional shoe cleaning and polishing for leather, suede, sneakers, and formal shoes.',
            price: 50, priceUnit: 'Starting at', priceSuffix: '',
            image: 'images/shoe-cleaning-service-kota.webp',
            features: ['Deep clean & polish', 'Leather conditioning', 'Odor removal', 'Waterproofing option'],
            category: 'specialty', badge: null,
            slug: 'shoe-cleaning-service-in-kota'
        },
        {
            id: 'carpet-cleaning',
            name: 'Carpet & Curtain Cleaning',
            description: 'Deep cleaning for carpets, curtains, blankets, and heavy fabric items.',
            price: 150, priceUnit: 'Starting at', priceSuffix: '',
            image: 'images/carpet-cleaning-service-kota.webp',
            features: ['Deep clean technology', 'Allergen removal', 'Gentle on fibers', 'Folding included'],
            category: 'specialty', badge: 'Value Deal',
            slug: 'carpet-cleaning-service-in-kota'
        },
        {
            id: 'express-service',
            name: 'Express Service',
            description: 'Need it urgently? Get your essential garments back within 24 hours.',
            price: 50, priceUnit: 'Starting at', priceSuffix: ' extra',
            image: 'images/express-cleaning-service-kota.webp',
            features: ['24-hour turnaround', 'Priority processing', 'Same-day pickup', 'SMS notification'],
            category: 'specialty', badge: 'Fast',
            slug: null
        }
    ];

    const CATEGORY_META = {
        cleaning:  { label: 'Dry Cleaning', icon: 'fa-tshirt' },
        laundry:   { label: 'Laundry',      icon: 'fa-t-shirt' },
        pressing:  { label: 'Pressing',     icon: 'fa-iron' },
        specialty: { label: 'Specialty',    icon: 'fa-star' }
    };

    async function loadPriceData() {
        try {
            const response = await fetch('data/prices.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) throw new Error('Invalid data');
            return data;
        } catch (err) {
            console.warn('Using default price data:', err.message);
            return DEFAULT_PRICES;
        }
    }

    function renderServiceCards(services) {
        const grid = document.getElementById('services-grid');
        if (!grid) return;
        grid.innerHTML = '';
        services.forEach(s => {
            const priceDisplay = s.priceUnit ? `${s.priceUnit} ₹${s.price}${s.priceSuffix}` : `₹${s.price}${s.priceSuffix}`;
            const linkStart = s.slug ? `<a href="services/${s.slug}.html" style="text-decoration:none;color:inherit;display:block;">` : '';
            const linkEnd = s.slug ? '</a>' : '';
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                ${linkStart}
                <div class="service-img-wrap">
                    <img src="${s.image}" alt="${s.name} in Kota - Shree Ganesh Dry Cleaners" loading="lazy">
                </div>
                <div class="service-content">
                    <h3>${s.name}</h3>
                    <div class="service-meta">
                        <span class="service-price">${priceDisplay}</span>
                    </div>
                    <p>${s.description}</p>
                    ${s.slug ? '<span class="read-more" style="color:var(--gold);font-weight:600;font-size:0.9rem;">View Details →</span>' : `<a href="tel:9950456693" class="btn btn-primary btn-sm" style="pointer-events:auto;"><i class="fas fa-phone-alt"></i> Book Now</a>`}
                </div>
                ${linkEnd}
            `;
            grid.appendChild(card);
        });
    }

    function renderPricingGrid(services) {
        const grid = document.getElementById('pricing-grid');
        if (!grid) return;
        grid.innerHTML = '';
        services.forEach(s => {
            const cat = CATEGORY_META[s.category] || { label: 'Service', icon: 'fa-tag' };
            const priceDisplay = s.priceUnit ? `${s.priceUnit} ₹${s.price}${s.priceSuffix}` : `₹${s.price}${s.priceSuffix}`;
            const card = document.createElement('div');
            card.className = 'pricing-card';
            if (s.badge) card.classList.add('pricing-featured');
            let featuresHtml = '';
            s.features.forEach(f => { featuresHtml += `<li><i class="fas fa-check-circle"></i> ${f}</li>`; });
            card.innerHTML = `
                ${s.badge ? `<span class="pricing-badge">${s.badge}</span>` : ''}
                <div class="pricing-card-header">
                    <h3>${s.name}</h3>
                    <div class="pricing-amount">
                        <span class="pricing-price">₹${s.price}</span>
                        ${s.priceSuffix ? `<span class="pricing-suffix">${s.priceSuffix}</span>` : ''}
                    </div>
                    <p class="pricing-unit">${s.priceUnit}</p>
                </div>
                <div class="pricing-card-body">
                    <ul class="pricing-features">${featuresHtml}</ul>
                </div>
                <div class="pricing-card-footer">
                    <a href="tel:9950456693" class="btn btn-primary pricing-btn"><i class="fas fa-phone-alt"></i> Call & Book Now</a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    loadPriceData().then(services => {
        renderServiceCards(services);
        renderPricingGrid(services);
    });

    // ---- Lazy Loading for images ----
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }

    // ---- Contact Form WhatsApp Redirection ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            let text = `Hello Shree Ganesh Dry Cleaners,\n\nI have a new inquiry:\n`;
            text += `Name: ${name}\n`;
            text += `Phone: ${phone}\n`;
            if (email) text += `Email: ${email}\n`;
            if (service) text += `Service Needed: ${service}\n`;
            text += `Message: ${message}`;

            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/919950456693?text=${encodedText}`;
            window.open(whatsappUrl, '_blank');
        });
    }

});
