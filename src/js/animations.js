import gsap from 'gsap';

export default function animateScrollSvg() {
  const mouseWheel = document.getElementById('mouse-wheel');

  // Define the animation timeline
  const timeline = gsap.timeline({ repeat: -1, yoyo: true });

  // Set the animation properties
  timeline.to(mouseWheel, {
    duration: 1, // Adjust duration for animation speed
    ease: 'power1.inOut', // Adjust ease for animation style
    x: -15, // Adjust x value for movement distance
  });
}
