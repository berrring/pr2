document.addEventListener('DOMContentLoaded', function() {
  // Переключение темы
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const html = document.documentElement;

  themeToggle.addEventListener('click', function() {
    const isLight = html.getAttribute('data-theme') === 'light';
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');
    sunIcon.style.display = isLight ? 'none' : 'inline';
    moonIcon.style.display = isLight ? 'inline' : 'none';
  });

  // Инициализация иконок темы
  if (html.getAttribute('data-theme') === 'light') {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  }

  // Мобильное меню
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');

  mobileMenuToggle.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });
  });

  // Форма
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      formStatus.textContent = 'Message sent successfully!';
      formStatus.className = 'form-status success';
      formStatus.style.display = 'block';
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      setTimeout(() => formStatus.style.display = 'none', 5000);
    }, 1500);
  });

  // Персональное приветствие
  const g = document.getElementById('greeting');
  const btn = document.getElementById('askName');
  const greetingBlock = document.getElementById('greetingBlock');
  const mainContent = document.getElementById('mainContent');

  function showGreeting(name) {
    g.textContent = name ? `Привет, ${name}!` : 'Добро пожаловать!';
  }

  function proceedToSite() {
    greetingBlock.classList.add('hidden');
    setTimeout(() => {
      greetingBlock.style.display = 'none';
      mainContent.style.display = '';
    }, 600);
  }

  function askName() {
    const name = prompt('Как тебя зовут?');
    if (name && name.trim()) {
      localStorage.setItem('visitorName', name.trim());
    } else {
      localStorage.removeItem('visitorName');
    }
    showGreeting(localStorage.getItem('visitorName'));
    proceedToSite();
  }

  if (g && btn && greetingBlock && mainContent) {
    greetingBlock.style.display = 'flex';
    mainContent.style.display = 'none';
    const savedName = localStorage.getItem('visitorName');
    showGreeting(savedName);
    
    if (savedName) {
      setTimeout(proceedToSite, 1500);
    } else {
      btn.addEventListener('click', askName);
    }
  }

  // Кнопка "Наверх"
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Анимация появления карточек
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project-card, .stat-card, .hero-card').forEach(card => {
    observer.observe(card);
  });
});
