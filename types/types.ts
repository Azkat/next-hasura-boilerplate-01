export interface Post {
  title: string
  id: string
  description: string
  created_at: string
  user: {
    id: string
    name: string
  }
}
export interface User {
  id: string
  name: string
  posts: Array<{
    id: string
    title: string
    created_at: string
    description: string
  }>
}
export interface CreateUser {
  firebase_id: string
  email: string
}
export interface Rocket {
  company: string
  country: string
  id: string
  diameter: {
    meters: number
  }
  engines: {
    number: number
    version: string
  }
}
