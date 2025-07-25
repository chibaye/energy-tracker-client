const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Handle empty responses (like DELETE)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return null;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all usage records
  async getAllUsage() {
    return this.request('/usage');
  }

  // Get single usage record by ID
  async getUsageById(id) {
    return this.request(`/usage/${id}`);
  }

  // Create new usage record
  async createUsage(data) {
    return this.request('/usage', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update usage record
  async updateUsage(id, data) {
    return this.request(`/usage/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete usage record
  async deleteUsage(id) {
    return this.request(`/usage/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();