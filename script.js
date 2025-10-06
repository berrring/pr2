// DOMContentLoaded: Ждём загрузки HTML, чтобы найти элементы (иначе ошибка).
document.addEventListener('DOMContentLoaded', function() {
  // Переключение темы: Находим элементы по ID.
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const html = document.documentElement; // <html> — корень для data-theme.

  themeToggle.addEventListener('click', function() {
    // Проверяем текущую тему (data-theme из CSS).
    const isLight = html.getAttribute('data-theme') === 'light';
    // Меняем тему: тернарный оператор (? :) — короткий if/else.
    html.setAttribute('data-theme', isLight ? 'dark' : 'light');

    // Меняем иконки: display 'block' — показ, 'none' — скрытие.
    sunIcon.style.display = isLight ? 'none' : 'block';
    moonIcon.style.display = isLight ? 'block' : 'none';
  });

  // Мобильное меню: Находим кнопку и меню.
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNav');

  mobileMenuToggle.addEventListener('click', function() {
    // Toggle 'active': Добавляет/убирает класс (CSS меняет display: flex).
    mobileNav.classList.toggle('active');
  });

  // Закрытие меню при клике на ссылку: forEach — цикл по всем <a>.
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Убираем 'active' — закрывает меню после навигации.
      mobileNav.classList.remove('active');
    });
  });

  // Форма: Находим форму и статус.
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Останавливает перезагрузку страницы (стандарт для форм).
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...'; // Имитация загрузки.
    submitBtn.disabled = true; // Блокируем повторный клик.

    // setTimeout: Ждёт 1.5 сек (имитация запроса), потом выполняет код.
    setTimeout(() => {
      formStatus.textContent = 'Message sent successfully!'; // Успех.
      formStatus.className = 'form-status success'; // Класс для зелёного стиля (CSS).
      formStatus.style.display = 'block'; // Показываем статус.
      contactForm.reset(); // Очищает поля формы.
      submitBtn.textContent = originalText; // Возвращаем текст.
      submitBtn.disabled = false;

      // Второй таймер: Скрывает статус через 5 сек.
      setTimeout(() => formStatus.style.display = 'none', 5000);
    }, 1500);
  });
});