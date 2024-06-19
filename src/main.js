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

const p = window.location.pathname;
const l = window.location.href;
debugger;
// if (window.location.pathname !== '/') {
// 	if (window.location.pathname !== '/index.html') window.location.href = '/';
// }

new Sketch({
	domElement: document.getElementById('container'),
});

animateScrollSvg();
