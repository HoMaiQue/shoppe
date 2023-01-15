export type Role = 'USER' | 'ADMIN'

export interface User {
  _id: string
  roles: Role[]
  email: string
  name?: string
  avatar?: string
  date_of_birth?: string //ISO 8601
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}
