import { Home, NotFound } from 'containers';

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
    path: '*',
    component: NotFound,
  },
];

export default getRoutes;
