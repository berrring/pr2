document.addEventListener('DOMContentLoaded', function() {
  // === Переменные и элементы ===
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const html = document.documentElement;
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const g = document.getElementById('greeting');
  const btn = document.getElementById('askName');
  const greetingBlock = document.getElementById('greetingBlock');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  // === Функции и логика темы ===

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

  if (!html.getAttribute('data-theme')) {
      html.setAttribute('data-theme', 'dark'); 
  }
  updateThemeIcons();

  // === Логика мобильного меню ===

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
    });
  }

  // === Логика приветствия (Greeting Block) ===

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
    const name = prompt('Как тебя зовут?');
    if (name && name.trim()) {
      localStorage.setItem('visitorName', name.trim());
    } else {
      localStorage.removeItem('visitorName');
    }
    showGreeting(localStorage.getItem('visitorName'));
    proceedToSite();
  }

  if (g && btn && greetingBlock) {
    greetingBlock.style.display = 'flex';
    
    const savedName = localStorage.getItem('visitorName');
    showGreeting(savedName);
    
    if (savedName) {
      setTimeout(proceedToSite, 1500);
    } else {
      btn.addEventListener('click', askName);
    }
  }

  // === ПЛАВНЫЙ СКРОЛЛ ЧЕРЕЗ JAVASCRIPT (Ваш вариант) ===

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      
      if (!target || id === '#') return;
      
      e.preventDefault(); 
      
      // Плавно прокручиваем, полагаясь на CSS-свойство scroll-margin-top
      target.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
      
      history.pushState(null, '', id);

      // Закрываем мобильное меню, если оно активно
      if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
      }
    });
  });

  // Прокрутка при загрузке страницы с хэшем (#id)
  window.addEventListener('load', () => {
    const { hash } = window.location;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
          // Плавно прокручиваем к секции при загрузке
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });


  // === Логика формы обратной связи ===

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


  // === Логика кнопки "Наверх" (Ваш рабочий пример) ===

  if (scrollTopBtn) {
      const SHOW_AFTER = 300;

      window.addEventListener('scroll', () => {
          if (window.scrollY > SHOW_AFTER) {
            scrollTopBtn.classList.add('show');
          } else {
            scrollTopBtn.classList.remove('show');
          }
      });

      scrollTopBtn.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
});
