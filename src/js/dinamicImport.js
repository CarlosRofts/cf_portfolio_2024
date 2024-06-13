export default async function dinamicImport({ id, container }) {
  const { init, styles } = await import(`/root/src/js/${id}.js`);
  console.log('DINAMIC IMPORT', styles);
  // const container = document.querySelector('[scroll-wrap]');
  if (styles) container.innerHTML += `<style>${styles}</style>`;
  if (init) init();
  debugger;
}
