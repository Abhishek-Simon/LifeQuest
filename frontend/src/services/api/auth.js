import { apiClient } from './client';

export const authApi = {
  /**
   * Register a new user.
   * @param {string} email 
   * @param {string} password 
   */
  signup: async (email, password) => {
    return apiClient.post('/auth/signup', { email, password });
  },

  /**
   * Authenticate a user and receive an access token.
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{ access_token: string, token_type: string }>}
   */
  login: async (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },

  /**
   * Retrieve the current authenticated user's profile.
   * Requires a valid token in localStorage.
   */
  getMe: async () => {
    return apiClient.get('/auth/me');
  }
};
