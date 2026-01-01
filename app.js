// Application Data from JSON
const appData = {
  customization_options: {
    styles: [
      {"name": "Engagement Rings", "description": "Classic and contemporary designs", "starting_price": "$1,200"},
      {"name": "Wedding Bands", "description": "Matching sets and unique patterns", "starting_price": "$800"},
      {"name": "Necklaces", "description": "Pendants, chains, and statement pieces", "starting_price": "$650"},
      {"name": "Earrings", "description": "Studs, drops, and chandelier styles", "starting_price": "$450"},
      {"name": "Bracelets", "description": "Tennis, bangles, and charm styles", "starting_price": "$550"},
      {"name": "Custom Sets", "description": "Complete matching jewelry collections", "starting_price": "$2,500"}
    ],
    metals: [
      {"name": "18K Yellow Gold", "purity": "75% gold content", "price_multiplier": 1.0},
      {"name": "22K Yellow Gold", "purity": "91.7% gold content", "price_multiplier": 1.3},
      {"name": "18K White Gold", "purity": "Rhodium plated finish", "price_multiplier": 1.1},
      {"name": "18K Rose Gold", "purity": "Romantic pink hue", "price_multiplier": 1.1},
      {"name": "Platinum", "purity": "95% pure platinum", "price_multiplier": 1.8}
    ],
    stones: [
      {"name": "Natural Diamonds", "quality": "VS1-VS2 clarity, F-G color", "price_per_carat": "$3,500"},
      {"name": "Lab Diamonds", "quality": "Identical properties, eco-friendly", "price_per_carat": "$1,800"},
      {"name": "Emeralds", "quality": "Natural Colombian emeralds", "price_per_carat": "$2,200"},
      {"name": "Rubies", "quality": "Burmese rubies, pigeon blood", "price_per_carat": "$2,800"},
      {"name": "Sapphires", "quality": "Kashmir and Ceylon sapphires", "price_per_carat": "$2,400"},
      {"name": "Custom Stones", "quality": "Family heirlooms and unique gems", "price_per_carat": "Quote based"}
    ]
  },
  process_steps: [
    {
      "step": 1,
      "title": "Free Consultation",
      "description": "Share your vision with our expert designers. We discuss your style preferences, budget, and timeline for your perfect piece.",
      "duration": "30-60 minutes",
      "icon": "fas fa-comments"
    },
    {
      "step": 2,
      "title": "Design & 3D Preview",
      "description": "Our craftsmen create detailed sketches and 3D renderings of your piece. Make revisions until it's exactly as you envisioned.",
      "duration": "3-5 days",
      "icon": "fas fa-drafting-compass"
    },
    {
      "step": 3,
      "title": "Handcrafting Process",
      "description": "Master jewelers handcraft your piece using traditional techniques and modern precision. Progress updates provided throughout.",
      "duration": "2-4 weeks",
      "icon": "fas fa-hammer"
    },
    {
      "step": 4,
      "title": "Quality Check & Delivery",
      "description": "Rigorous quality inspection, professional photography, and secure delivery with lifetime warranty and care instructions.",
      "duration": "1-2 days",
      "icon": "fas fa-gem"
    }
  ],
  testimonials: [
    {
      "name": "Priya Sharma",
      "location": "Mumbai",
      "text": "They transformed my grandmother's old gold into a stunning modern necklace. The 3D preview helped me visualize perfectly before crafting.",
      "rating": 5,
      "piece": "Custom Heritage Necklace",
      "date": "2 months ago"
    },
    {
      "name": "Rajesh Kumar",
      "location": "Delhi",
      "text": "Designed our wedding rings with traditional motifs and modern finish. The craftsmanship is unparalleled, exactly what we dreamed of.",
      "rating": 5,
      "piece": "Custom Wedding Ring Set",
      "date": "6 weeks ago"
    },
    {
      "name": "Anita Reddy",
      "location": "Bangalore",
      "text": "The team understood my vision for a contemporary mangalsutra. The process was smooth and the final piece exceeded expectations.",
      "rating": 5,
      "piece": "Modern Mangalsutra Design",
      "date": "1 month ago"
    },
    {
      "name": "Vikram Singh",
      "location": "Jaipur",
      "text": "Created a unique bracelet incorporating my late father's ring. Emotional value combined with exceptional craftsmanship. Highly recommended.",
      "rating": 5,
      "piece": "Memorial Custom Bracelet",
      "date": "3 weeks ago"
    }
  ],
  
  company_info: {
    "established": "1998",
    "experience": "25+ years",
    "craftsmen": "12 master jewelers",
    "pieces_created": "5000+",
    "satisfaction_rate": "99.8%",
    "warranty": "Lifetime maintenance"
  }
};

// Global State
let currentWizardStep = 1;
let customizationData = {
  style: null,
  metal: null,
  stone: null,
  engraving: '',
  specialRequests: ''
};

// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const headerNav = document.getElementById('headerNav');
const backToTopBtn = document.getElementById('backToTop');
const consultationModal = document.getElementById('consultationModal');
const chatWidget = document.getElementById('chatWidget');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  renderCustomizationWizard();
  renderProcessSteps();
  renderPortfolio();
  renderTestimonials();
  setupIntersectionObserver();
  setupScrollEffects();
  initializeAnimations();
}

// Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Navigation links - smooth scroll and active states
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  
  // Back to top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', scrollToTop);
  }
  
  // Floating action buttons
  const whatsappFab = document.getElementById('whatsappFab');
  const consultationFab = document.getElementById('consultationFab');
  
  if (whatsappFab) {
    whatsappFab.addEventListener('click', openWhatsApp);
  }
  
  if (consultationFab) {
    consultationFab.addEventListener('click', openConsultationModal);
  }
  
  // WhatsApp buttons
  const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
  whatsappBtns.forEach(btn => {
    btn.addEventListener('click', openWhatsApp);
  });
  
  // Header CTA buttons
  const headerCtas = document.querySelectorAll('.header__cta');
  headerCtas.forEach(btn => {
    btn.addEventListener('click', openConsultationModal);
  });
  
  // Chat widget
  const chatClose = document.getElementById('chatClose');
  const chatSend = document.getElementById('chatSend');
  const chatInput = document.getElementById('chatInput');
  
  if (chatClose) {
    chatClose.addEventListener('click', closeChatWidget);
  }
  
  if (chatSend && chatInput) {
    chatSend.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }
  
  // Forms
  const contactForm = document.getElementById('contactForm');
  const consultationForm = document.getElementById('consultationForm');
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
  
  if (consultationForm) {
    consultationForm.addEventListener('submit', handleConsultationForm);
  }
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterForm);
  }
  
  // Modal close
  const modalCloses = document.querySelectorAll('.modal-close, .modal-overlay');
  modalCloses.forEach(close => {
    close.addEventListener('click', closeModal);
  });
  
  // Portfolio filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', handlePortfolioFilter);
  });
  
  // Scroll events
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
  
  // Wizard navigation
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const consultationBtn = document.getElementById('consultationBtn');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', previousWizardStep);
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextWizardStep);
  }
  
  if (consultationBtn) {
    consultationBtn.addEventListener('click', openConsultationModal);
  }
}

// Navigation Functions
function toggleMobileMenu() {
  headerNav.classList.toggle('mobile-open');
  mobileMenuToggle.classList.toggle('active');
}

function handleNavClick(e) {
  e.preventDefault();
  const targetId = e.target.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  
  if (targetElement) {
    // Close mobile menu if open
    headerNav.classList.remove('mobile-open');
    mobileMenuToggle.classList.remove('active');
    
    // Smooth scroll
    targetElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Update active state
    document.querySelectorAll('.nav__link').forEach(link => {
      link.classList.remove('active');
    });
    e.target.classList.add('active');
  }
}

// Scroll Functions
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const header = document.querySelector('.header');
  
  // Header scroll effect
  if (scrollTop > 100) {
    header.classList.add('scrolled');
    backToTopBtn.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    backToTopBtn.classList.remove('visible');
  }
  
  // Update active nav based on scroll position
  updateActiveNavigation();
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function handleResize() {
  // Close mobile menu on resize
  if (window.innerWidth > 768) {
    headerNav.classList.remove('mobile-open');
    mobileMenuToggle.classList.remove('active');
  }
}

// Customization Wizard
function renderCustomizationWizard() {
  renderStyleOptions();
  renderMetalOptions();
  renderStoneOptions();
  updateWizardProgress();
}

function renderStyleOptions() {
  const styleGrid = document.getElementById('styleGrid');
  if (!styleGrid) return;
  
  const stylesHTML = appData.customization_options.styles.map((style, index) => `
    <div class="style-option fade-in" data-style="${index}" onclick="selectStyle(${index})">
      <h4>${style.name}</h4>
      <div class="price">${style.starting_price}</div>
      <p>${style.description}</p>
    </div>
  `).join('');
  
  styleGrid.innerHTML = stylesHTML;
}

function renderMetalOptions() {
  const metalOptions = document.getElementById('metalOptions');
  if (!metalOptions) return;
  
  const metalsHTML = appData.customization_options.metals.map((metal, index) => `
    <div class="metal-option fade-in" data-metal="${index}" onclick="selectMetal(${index})">
      <h4>${metal.name}</h4>
      <div class="purity">${metal.purity}</div>
    </div>
  `).join('');
  
  metalOptions.innerHTML = metalsHTML;
}

function renderStoneOptions() {
  const stonesGrid = document.getElementById('stonesGrid');
  if (!stonesGrid) return;
  
  const stonesHTML = appData.customization_options.stones.map((stone, index) => `
    <div class="stone-option fade-in" data-stone="${index}" onclick="selectStone(${index})">
      <h4>${stone.name}</h4>
      <div class="price">${stone.price_per_carat}</div>
      <p>${stone.quality}</p>
    </div>
  `).join('');
  
  stonesGrid.innerHTML = stonesHTML;
}

function selectStyle(index) {
  // Remove previous selection
  document.querySelectorAll('.style-option').forEach(option => {
    option.classList.remove('selected');
  });
  
  // Add selection to clicked option
  document.querySelector(`[data-style="${index}"]`).classList.add('selected');
  customizationData.style = appData.customization_options.styles[index];
  
  // Enable next button
  updateWizardNavigation();
}

function selectMetal(index) {
  document.querySelectorAll('.metal-option').forEach(option => {
    option.classList.remove('selected');
  });
  
  document.querySelector(`[data-metal="${index}"]`).classList.add('selected');
  customizationData.metal = appData.customization_options.metals[index];
  
  updateWizardNavigation();
}

function selectStone(index) {
  document.querySelectorAll('.stone-option').forEach(option => {
    option.classList.remove('selected');
  });
  
  document.querySelector(`[data-stone="${index}"]`).classList.add('selected');
  customizationData.stone = appData.customization_options.stones[index];
  
  updateWizardNavigation();
}

function nextWizardStep() {
  if (currentWizardStep < 5) {
    // Save personal touch data
    if (currentWizardStep === 4) {
      customizationData.engraving = document.getElementById('engravingText')?.value || '';
      customizationData.specialRequests = document.getElementById('specialRequests')?.value || '';
    }
    
    currentWizardStep++;
    updateWizardStep();
    updateWizardProgress();
    updateWizardNavigation();
    
    // Render summary on step 5
    if (currentWizardStep === 5) {
      renderDesignSummary();
    }
  }
}

function previousWizardStep() {
  if (currentWizardStep > 1) {
    currentWizardStep--;
    updateWizardStep();
    updateWizardProgress();
    updateWizardNavigation();
  }
}

function updateWizardStep() {
  // Hide all steps
  document.querySelectorAll('.wizard__step').forEach(step => {
    step.classList.remove('active');
  });
  
  // Show current step
  const currentStep = document.getElementById(`step${currentWizardStep}`);
  if (currentStep) {
    currentStep.classList.add('active');
    
    // Add animation
    setTimeout(() => {
      const elements = currentStep.querySelectorAll('.fade-in');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 100);
      });
    }, 100);
  }
}

function updateWizardProgress() {
  const progressFill = document.getElementById('progressFill');
  const progressSteps = document.querySelectorAll('.progress__step');
  
  // Update progress bar
  const progressPercent = (currentWizardStep / 5) * 100;
  if (progressFill) {
    progressFill.style.width = `${progressPercent}%`;
  }
  
  // Update step indicators
  progressSteps.forEach((step, index) => {
    const stepNumber = index + 1;
    step.classList.remove('active', 'completed');
    
    if (stepNumber === currentWizardStep) {
      step.classList.add('active');
    } else if (stepNumber < currentWizardStep) {
      step.classList.add('completed');
      step.innerHTML = '<i class="fas fa-check"></i>';
    } else {
      step.innerHTML = stepNumber;
    }
  });
}

function updateWizardNavigation() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const consultationBtn = document.getElementById('consultationBtn');
  
  // Show/hide previous button
  if (prevBtn) {
    prevBtn.style.display = currentWizardStep > 1 ? 'inline-flex' : 'none';
  }
  
  // Show/hide next button vs consultation button
  if (currentWizardStep === 5) {
    if (nextBtn) nextBtn.style.display = 'none';
    if (consultationBtn) consultationBtn.style.display = 'inline-flex';
  } else {
    if (nextBtn) nextBtn.style.display = 'inline-flex';
    if (consultationBtn) consultationBtn.style.display = 'none';
  }
}

function renderDesignSummary() {
  const designSummary = document.getElementById('designSummary');
  const estimatedPrice = document.getElementById('estimatedPrice');
  
  if (!designSummary) return;
  
  let summaryHTML = '';
  let basePrice = 0;
  let maxPrice = 0;
  
  if (customizationData.style) {
    basePrice = parseInt(customizationData.style.starting_price.replace(/[$,]/g, ''));
    summaryHTML += `
      <div class="summary-item">
        <span class="summary-label">Style:</span>
        <span class="summary-value">${customizationData.style.name}</span>
      </div>
    `;
  }
  
  if (customizationData.metal) {
    const metalMultiplier = customizationData.metal.price_multiplier;
    summaryHTML += `
      <div class="summary-item">
        <span class="summary-label">Metal:</span>
        <span class="summary-value">${customizationData.metal.name}</span>
      </div>
    `;
    basePrice *= metalMultiplier;
  }
  
  if (customizationData.stone) {
    summaryHTML += `
      <div class="summary-item">
        <span class="summary-label">Stone:</span>
        <span class="summary-value">${customizationData.stone.name}</span>
      </div>
    `;
    
    if (customizationData.stone.price_per_carat !== "Quote based") {
      const stonePrice = parseInt(customizationData.stone.price_per_carat.replace(/[$,]/g, ''));
      basePrice += stonePrice; // Assuming 1 carat
    }
  }
  
  if (customizationData.engraving) {
    summaryHTML += `
      <div class="summary-item">
        <span class="summary-label">Engraving:</span>
        <span class="summary-value">${customizationData.engraving}</span>
      </div>
    `;
  }
  
  if (customizationData.specialRequests) {
    summaryHTML += `
      <div class="summary-item">
        <span class="summary-label">Special Requests:</span>
        <span class="summary-value">${customizationData.specialRequests}</span>
      </div>
    `;
  }
  
  designSummary.innerHTML = summaryHTML;
  
  // Calculate price range
  maxPrice = basePrice * 1.5; // Add 50% for complexity
  
  if (estimatedPrice) {
    const priceValue = estimatedPrice.querySelector('.price-value');
    if (priceValue) {
      priceValue.textContent = `$${basePrice.toLocaleString()} - $${maxPrice.toLocaleString()}`;
    }
  }
}

// Global Functions for Wizard (needed for onclick handlers)
window.selectStyle = selectStyle;
window.selectMetal = selectMetal;
window.selectStone = selectStone;
window.startCustomization = function() {
  document.getElementById('customization').scrollIntoView({ behavior: 'smooth' });
};
window.scrollToPortfolio = function() {
  document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
};

// Process Steps
function renderProcessSteps() {
  const processSteps = document.getElementById('processSteps');
  if (!processSteps) return;
  
  const stepsHTML = appData.process_steps.map(step => `
    <div class="process-step fade-in">
      <div class="process-step__icon">
        <i class="${step.icon}"></i>
      </div>
      <div class="process-step__content">
        <h3>${step.title}</h3>
        <p>${step.description}</p>
        <div class="process-step__duration">${step.duration}</div>
      </div>
    </div>
  `).join('');
  
  processSteps.innerHTML = stepsHTML;
}

// Portfolio
function renderPortfolio() {
  const portfolioGrid = document.getElementById('portfolioGrid');
  if (!portfolioGrid) return;
  
  const portfolioHTML = appData.portfolio_items.map((item, index) => `
    <div class="portfolio-item fade-in" data-category="${item.category}">
      <div class="portfolio-item__image">
        [${item.title}]<br>
        <small>Portfolio Image ${index + 1}</small>
      </div>
      <div class="portfolio-item__content">
        <div class="portfolio-item__category">${item.category}</div>
        <h3 class="portfolio-item__title">${item.title}</h3>
        <p class="portfolio-item__description">${item.description}</p>
      </div>
    </div>
  `).join('');
  
  portfolioGrid.innerHTML = portfolioHTML;
}

function handlePortfolioFilter(e) {
  const category = e.target.dataset.category;
  
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  e.target.classList.add('active');
  
  // Filter portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    const itemCategory = item.dataset.category;
    
    if (category === 'all' || itemCategory === category) {
      item.style.display = 'block';
      item.classList.add('fade-in');
    } else {
      item.style.display = 'none';
    }
  });
  
  // Re-trigger animations for visible items
  setTimeout(() => {
    const visibleItems = document.querySelectorAll('.portfolio-item[style="display: block"]');
    visibleItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 100);
    });
  }, 100);
}

// Testimonials
function renderTestimonials() {
  const testimonialsGrid = document.getElementById('testimonialsGrid');
  if (!testimonialsGrid) return;
  
  const testimonialsHTML = appData.testimonials.map(testimonial => {
    const initials = testimonial.name.split(' ').map(n => n[0]).join('');
    const stars = Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('');
    
    return `
      <div class="testimonial-card fade-in">
        <div class="testimonial-rating">
          ${stars}
        </div>
        <div class="testimonial-header">
          <div class="testimonial-avatar">${initials}</div>
          <div class="testimonial-info">
            <h4>${testimonial.name}</h4>
            <div class="testimonial-location">${testimonial.location}</div>
          </div>
        </div>
        <p class="testimonial-text">${testimonial.text}</p>
        <div class="testimonial-footer">
          <span class="testimonial-piece">${testimonial.piece}</span>
          <span class="testimonial-date">${testimonial.date}</span>
        </div>
      </div>
    `;
  }).join('');
  
  testimonialsGrid.innerHTML = testimonialsHTML;
}

// Forms
function handleContactForm(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    consultationType: formData.get('consultationType'),
    message: formData.get('message')
  };
  
  // Validate required fields
  if (!data.name || !data.phone || !data.email) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }
  
  if (!isValidEmail(data.email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  // Simulate form submission
  showLoadingState(e.target);
  
  setTimeout(() => {
    hideLoadingState(e.target);
    showNotification('Thank you! We\'ll contact you within 24 hours to schedule your consultation.', 'success');
    e.target.reset();
  }, 2000);
}

function handleConsultationForm(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Validation
  if (!data.name || !data.phone || !data.email) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }
  
  if (!isValidEmail(data.email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  // Add customization data if available
  if (Object.keys(customizationData).some(key => customizationData[key])) {
    data.customizationData = JSON.stringify(customizationData);
  }
  
  showLoadingState(e.target);
  
  setTimeout(() => {
    hideLoadingState(e.target);
    closeModal();
    showNotification('Consultation booked successfully! We\'ll send you a confirmation email shortly.', 'success');
    e.target.reset();
  }, 2000);
}

function handleNewsletterForm(e) {
  e.preventDefault();
  
  const emailInput = e.target.querySelector('input[type="email"]');
  const email = emailInput.value;
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address.', 'error');
    return;
  }
  
  showLoadingState(e.target);
  
  setTimeout(() => {
    hideLoadingState(e.target);
    showNotification('Successfully subscribed to our newsletter!', 'success');
    emailInput.value = '';
  }, 1500);
}

// Modal Functions
function openConsultationModal() {
  if (consultationModal) {
    consultationModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
      const firstInput = consultationModal.querySelector('input');
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  }
}

function closeModal() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.classList.add('hidden');
  });
  document.body.style.overflow = '';
}

// Chat Widget
function openChatWidget() {
  if (chatWidget) {
    chatWidget.classList.add('open');
  }
}

function closeChatWidget() {
  if (chatWidget) {
    chatWidget.classList.remove('open');
  }
}

function sendChatMessage() {
  const chatInput = document.getElementById('chatInput');
  const message = chatInput?.value.trim();
  
  if (!message) return;
  
  // Add user message to chat
  const chatBody = document.querySelector('.chat-widget__body');
  if (chatBody) {
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message chat-message--sent';
    userMessage.innerHTML = `<p>${message}</p>`;
    userMessage.style.backgroundColor = 'var(--gold-gradient-subtle)';
    userMessage.style.marginLeft = 'auto';
    userMessage.style.textAlign = 'right';
    chatBody.appendChild(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Simulate response
    setTimeout(() => {
      const botMessage = document.createElement('div');
      botMessage.className = 'chat-message chat-message--received';
      botMessage.innerHTML = `<p>Thank you for your message! A design consultant will respond shortly. Would you like to schedule a consultation call?</p>`;
      chatBody.appendChild(botMessage);
      
      // Scroll to bottom
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

// Communication Functions
function openWhatsApp() {
  const message = encodeURIComponent("Hi! I'm interested in creating a custom jewelry piece. Could you please provide more information about your design process?");
  const whatsappUrl = `https://wa.me/9035340369?text=${message}`;
  window.open(whatsappUrl, '_blank');
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification__content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification__close">&times;</button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    padding: var(--space-16);
    box-shadow: var(--shadow-floating);
    z-index: 3000;
    max-width: 350px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-12);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  if (type === 'success') {
    notification.style.borderLeftColor = 'var(--color-success)';
    notification.style.borderLeftWidth = '4px';
  } else if (type === 'error') {
    notification.style.borderLeftColor = 'var(--color-error)';
    notification.style.borderLeftWidth = '4px';
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button
  const closeBtn = notification.querySelector('.notification__close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });
  
  closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: var(--font-size-lg);
    cursor: pointer;
    color: var(--color-text-secondary);
  `;
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

function showLoadingState(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  }
}

function hideLoadingState(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = false;
    // Restore original text based on form type
    if (form.id === 'contactForm') {
      submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Book Free Consultation';
    } else if (form.id === 'consultationForm') {
      submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Schedule Consultation';
    } else {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
  }
}

// Animation and Intersection Observer
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Special handling for different elements
        if (entry.target.classList.contains('process-step__icon')) {
          entry.target.style.animationDelay = '0.5s';
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

function setupScrollEffects() {
  // Parallax effect for floating gems
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    const floatingGems = document.querySelectorAll('.floating-gem');
    floatingGems.forEach((gem, index) => {
      const speed = 0.2 + (index * 0.1);
      gem.style.transform = `translateY(${parallax * speed}px)`;
    });
  });
}

function initializeAnimations() {
  // Add staggered animation to grids
  const grids = document.querySelectorAll('.style-grid, .stones-grid, .portfolio__grid, .testimonials__grid');
  
  grids.forEach(grid => {
    const items = grid.querySelectorAll('.fade-in');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  });
  
  // Initialize floating animations
  const floatingElements = document.querySelectorAll('.floating-gem');
  floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 2}s`;
  });
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
  // Close modal with Escape
  if (e.key === 'Escape') {
    closeModal();
    closeChatWidget();
  }
  
  // Navigation with arrow keys in wizard
  if (e.key === 'ArrowLeft' && currentWizardStep > 1) {
    previousWizardStep();
  } else if (e.key === 'ArrowRight' && currentWizardStep < 5) {
    nextWizardStep();
  }
});

// Initialize chat widget toggle
setTimeout(() => {
  if (Math.random() > 0.7) { // 30% chance to show chat widget after 10 seconds
    openChatWidget();
  }
}, 10000);

// Performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(handleScroll, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// Error handling
window.addEventListener('error', function(e) {
  console.error('Application error:', e.error);
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Register service worker if available
    // navigator.serviceWorker.register('/sw.js');
  });
}