import { Detail, Home, NotFound } from 'containers';

/**
 * Gets the route config for the router.
 * 
 * @returns {object[]} the route config
 */
const getRoutes = () => [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/:id',
    exact: true,
    component: Detail,
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default getRoutes;
