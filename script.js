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
  const copyIcon = document.querySelector('.copy-icon');

  // Получаем высоту хедера для смещения скролла
  const header = document.querySelector('.header');
  const HEADER_OFFSET = header ? header.offsetHeight : 80;

  // === Функции и логика темы ===
  function updateThemeIcons() {
    const isLight = html.getAttribute('data-theme') === 'light';
    sunIcon.style.display = isLight ? 'inline' : 'none';
    moonIcon.style.display = isLight ? 'none' : 'inline';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isLight = html.getAttribute('data-theme') === 'light';
      html.setAttribute('data-theme', isLight ? 'dark' : 'light');
      updateThemeIcons();
    });
  }

  if (!html.getAttribute('data-theme')) {
    html.setAttribute('data-theme', 'dark'); 
  }
  updateThemeIcons();

  // === Логика мобильного меню ===
  if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
    });
  }

  // === Логика приветствия (Greeting Block) ===
  function showGreeting(name) {
    console.log('showGreeting called with name:', name);
    if (g) {
      g.textContent = name ? `Привет, ${name}!` : 'Добро пожаловать!';
    } else {
      console.error('Greeting element not found');
    }
  }

  function proceedToSite() {
    console.log('proceedToSite called');
    if (greetingBlock) {
      greetingBlock.classList.add('hidden');
      setTimeout(() => {
        greetingBlock.style.display = 'none';
        console.log('Greeting block hidden');
      }, 600);
    } else {
      console.error('greetingBlock not found');
    }
  }

  function askName() {
    console.log('askName called');
    const name = prompt('Как тебя зовут?') || '';
    console.log('Prompt returned:', name);
    if (name && name.trim()) {
      localStorage.setItem('visitorName', name.trim());
      console.log('Name saved:', localStorage.getItem('visitorName'));
    } else {
      localStorage.removeItem('visitorName');
      console.log('Name removed');
    }
    showGreeting(localStorage.getItem('visitorName'));
    proceedToSite();
  }

  if (g && btn && greetingBlock) {
    console.log('All elements found:', { g, btn, greetingBlock });
    greetingBlock.style.display = 'flex';
    const savedName = localStorage.getItem('visitorName');
    console.log('Saved name:', savedName);
    showGreeting(savedName);
    if (savedName) {
      console.log('Scheduling hide in 1.5s');
      setTimeout(proceedToSite, 1500);
    } else {
      console.log('Adding click listener to btn');
      btn.addEventListener('click', askName);
      btn.addEventListener('touchstart', askName);
    }
  } else {
    console.error('Missing elements:', { g, btn, greetingBlock });
  }

  // === Логика копирования email ===
  if (copyIcon) {
    copyIcon.addEventListener('click', function() {
      const email = copyIcon.getAttribute('data-email');
      navigator.clipboard.writeText(email).then(() => {
        console.log('Email copied:', email);
        const feedback = document.createElement('span');
        feedback.className = 'copy-feedback';
        feedback.textContent = 'Скопировано!';
        copyIcon.parentNode.appendChild(feedback);
        feedback.classList.add('show');
        setTimeout(() => {
          feedback.classList.remove('show');
          setTimeout(() => feedback.remove(), 300);
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy email:', err);
      });
    });

    // Поддержка копирования по нажатию Enter для доступности
    copyIcon.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyIcon.click();
      }
    });
  }

  // === ГАРАНТИРОВАННЫЙ ПЛАВНЫЙ СКРОЛЛ ===
  function smoothScrollToTarget(target) {
    if (!target) {
      console.error('Target element not found');
      return;
    }
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    console.log('Scrolling to:', target, 'Position:', targetPosition);
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (target && id !== '#') { 
        e.preventDefault();
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
        }
        smoothScrollToTarget(target);
        history.pushState(null, '', id);
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const { hash } = window.location;
    const target = hash ? document.querySelector(hash) : null;
    if (target && hash !== '#') {
      console.log('Initial scroll to hash:', hash);
      setTimeout(() => smoothScrollToTarget(target), 100);
    }
  });

  // === Логика формы обратной связи ===
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Отправка...';
      submitBtn.disabled = true;

      setTimeout(() => {
        formStatus.textContent = 'Сообщение отправлено!';
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        setTimeout(() => formStatus.style.display = 'none', 5000);
      }, 1500);
    });
  }

  // === Логика кнопки "Наверх" ===
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
