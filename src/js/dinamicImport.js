let currentPage;
let currentProjectId;

export async function dinamicImport({ container, asscroll }) {
  const { init, styles } = await import(`/root/src/js/pages/${currentPage}.js`);
  container.classList.add('page-loaded');
  if (styles) container.innerHTML += `<style>${styles}</style>`;
  if (init) init(currentProjectId, asscroll);
}

export function linksClickHandler() {
  document.querySelectorAll('.item').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      currentPage = link.getAttribute('data-page');
      currentProjectId = link.getAttribute('id');
    });
  });
}
