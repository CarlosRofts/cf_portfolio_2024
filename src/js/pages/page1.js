// eslint-disable-next-line import/no-unresolved
import imagesLoaded from 'imagesloaded';
import css from '../../css/pages/page1.css?raw';
import getCurrentData from '../getCurrentData';

function getImageUrl(name) {
  // Use process.env.BASE_URL for Vite compatibility
  return new URL(`${process.env.BASE_URL}/dir/${name}.png`).href;
}

function renderProject(project) {
  // Renderizar la imagen superior
  const topImgElement = document.getElementById('topImg');
  if (topImgElement) {
    topImgElement.style.backgroundImage = `url(/img/${project.topImg})`;
  }

  const topInfoContainer = document.getElementById('topInfoContainer');
  const tecs = topInfoContainer.querySelector('#tecs');
  project.tecs.forEach((tec) => {
    tecs.innerHTML += `<img class="me-2" src="img/tecs/${tec}" alt="" />`;
  });
  const infotxt1 = topInfoContainer.querySelector('#infotxt1');
  infotxt1.innerHTML = project.infotxt;
  const livedemo = topInfoContainer.querySelector('#livedemo');
  livedemo.innerHTML = `<a href="${project.livedemo}" >${project.livedemo}</a>`;

  // Renderizar el título
  const titleElement = document.getElementById('title');
  if (titleElement) {
    titleElement.innerHTML = project.title;
  }

  // Renderizar las imágenes y textos
  project.images.forEach((image, index) => {
    const imgElement = document.getElementById(`img${index + 1}`);
    const textElement = document.getElementById(`text${index + 1}`);

    if (imgElement) {
      imgElement.src = `img/${image}`;
    }

    if (textElement) {
      textElement.innerHTML = project.texts[index] || '';
    }
  });

  document.querySelector('.inside').style.opacity = 1;
}

export const styles = css;

export function init(currentLinkId, asscroll) {
  // console.log('⭐✨⭐✨ page 1 ⭐✨⭐✨');
  console.log('init id-project:', currentLinkId);
  const dataProject = getCurrentData(currentLinkId);
  renderProject(dataProject);
  imagesLoaded(document.querySelector('body'), (instance) => {
    console.log('all images are loaded');
    asscroll.update();
    asscroll.resize();
  });
}
