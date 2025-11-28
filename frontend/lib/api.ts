import * as React from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  console.error('⚠️ NEXT_PUBLIC_API_URL não está definida!')
}

const getApiUrl = () => {
  if (!API_URL) {
    return 'http://localhost:8000'
  }
  return API_URL
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string; status: number }> {
  const url = `${getApiUrl()}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    const data = await response.json()

    return {
      data: response.ok ? data : undefined,
      error: !response.ok ? (data.message || 'Erro na requisição') : undefined,
      status: response.status,
    }
  } catch (error) {
    console.error('Erro na requisição:', error)
    return {
      error: 'Não foi possível conectar ao servidor',
      status: 0,
    }
  }
}

export const api = {
  login: async (email: string, password: string) => {
    return apiRequest<{ accessToken: string; refreshToken: string }>(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    )
  },

  register: async (name: string, email: string, password: string) => {
    return apiRequest<{ message: string }>(
      '/api/auth/register',
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      }
    )
  },

  healthCheck: async () => {
    return apiRequest('/health')
  },
}

export function useApiHealth() {
  const [isHealthy, setIsHealthy] = React.useState<boolean | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const checkHealth = async () => {
      setIsLoading(true)
      const { status } = await api.healthCheck()
      setIsHealthy(status === 200)
      setIsLoading(false)
    }

    checkHealth()
  }, [])

  return { isHealthy, isLoading }
}
