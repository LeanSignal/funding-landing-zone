(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const groups = [
    '.section-block:not(.hero)',
    '.section-panel',
    '.text-panel',
    '.symptoms-panel',
    '.feature-card',
    '.era-card',
    '.chart-card',
    '.principle-item',
    '.team-card',
    '.cta-card'
  ];

  const revealItems = Array.from(document.querySelectorAll(groups.join(',')));

  revealItems.forEach((item) => {
    item.dataset.reveal = item.matches('.feature-card, .era-card, .principle-item, .team-card, .cta-card') ? 'card' : 'section';
  });

  const staggerGroups = [
    '.feature-grid',
    '.timeline',
    '.principles-grid',
    '.team-grid',
    '.cta-grid',
    '.split-grid'
  ];

  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        child.style.setProperty('--reveal-delay', `${Math.min(index * 90, 270)}ms`);
      });
    });
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -8% 0px'
  });

  revealItems.forEach((item) => observer.observe(item));
})();