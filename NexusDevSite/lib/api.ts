// API client for frontend-backend communication

const API_BASE_URL = '/api'

interface ContactFormData {
  name: string
  email: string
  company?: string
  projectType?: string
  budget?: string
  message: string
}

interface NewsletterData {
  email: string
}

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
}

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Get all content
  async getContent() {
    return this.request('/content')
  }

  // Get specific content section
  async getContentSection(section: string) {
    return this.request(`/content/${section}`)
  }

  // Update content section (for CMS)
  async updateContentSection(section: string, data: any) {
    return this.request('/content', {
      method: 'PUT',
      body: JSON.stringify({ section, data }),
    })
  }

  // Submit contact form
  async submitContactForm(formData: ContactFormData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  }

  // Subscribe to newsletter
  async subscribeNewsletter(data: NewsletterData) {
    return this.request('/newsletter', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }
}

export const api = new ApiClient()
export type { ContactFormData, NewsletterData, ApiResponse }