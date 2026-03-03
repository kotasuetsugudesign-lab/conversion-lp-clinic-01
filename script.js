/* =========================================
   青葉整骨院 LP - script.js
   演出強化・最終版
========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. ハンバーガーメニュー
  ========================================= */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  /* =========================================
     2. スクロールフェードイン
  ========================================= */
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  /* =========================================
     3. FAQアコーディオン
  ========================================= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const icon = item.querySelector('.faq-icon');

    if (!question) return;

    question.addEventListener('click', () => {

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherIcon) otherIcon.textContent = "＋";
        }
      });

      const isActive = item.classList.toggle('active');

      if (icon) icon.textContent = isActive ? "−" : "＋";
      question.setAttribute('aria-expanded', isActive);
    });
  });

  /* =========================================
     4. フォームバリデーション
  ========================================= */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        const errorMsg = field.parentElement.querySelector('.error-message');

        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('input-error');
          if (errorMsg) errorMsg.style.display = 'block';
        } else {
          field.classList.remove('input-error');
          if (errorMsg) errorMsg.style.display = 'none';
        }
      });

      if (isValid) {
        showSuccessMessage(contactForm);
        contactForm.reset();
      }
    });
  }

  /* =========================================
     5. スムーススクロール（header高さ自動取得）
  ========================================= */
  const header = document.querySelector('header');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      const headerOffset = header ? header.offsetHeight : 0;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* =========================================
     6. Heroテキスト順番表示
  ========================================= */
  const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-features, .hero-cta');

  heroElements.forEach((el, index) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.8s ease';
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 300 * index);
  });

  /* =========================================
     7. CTAパルス演出（ゆるめ）
  ========================================= */
  const heroBtn = document.querySelector('.hero-btn');

  if (heroBtn) {
    setInterval(() => {
      heroBtn.classList.add('pulse');
      setTimeout(() => heroBtn.classList.remove('pulse'), 800);
    }, 5000);
  }

  /* =========================================
     8. スクロールでヘッダー背景変化
  ========================================= */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* =========================================
     9. カウントアップ演出
  ========================================= */
  const counters = document.querySelectorAll('.count-up');

  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let count = 0;
      const speed = target / 60;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          el.textContent = Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = target;
        }
      };

      updateCount();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => countObserver.observe(counter));

});


/* =========================================
   成功メッセージ表示
========================================= */
function showSuccessMessage(form) {

  let existingMessage = form.querySelector('.success-message');
  if (existingMessage) existingMessage.remove();

  const message = document.createElement('p');
  message.textContent = '【デモ】送信完了の表示サンプルです。実際には送信されていません。';
  message.classList.add('success-message');

  form.appendChild(message);
}