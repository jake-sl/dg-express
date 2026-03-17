document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  const currentPage = document.body.dataset.page;
  if (currentPage && navLinks) {
    navLinks.querySelectorAll('a[data-page]').forEach(link => {
      if (link.dataset.page === currentPage) link.classList.add('active');
    });
  }

  document.querySelectorAll('form[data-async]').forEach(form => {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!status) return;
      status.textContent = 'Sending...';
      status.className = 'form-status visible';
      try {
        await fetch(form.action, {
          method: form.method || 'POST',
          body: new FormData(form),
          mode: 'no-cors'
        });
        status.textContent = form.dataset.success || 'Thanks - we received your request and will contact you soon.';
        status.classList.add('success');
        form.reset();
      } catch (err) {
        status.textContent = form.dataset.error || 'Something went wrong. Please try again or call 912-434-1499.';
        status.classList.add('error');
      }
    });
  });


  document.querySelectorAll('[data-cookie-toggle]').forEach(toggle => {
    const key = toggle.dataset.cookieToggle;
    const saved = localStorage.getItem(key);
    if (saved === 'on') toggle.checked = true;
    toggle.addEventListener('change', () => {
      localStorage.setItem(key, toggle.checked ? 'on' : 'off');
    });
  });
});
