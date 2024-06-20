// 🔨todo CMS - strapi🔨

const projects = [
	{
		id: 'project1',
		topImg: 'project1.png',
		infotxt: 'Front End + CMS headless',
		livedemo: 'https://ecommerce-nextjs-sanity-olive.vercel.app/',
		tecs: ['next_w.svg', 'react.svg', 'sanity.svg', 'ts.svg'],
		images: ['p1_img1.png', 'p1_img2.png'],
		title: 'Landing Page',
		texts: [
			`Este proyecto es un demo de un Ecommerce, en el Front End usa next.js con typescript y en el Back End usa strapi ( CMS Headless).  
      <br />
      El Front esta desplegado en vercel y el Back End en Heroku.
      <br />
Al usar un headless cms se simplifica la administración de los datos  en gran medida.`,
			// 2
			'Para los pagos usa Strapi por su simpleza de uso y popularidad entre la comunidad, permitiendo pagos con tarjetas de crédito y una fácil administración de los pagos .',
		],
	},
	{
		id: 'project2',
		topImg: 'project2.png',
		infotxt: 'Front End',
		livedemo: 'https://carlosrofts.github.io/landingpage_tatto/',
		tecs: ['vite.svg', 'js.svg', 'threejs_w.svg', 'gsap.svg'],
		title: 'Ecommerce',
		images: ['p2_img1.png', 'p2_img2.png'],
		texts: [
			`Portafolio - Landing page de un Estudio de Totto ficticio. El objetivo de este proyecto es experimentar con librarías como Three.js,  Gsap, Barba.js  para lograr un sitio estilo awwwards.
  <br />
La interfaz esta diseñada para ser interactiva para el usuario,, buscando sorprenderlo de forma creativa , el uso de patrones de animaciones ui es fundamental  para lograrlo.. 
<br />
Esta elaborado en JS, HTML y CSS.  Use vite  para facilitar la estructura de las carpetas con ESM node.js. `,
			`Hacer las animaciones fue un desafió importante debido a la interactividad con el scroll y el puntero, además de la elaboración de componentes interactivos reutilizables.
<br />
se hace uso de buenas practicas  tanto en codigo como diseño ui. 
<br />
Para poder apreciar las animaciones visita el live demo

`,
		],
	},
	{
		id: 'project3',
		topImg: 'project3.png',
		infotxt: 'Componentes Front End',
		livedemo: 'https://carlosrofts.github.io/componentes_altheasys/',
		tecs: ['vite.svg', 'js.svg', 'threejs_w.svg', 'gsap.svg'],
		title: 'Componentes',
		images: ['p3_img1.png', 'p3_img2.png'],
		texts: [
			`
Este proyecto consiste en una lista donde destaco los componentes mas destacados que elabore para la empresa Althea Sys. Dichos componentes  fueron usados en cursos <b>E-learning</b>.
<br />
Los componentes fueron elaborados 100% por su servidor, estan hechos en javascript ES6+, css3 y html5. Como dato extra algunos componentes utilizan <b>Canvas</b>, <b>Gsap</b>, <b>Phaser3</b>,  <b>ThreeJS</b>.
<br />
Por motivos de presentación use vite como empaquetador para facilitar la estructura de las carpetas con ESM node.js `,

			`Estos componentes cumplieron con la demanda de creatividad e innovación que los clientes de Althea Sys. esperaban ya que recibieron muy buenos comentarios. A demás disfrute del proceso y aprendi cosas nuevas en cada desafio que se presento.
      <br />
El codigo y el live demo estan en github abierto para el publico.`,
		],
	},
];
export default projects;
