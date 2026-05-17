// ============================================
// Shree Ganesh Dry Cleaners - Main Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ---- Existing Features ----

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileBtn) {
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.faq-question').classList.remove('active');
                }
            });
            faqItem.classList.toggle('active');
            question.classList.toggle('active');
        });
    });

    // ---- Pricing & Services Feature ----

    // Default fallback data (used if data/prices.json fails to load)
    const DEFAULT_PRICES = [
        {
            id: 'dry-cleaning',
            name: 'Premium Dry Cleaning',
            description: 'Specialized solvent-based cleaning for your suits, silk dresses, and delicate garments that cannot be washed with water.',
            price: 70,
            priceUnit: 'Starting at',
            priceSuffix: '',
            image: 'A_beautiful_collection_of_premium_202605100117.jpeg',
            features: ['Eco-friendly solvents', 'Delicate fabric safe', 'Professional stain removal', 'Premium finishing'],
            category: 'cleaning',
            badge: 'Most Popular'
        },
        {
            id: 'wash-fold',
            name: 'Wash & Fold',
            description: 'Everyday laundry made easy. We wash, dry, and neatly fold your casual wear, bedsheets, and towels.',
            price: 20,
            priceUnit: 'Starting at',
            priceSuffix: '/ pc',
            image: 'A_stunning_row_of_vibrant_202605100120.jpeg',
            features: ['Wash & dry included', 'Neat folding', 'Color separation', 'Same-day option'],
            category: 'laundry',
            badge: null
        },
        {
            id: 'steam-ironing',
            name: 'Professional Steam Ironing',
            description: 'Crisp, wrinkle-free finishes for your shirts and trousers using our industrial-grade steam press machines.',
            price: 30,
            priceUnit: 'Starting at',
            priceSuffix: '/ pc',
            image: 'Copilot_20260510_011331.png',
            features: ['Industrial steam press', 'Wrinkle-free finish', 'Quick turnaround', 'Perfect crease lines'],
            category: 'pressing',
            badge: null
        },
        {
            id: 'suit-blazer',
            name: 'Suit & Blazer Dry Cleaning',
            description: 'Expert dry cleaning for formal suits, blazers, and coats with precision pressing and care.',
            price: 120,
            priceUnit: 'Starting at',
            priceSuffix: '',
            image: 'Copilot_20260510_011444.png',
            features: ['Hand-finishing', 'Shoulder shaping', 'Lining protection', 'Premium packaging'],
            category: 'cleaning',
            badge: null
        },
        {
            id: 'blanket-curtain',
            name: 'Blanket & Curtain Cleaning',
            description: 'Deep cleaning for heavy blankets, comforters, drapes, and large fabric items.',
            price: 150,
            priceUnit: 'Starting at',
            priceSuffix: '',
            image: 'Copilot_20260510_011728.png',
            features: ['Deep clean technology', 'Allergen removal', 'Gentle on fibers', 'Folding included'],
            category: 'specialty',
            badge: 'Value Deal'
        },
        {
            id: 'express-service',
            name: 'Express Service',
            description: 'Need it urgently? Get your essential garments back within 24 hours with our express service.',
            price: 50,
            priceUnit: 'Starting at',
            priceSuffix: ' extra',
            image: 'Copilot_20260510_010949.png',
            features: ['24-hour turnaround', 'Priority processing', 'Same-day pickup', 'SMS notification'],
            category: 'specialty',
            badge: 'Fast'
        }
    ];

    // Category display labels and icons
    const CATEGORY_META = {
        cleaning:  { label: 'Dry Cleaning', icon: 'fa-tshirt' },
        laundry:   { label: 'Laundry',      icon: 'fa-t-shirt' },
        pressing:  { label: 'Pressing',     icon: 'fa-iron' },
        specialty: { label: 'Specialty',    icon: 'fa-star' }
    };

    /**
     * Load price data from data/prices.json.
     * Falls back to DEFAULT_PRICES if fetch fails.
     */
    async function loadPriceData() {
        try {
            const response = await fetch('data/prices.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) throw new Error('Invalid data');
            return data;
        } catch (err) {
            console.warn('Could not load prices.json, using defaults:', err.message);
            return DEFAULT_PRICES;
        }
    }

    /**
     * Render service cards inside #services-grid
     */
    function renderServiceCards(services) {
        const grid = document.getElementById('services-grid');
        if (!grid) return;

        grid.innerHTML = '';

        services.forEach(service => {
            const priceDisplay = service.priceUnit
                ? `${service.priceUnit} ₹${service.price}${service.priceSuffix}`
                : `₹${service.price}${service.priceSuffix}`;

            const card = document.createElement('div');
            card.className = 'service-card';
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';

            card.innerHTML = `
                <div class="service-img-wrapper">
                    <img src="${service.image}" alt="${service.name}" class="service-img" loading="lazy">
                </div>
                <div class="service-content">
                    <h3>${service.name}</h3>
                    <span class="service-price">${priceDisplay}</span>
                    <p>${service.description}</p>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    /**
     * Render pricing cards inside #pricing-grid
     */
    function renderPricingGrid(services) {
        const grid = document.getElementById('pricing-grid');
        if (!grid) return;

        grid.innerHTML = '';

        services.forEach(service => {
            const categoryMeta = CATEGORY_META[service.category] || { label: 'Service', icon: 'fa-tag' };
            const priceDisplay = service.priceUnit
                ? `${service.priceUnit} ₹${service.price}${service.priceSuffix}`
                : `₹${service.price}${service.priceSuffix}`;

            const card = document.createElement('div');
            card.className = 'pricing-card';
            if (service.badge) {
                card.classList.add('pricing-featured');
            }
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';

            let featuresHtml = '';
            service.features.forEach(f => {
                featuresHtml += `<li><i class="fas fa-check-circle"></i> ${f}</li>`;
            });

            card.innerHTML = `
                ${service.badge ? `<span class="pricing-badge">${service.badge}</span>` : ''}
                <div class="pricing-card-header">
                    <span class="pricing-category"><i class="fas ${categoryMeta.icon}"></i> ${categoryMeta.label}</span>
                    <h3>${service.name}</h3>
                    <div class="pricing-amount">
                        <span class="pricing-price">₹${service.price}</span>
                        ${service.priceSuffix ? `<span class="pricing-suffix">${service.priceSuffix}</span>` : ''}
                    </div>
                    <p class="pricing-unit">${service.priceUnit}</p>
                </div>
                <div class="pricing-card-body">
                    <ul class="pricing-features">
                        ${featuresHtml}
                    </ul>
                </div>
                <div class="pricing-card-footer">
                    <a href="tel:9950456693" class="btn btn-primary pricing-btn">
                        <i class="fas fa-phone-alt"></i> Book Now
                    </a>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    /**
     * Set up IntersectionObserver for scroll animations on dynamic elements
     */
    function setupScrollAnimations(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        container.querySelectorAll(':scope > *').forEach(el => {
            observer.observe(el);
        });
    }

    // ---- Initialize Pricing Feature ----
    loadPriceData().then(services => {
        // Render both sections from the same data
        renderServiceCards(services);
        renderPricingGrid(services);

        // Attach scroll animations to newly created elements
        setupScrollAnimations('#services-grid');
        setupScrollAnimations('#pricing-grid');
    });
});
