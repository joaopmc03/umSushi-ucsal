export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const apiClient = {
  get: async (endpoint: string) => {
    console.log(`API GET: ${API_BASE_URL}${endpoint}`)
    throw new Error('API not implemented yet')
  },

  post: async (endpoint: string, data: any) => {
    console.log(`API POST: ${API_BASE_URL}${endpoint}`, data)
    throw new Error('API not implemented yet')
  },

  put: async (endpoint: string, data: any) => {
    console.log(`API PUT: ${API_BASE_URL}${endpoint}`, data)
    throw new Error('API not implemented yet')
  },

  delete: async (endpoint: string) => {
    console.log(`API DELETE: ${API_BASE_URL}${endpoint}`)
    throw new Error('API not implemented yet')
  },
}
