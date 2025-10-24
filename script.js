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

  // Плавная прокрутка без подсветки активного пункта
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });

  // При открытии страницы с хэшем (#about) — плавно скроллим к секции
  window.addEventListener('load', () => {
    const { hash } = window.location;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Кнопка «Наверх»
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Порог появления (в пикселях)
  const SHOW_AFTER = 300;

  // Следим за прокруткой и показываем/скрываем кнопку
  window.addEventListener('scroll', () => {
    if (window.scrollY > SHOW_AFTER) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  // Плавно прокручиваем к началу страницы
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
