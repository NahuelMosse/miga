document.documentElement.classList.add('js');

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const reveals = document.querySelectorAll('.reveal');
if (reduced || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('is-in'));
} else {
  const onView = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      onView.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  reveals.forEach((el) => onView.observe(el));
}

const bar = document.querySelector('[data-orderbar]');
const heroCta = document.querySelector('[data-hero-cta]');
if (bar && heroCta && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    bar.classList.toggle('is-shown', !entry.isIntersecting);
  }).observe(heroCta);
} else if (bar) {
  bar.classList.add('is-shown');
}

if (!reduced) {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    const target = link && document.getElementById(link.getAttribute('href').slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', link.getAttribute('href'));
  });
}
