/* shared scripts for nav, fade-in, hamburger, contact form */
(function () {
  const nav = document.querySelector('.nav');
  const links = document.querySelector('.nav__links');
  const burger = document.querySelector('.nav__hamburger');
  const heroSentinel = document.querySelector('[data-hero-sentinel]');

  // scroll state
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // hamburger
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-open');
      links.classList.toggle('is-open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('is-open');
      links.classList.remove('is-open');
    }));
  }

  // fade in on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  // hero / dark-nav handling — only on index
  if (heroSentinel) {
    nav.classList.add('is-on-dark');
    const heroIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) nav.classList.add('is-on-dark');
        else nav.classList.remove('is-on-dark');
      });
    }, { threshold: 0, rootMargin: '-60px 0px 0px 0px' });
    heroIO.observe(heroSentinel);
  }

  // contact form
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('is-sent');
    });
  }

  // portfolio filter
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    const items = document.querySelectorAll('.pf-item');
    filterBar.querySelectorAll('.filter-bar__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-bar__btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const cat = btn.dataset.filter;
        items.forEach(it => {
          const match = (cat === 'all') || it.dataset.category === cat;
          if (match) {
            it.classList.remove('is-hidden');
          } else {
            it.classList.add('is-hidden');
          }
        });
      });
    });
  }
})();
