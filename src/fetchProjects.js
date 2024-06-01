import { VITE_API_URL, API_URL } from '../config';

const fetchProjectsGraphQl = async () => {
  const queryGraphql = `
    {
      projects(orderBy: {projectDate: ASC}) {
        data {
          attributes {
            projectName
            projectDate
          }
        }
      }
    }
  `;
  const query = '/projects?_sort=projectDate:ASC';
  console.log('VITE_API_URL', VITE_API_URL);
  const response = await fetch(VITE_API_URL, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  console.log('data', data);
  return data;
};
const fetchProjects = async () => {
  try {
    const response = await fetch(`${VITE_API_URL}/projects?_sort=projectDate:ASC`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener proyectos: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    throw error;
  }
};

export default fetchProjects;
