document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ==========================================================================
     Theme Switcher (Dark / Light)
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve theme preference from localStorage or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });


  /* ==========================================================================
     Mobile Dropdown Navigation Menu
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMobileMenu() {
    const isActive = mobileDropdownMenu.classList.toggle('active');
    
    if (isActive) {
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDropdownMenu.classList.remove('active');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });


  /* ==========================================================================
     Dynamic Subtitle Typing Effect
     ========================================================================== */
  const typingTextElement = document.getElementById('typing-text');
  const roles = [
    "Computer Science & Engineering Student",
    "Software Developer",
    "System Programming Enthusiast",
    "Creative Problem Solver"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      // Deleting characters
      typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletes faster
    } else {
      // Typing characters
      typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    // Word completely typed out
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Delay before deleting
    } 
    // Word completely deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length; // Next word
      typingSpeed = 500; // Short pause before starting typing
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Initiate typing loop if the target element exists
  if (typingTextElement) {
    typeEffect();
  }


  /* ==========================================================================
     Project Cards Dynamic Filtering
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Reset active tab class
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        // Match filter option
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          // Simple visual animation trigger
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ==========================================================================
     Intersection Observer for Scroll Reveal Animations
     ========================================================================== */
  const revealItems = document.querySelectorAll('.reveal-item');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1, // Element is 10% visible
    rootMargin: '0px 0px -50px 0px' // Slightly delayed reveal for cleaner scroll feel
  });

  revealItems.forEach(item => {
    revealObserver.observe(item);
  });


  /* ==========================================================================
     Active Navigation Links Update on Scroll
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    let scrollPosition = window.scrollY + 120; // Offset matching navbar header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);


  /* ==========================================================================
     Contact Form Verification & Success Handlers
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const contactSuccessMsg = document.getElementById('contact-success-msg');
  const submitButton = document.getElementById('contact-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page reload

      // Collect inputs
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      // Basic front-end verification
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill out all contact fields.');
        return;
      }

      // Visual sending indicator
      submitButton.disabled = true;
      const btnSpan = submitButton.querySelector('span');
      const originalText = btnSpan.textContent;
      btnSpan.textContent = 'Sending Message...';

      // Simulate API submit delay
      setTimeout(() => {
        // Reset button states
        submitButton.disabled = false;
        btnSpan.textContent = originalText;

        // Animate toggle form and success messages
        contactForm.classList.add('hidden');
        contactSuccessMsg.classList.remove('hidden');

        // Optional: Reset form fields
        contactForm.reset();
      }, 1200);
    });
  }
});
