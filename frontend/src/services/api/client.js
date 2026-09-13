const API_URL = import.meta.env.VITE_API_URL;

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

/**
 * Base HTTP client that automatically attaches the auth token.
 */
async function fetchClient(endpoint, options = {}) {
  const token = localStorage.getItem('lq_access_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  // Stringify body if it's an object and Content-Type is JSON
  if (config.body && typeof config.body === 'object' && headers['Content-Type'] === 'application/json') {
    config.body = JSON.stringify(config.body);
  }

  let response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, config);
  } catch (error) {
    // Network error
    throw new ApiError('We couldn\'t connect to LifeQuest. Please try again.', 0, null);
  }

  let data;
  try {
    // If it's a 204 No Content, don't try to parse JSON
    if (response.status !== 204) {
      data = await response.json();
    }
  } catch (error) {
    // Couldn't parse JSON, usually means backend returned HTML or empty string on non-204
    data = null;
  }

  if (!response.ok) {
    // Extract a human-readable message if the backend provided one (e.g., FastAPI's detail field)
    let message = 'An unexpected error occurred.';
    
    if (data?.detail) {
      if (typeof data.detail === 'string') {
        message = data.detail;
      } else if (Array.isArray(data.detail) && data.detail.length > 0) {
        // FastAPI validation errors
        message = data.detail[0].msg || 'Validation error';
      }
    }
    
    throw new ApiError(message, response.status, data);
  }

  return data;
}

export const apiClient = {
  get: (endpoint, options) => fetchClient(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => fetchClient(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) => fetchClient(endpoint, { ...options, method: 'PUT', body }),
  patch: (endpoint, body, options) => fetchClient(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options) => fetchClient(endpoint, { ...options, method: 'DELETE' }),
};
