document.addEventListener('DOMContentLoaded', function() {
  // Переключение темы
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const html = document.documentElement;

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
      // Установка начальной темы, если не задана
      html.setAttribute('data-theme', 'dark'); 
  }
  updateThemeIcons();

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
    // Убираем блок приветствия полностью после завершения анимации
    setTimeout(() => {
      greetingBlock.style.display = 'none';
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
    // ВАЖНОЕ ИСПРАВЛЕНИЕ: Мы не скрываем mainContent здесь, 
    // так как он уже должен быть видим по умолчанию, а 
    // greetingBlock его перекрывает.
    
    // Показываем блок приветствия
    greetingBlock.style.display = 'flex';
    
    const savedName = localStorage.getItem('visitorName');
    showGreeting(savedName);
    
    if (savedName) {
      // Если имя есть, автоматически переходим на сайт
      setTimeout(proceedToSite, 1500);
    } else {
      // Если имени нет, ждем клика
      btn.addEventListener('click', askName);
    }
  }

  // Плавная прокрутка (работает в паре с CSS scroll-margin-top)
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (!target) return;
      
      e.preventDefault();
      
      // Используем scrollIntoView для плавного скролла
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Обновляем URL (по желанию)
      history.pushState(null, '', id); 
      
      // Закрываем мобильное меню, если оно активно
      if (mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
      }
    });
  });

  // При открытии страницы с хэшем (#about) — плавно скроллим к секции
  window.addEventListener('load', () => {
    const { hash } = window.location;
    if (hash) {
      const target = document.querySelector(hash);
      // Убеждаемся, что скролл происходит после полной загрузки и 
      // учитывается фиксированный хедер (благодаря scroll-margin-top)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Кнопка «Наверх»
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Порог появления (в пикселях)
  const SHOW_AFTER = 300;

  // Следим за прокруткой и показываем/скрываем кнопку
  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
        if (window.scrollY > SHOW_AFTER) {
          scrollTopBtn.classList.add('show');
        } else {
          scrollTopBtn.classList.remove('show');
        }
    }
  });

  // Плавно прокручиваем к началу страницы
  if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
});
