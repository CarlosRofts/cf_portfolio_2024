import './style.css';
// import setupCounter from './counter';
import Sketch from './threeScene';

import fetchProjects from './fetchProjects';

async function obtenerProyectos() {
  try {
    const proyectos = await fetchProjects();
    console.log(proyectos);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
  }
}

// Llamada a la función para obtener proyectos
// obtenerProyectos();

new Sketch({
  domElement: document.getElementById('container'),
});
