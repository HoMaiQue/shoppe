import { AuthResponse } from 'src/types'
import http from 'src/utils/http'
export const URL_LOGIN = '/login'
export const URL_REGISTER = '/register'
export const URL_LOGOUT = '/logout'
export const URL_REFRESH_TOKEN = '/refresh-access-token'
export const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/register', body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/login', body)
  },
  logout() {
    return http.post('/logout')
  }
}
