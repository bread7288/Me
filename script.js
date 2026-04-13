// Scroll-based fade-in animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.interest-card, .work-placeholder, .about-card').forEach((el) => {
  el.classList.add('fade-in');
  observer.observe(el);
});
