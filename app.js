const OBSERVER = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('hidden-bottom')) {
        entry.target.classList.add('show-bottom');
      } else if (entry.target.classList.contains('hidden-left')) {
        entry.target.classList.add('show-left');
      }
    } else {
      entry.target.classList.remove('show-bottom');
      entry.target.classList.remove('show-left');
    }
  });
});

const HIDDEN_ELEMENTS = document.querySelectorAll('.hidden-bottom, .hidden-left');
HIDDEN_ELEMENTS.forEach((el) => OBSERVER.observe(el));
