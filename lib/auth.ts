// Simple admin authentication
const ADMIN_CREDENTIALS = {
  username: process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin',
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'cheetah2024'
}

export const authenticateAdmin = (username: string, password: string): boolean => {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('isAdmin') === 'true'
}

export const login = (username: string, password: string): boolean => {
  if (authenticateAdmin(username, password)) {
    localStorage.setItem('isAdmin', 'true')
    return true
  }
  return false
}

export const logout = (): void => {
  localStorage.removeItem('isAdmin')
}