export interface Error {
  status?: number
  message?: string
}

export interface UserType {
  name: string
  slug: string
  email: string
  password: string
  address: string
  phone: string
  image?: string
  order: []
}
