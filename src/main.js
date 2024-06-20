import './css/libs/bootstrap-grid.css';
import './css/colors.css';
import './css/fonts.css';
import './css/base.css';
import './css/layout.css';
import './css/theme.css';
import Sketch from './threeScene';
import animateScrollSvg from './js/animations';

// import fetchProjects from './fetchProjects';

// async function obtenerProyectos() {
//   try {
//     const proyectos = await fetchProjects();
//     console.log(proyectos);
//   } catch (error) {
//     console.error('Error al obtener proyectos:', error);
//   }
// }

// Llamada a la función para obtener proyectos
// obtenerProyectos();

// 🔨 hacer alguna animacion de entrada o loader

// const p = window.location.pathname;
console.log('window.location.href', window.location.href);
console.log('import.meta.env.BASE_URL', import.meta.env.BASE_URL);

const url = import.meta.env.BASE_URL;
if (url.includes('.html')) {
	console.log('contiene .html');
}

new Sketch({
	domElement: document.getElementById('container'),
});

animateScrollSvg();
