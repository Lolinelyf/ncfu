document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.js-dropdown');

  function toggleDropdown(el) {
    const dropdownBtn = el.querySelector('.js-dropdown-btn');
    const dropdownContent = el.querySelector('.js-dropdown-content');

    dropdownContent.classList.toggle('active');
    dropdownBtn.classList.toggle('open');
  }

  dropdowns.forEach((el) => {
    el.querySelector('.js-dropdown-btn').addEventListener('click', () => {
      toggleDropdown(el);
    });
  });

  window.addEventListener(
    'click',
    (event) => {
      dropdowns.forEach((el) => {
        const dropdownBtn = el.querySelector('.js-dropdown-btn');
        const dropdownContent = el.querySelector('.js-dropdown-content');

        if (event.target !== dropdownBtn) {
          if (dropdownContent.classList.contains('active')) {
            dropdownContent.classList.remove('active');
            dropdownBtn.classList.remove('open');
          }
        }
      });
    },
    // false,
  );
});
