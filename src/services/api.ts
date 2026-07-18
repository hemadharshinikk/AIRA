const API_BASE_URL = import.meta.env.VITE_API_URL;



class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }
  

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // Auth methods
  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials: any) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Health records
  async createHealthRecord(record: any) {
    return this.request('/health/records', {
      method: 'POST',
      body: JSON.stringify(record)
    });
  }

  async getHealthRecords(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/health/records${queryString}`);
  }

  // Daily tracking
  async updateDailyTracking(data: any) {
    return this.request('/tracking/daily', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getTodayTracking() {
    return this.request('/tracking/daily/today');
  }

  async logWater(amount: number) {
    return this.request('/tracking/water', {
      method: 'POST',
      body: JSON.stringify({ amount })
    });
  }
}

export const apiService = new ApiService();
