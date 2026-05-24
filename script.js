/* ===========================
   RUSSIAN TYPOGRAPHY: non-breaking spaces after short words
=========================== */
(function fixTypography() {
  const pattern = /(\s)(и|а|в|на|с|к|за|по|из|до|от|для|без|под|над|об|при|но|или|что|как|же|бы|ли|не|ни|то|это|так|уже|со|во|со|чем|ещё|тут|раз|всё|кто|где)\s/gi;

  function walk(node) {
    if (node.nodeType === 3) {
      const fixed = node.textContent.replace(pattern, '$1$2 ');
      if (fixed !== node.textContent) node.textContent = fixed;
    } else if (
      node.nodeType === 1 &&
      !['SCRIPT','STYLE','INPUT','TEXTAREA','SELECT'].includes(node.tagName)
    ) {
      node.childNodes.forEach(walk);
    }
  }

  document.addEventListener('DOMContentLoaded', () => walk(document.body));
})();

/* ===========================
   HEADER SCROLL
=========================== */
const header = document.getElementById('header');
const stickyCta = document.getElementById('stickyCta');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
    stickyCta.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    stickyCta.classList.remove('visible');
  }
});

/* ===========================
   BURGER MENU
=========================== */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  burger.classList.toggle('active');
  if (burger.classList.contains('active')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('active');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ===========================
   PORTFOLIO FILTER
=========================== */
const tabs = document.querySelectorAll('.portfolio__tab');
const items = document.querySelectorAll('.portfolio__item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    items.forEach(item => {
      if (filter === 'all' || item.dataset.cat === filter) {
        item.style.display = '';
        item.style.animation = 'fadeInUp .4s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/* ===========================
   FAQ ACCORDION
=========================== */
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq__item');
    const answer = item.querySelector('.faq__answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq__item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq__answer').style.maxHeight = '0';
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* ===========================
   QUIZ
=========================== */
const quizSteps = {
  1: document.getElementById('quiz-step-1'),
  2: document.getElementById('quiz-step-2'),
  3: document.getElementById('quiz-step-3'),
  result: document.getElementById('quiz-step-result'),
};
const progressBar = document.getElementById('quiz-progress');
const totalSteps = 3;

let currentStep = 1;

function goToStep(step) {
  Object.values(quizSteps).forEach(s => s.classList.remove('active'));

  if (step === 'result') {
    quizSteps.result.classList.add('active');
    progressBar.style.width = '100%';
  } else {
    quizSteps[step].classList.add('active');
    progressBar.style.width = ((step - 1) / totalSteps * 100) + '%';
    currentStep = step;
  }
}

document.querySelectorAll('.quiz__option').forEach(btn => {
  btn.addEventListener('click', () => {
    const next = btn.dataset.next;
    btn.closest('.quiz__options').querySelectorAll('.quiz__option').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    setTimeout(() => {
      goToStep(next === 'result' ? 'result' : parseInt(next));
    }, 300);
  });
});

document.querySelector('.quiz__restart')?.addEventListener('click', () => {
  goToStep(1);
  progressBar.style.width = '0%';
  document.querySelectorAll('.quiz__option').forEach(b => b.classList.remove('selected'));
});

/* ===========================
   BOOKING FORM
=========================== */
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !phone) {
      shakeField(!name ? 'name' : 'phone');
      return;
    }

    // Simulate form send
    bookingForm.style.opacity = '0';
    bookingForm.style.transition = '.3s ease';

    setTimeout(() => {
      bookingForm.style.display = 'none';
      formSuccess.classList.add('visible');
    }, 300);
  });
}

function shakeField(id) {
  const el = document.getElementById(id);
  el.style.borderColor = '#e05555';
  el.style.animation = 'shake .4s ease';
  el.focus();
  setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 400);
}

/* ===========================
   PHONE MASK
=========================== */
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (!val.startsWith('7')) val = '7' + val;
    val = val.slice(0, 11);

    let formatted = '+7';
    if (val.length > 1) formatted += ' (' + val.slice(1, 4);
    if (val.length >= 4) formatted += ') ' + val.slice(4, 7);
    if (val.length >= 7) formatted += '-' + val.slice(7, 9);
    if (val.length >= 9) formatted += '-' + val.slice(9, 11);

    e.target.value = formatted;
  });
}

/* ===========================
   SCROLL ANIMATIONS
=========================== */
const animatedEls = document.querySelectorAll(
  '.service-card, .step-card, .review-card, .loyalty-card, ' +
  '.portfolio__item, .faq__item, .cert-item, .material-item, ' +
  '.hero__trust, .about__stats, .guarantee__content, .quiz__wrapper, ' +
  '.reviews__rating, .booking__form'
);

animatedEls.forEach(el => el.classList.add('fade-in'));

const sectionTitles = document.querySelectorAll('.section-title, .section-tag');
sectionTitles.forEach(el => el.classList.add('fade-in'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.fade-in')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animatedEls.forEach(el => io.observe(el));
sectionTitles.forEach(el => io.observe(el));

/* ===========================
   COOKIE BANNER
=========================== */
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');

if (!localStorage.getItem('cookie_accepted')) {
  setTimeout(() => cookieBanner.style.display = 'flex', 2000);
} else {
  cookieBanner.style.display = 'none';
}

cookieAccept?.addEventListener('click', () => {
  localStorage.setItem('cookie_accepted', '1');
  cookieBanner.classList.add('hidden');
});

/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* CSS keyframes for shake */
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleEl);
