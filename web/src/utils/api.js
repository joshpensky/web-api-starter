import { HTTP_METHODS } from 'utils/constants';

const BASE_API_URL = '/api/v1';

/**
 * @async
 * Parses the given response to get the data, ok, and status
 * within it.
 *
 * @param {Response} response the response received resolved from
 * an API fetch
 * @returns {object} a parsed response, containing the response
 * data, ok, and status
 */
const parseResponse = async response => {
  const { ok, status } = response;
  let data = await response.text();
  try {
    data = JSON.parse(data);
  } catch (err) {
    // pass, data is text
  }
  return { data, ok, status };
};

/**
 * Creates a query string from the given query object.
 *
 * @param {Record<string, any>} queryObj the object to turn into
 * a query string
 * @returns {string} the resulting query string
 */
const getQueryString = queryObj =>
  Object.entries(queryObj)
    .map(kv => kv.map(encodeURIComponent).join('='))
    .join('&');

/**
 * Gets the options to send for the fetch request, including headers
 * for content type and authorization, method, and body.
 *
 * @param {string} method the method to use in the request
 * @param {object} options the passed options object
 * @param {object|array} [options.body] a JSON body to include in
 * the request
 * @param {string} [options.token] a Bearer token for authorization
 * @returns {object} the compiled options object
 */
const getOptions = (method, { body, token }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let options = {
    method,
    headers,
  };

  if (method === HTTP_METHODS.POST || method === HTTP_METHODS.PUT) {
    options = Object.assign(options, { body: JSON.stringify(body) });
  }

  return options;
};

/**
 * @async
 * Calls an endpoint from the API with the given method, using the given
 * options.
 *
 * @param {string} endpoint the API endpoint to reach
 * @param {string} [method="GET"] the method to use for the endpoint
 * @param {object} [options] the API options
 * @param {Record<string, any>} [options.query] a record to condense into
 * a query string
 * @param {object|array} [options.body] a JSON object or array to send to
 * the endpoint as a body
 * @param {string} [options.token] a Bearer token used for authorization
 * @returns {Promise<any>} a promise that resolves in a valid API response,
 * or rejects with an invalid one
 */
const api = async (endpoint, method = HTTP_METHODS.GET, options = { query: {}, body: {} }) => {
  const { query, ...restOptions } = options;
  const queryString = query && Object.keys(query).length > 0 ? `?${getQueryString(query)}` : '';
  const fetchOptions = getOptions(method, restOptions);

  const body = await fetch(BASE_API_URL + endpoint + queryString, fetchOptions);
  const res = await parseResponse(body);
  if (!res.ok) {
    throw res.data;
  }
  return res.data;
};

/**
 * @async
 * Helper function for quickly calling a GET endpoint from the API, using
 * the given options.
 *
 * @param {string} endpoint the API endpoint to reach
 * @param {object} [options] the API options
 * @param {Record<string, any>} [options.query] a record to condense into
 * a query string
 * @param {object|array} [options.body] a JSON object or array to send to
 * the endpoint as a body
 * @param {string} [options.token] a Bearer token used for authorization
 * @returns {Promise<any>} a promise that resolves in a valid API response,
 * or rejects with an invalid one
 */
api.get = (endpoint, options) => api(endpoint, HTTP_METHODS.GET, options);

/**
 * @async
 * Helper function for quickly calling a POST endpoint from the API, using
 * the given options.
 *
 * @param {string} endpoint the API endpoint to reach
 * @param {object} [options] the API options
 * @param {Record<string, any>} [options.query] a record to condense into
 * a query string
 * @param {object|array} [options.body] a JSON object or array to send to
 * the endpoint as a body
 * @param {string} [options.token] a Bearer token used for authorization
 * @returns {Promise<any>} a promise that resolves in a valid API response,
 * or rejects with an invalid one
 */
api.post = (endpoint, options) => api(endpoint, HTTP_METHODS.POST, options);

/**
 * @async
 * Helper function for quickly calling a PUT endpoint from the API, using
 * the given options.
 *
 * @param {string} endpoint the API endpoint to reach
 * @param {object} [options] the API options
 * @param {Record<string, any>} [options.query] a record to condense into
 * a query string
 * @param {object|array} [options.body] a JSON object or array to send to
 * the endpoint as a body
 * @param {string} [options.token] a Bearer token used for authorization
 * @returns {Promise<any>} a promise that resolves in a valid API response,
 * or rejects with an invalid one
 */
api.put = (endpoint, options) => api(endpoint, HTTP_METHODS.PUT, options);

/**
 * @async
 * Helper function for quickly calling a DELETE endpoint from the API,
 * using the given options.
 *
 * @param {string} endpoint the API endpoint to reach
 * @param {object} [options] the API options
 * @param {Record<string, any>} [options.query] a record to condense into
 * a query string
 * @param {object|array} [options.body] a JSON object or array to send to
 * the endpoint as a body
 * @param {string} [options.token] a Bearer token used for authorization
 * @returns {Promise<any>} a promise that resolves in a valid API response,
 * or rejects with an invalid one
 */
api.delete = (endpoint, options) => api(endpoint, HTTP_METHODS.DELETE, options);

export default api;
