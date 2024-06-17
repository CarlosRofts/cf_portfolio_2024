import projects from './data/projectsData';

export default function getCurrentData(projectId) {
  const getByIdFind = (id) => projects.find((project) => project.id === id);
  const p = getByIdFind(projectId);
  console.log('getCurrentData', p);
  return p;
}
