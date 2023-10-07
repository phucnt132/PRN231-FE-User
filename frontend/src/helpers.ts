import { AUTH_TOKEN, REFRESH_TOKEN } from './constant'

export const getToken = () => {
  if (typeof window == 'undefined') return
  return localStorage.getItem(AUTH_TOKEN)
}

export const getRefreshToken = () => {
  if (typeof window == 'undefined') return
  return localStorage.getItem(REFRESH_TOKEN)
}

export const setToken = token => {
  if (typeof window == 'undefined') return
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export const setRefreshToken = refreshToken => {
  if (typeof window == 'undefined') return
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
  }
}

export const removeToken = () => {
  if (typeof window == 'undefined') return
  localStorage.removeItem(AUTH_TOKEN)
}

export const removeRefreshToken = () => {
  if (typeof window == 'undefined') return
  localStorage.removeItem(REFRESH_TOKEN)
}
