document.addEventListener('DOMContentLoaded', function() {
  // Переключение темы
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const html = document.documentElement;
  const mobileNav = document.getElementById('mobileNav'); // Определяем здесь для использования в Listener

  // Функция для установки иконок
  function updateThemeIcons() {
    const isLight = html.getAttribute('data-theme') === 'light';
    sunIcon.style.display = isLight ? 'inline' : 'none';
    moonIcon.style.display = isLight ? 'none' : 'inline';
  }

  themeToggle.addEventListener('click', function() {
    const isLight = html.getAttribute('data-theme') === 'light';
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');
    updateThemeIcons();
  });

  // Инициализация иконок темы (при первой загрузке)
  if (!html.getAttribute('data-theme')) {
      html.setAttribute('data-theme', 'dark'); 
  }
  updateThemeIcons();

  // Мобильное меню
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');

  mobileMenuToggle.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
  });

  // ПЛАВНЫЙ СКРОЛЛ: Оставляем только закрытие мобильного меню
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      // Браузер сам обрабатывает скролл плавно через CSS
    });
  });
  
  // ПЛАВНЫЙ СКРОЛЛ: Для десктопной навигации делаем то же самое
  document.querySelectorAll('.nav a.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        // Браузер сам обрабатывает скролл плавно через CSS
        // Никаких preventDefault и scrollIntoView!
    });
  });

  // Форма
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
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
  }

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
    }, 600);
  }

  function askName() {
    const name = prompt('What is your name?');
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
    
    const savedName = localStorage.getItem('visitorName');
    showGreeting(savedName);
    
    if (savedName) {
      setTimeout(proceedToSite, 1500);
    } else {
      btn.addEventListener('click', askName);
    }
  }


  window.addEventListener('load', () => {
    const { hash } = window.location;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
      
      }
    }
  });

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const SHOW_AFTER = 300;

  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        if (window.scrollY > SHOW_AFTER) {
          scrollTopBtn.classList.add('show');
        } else {
          scrollTopBtn.classList.remove('show');
        }
    }
  });

  if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
});
