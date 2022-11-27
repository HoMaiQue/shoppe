import { AuthResponse } from 'src/types'
import http from 'src/utils/http'

export const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>('/register', body)
  }
}