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
  profile_id: string
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
export interface CreatePost {
  title: string
  description: string
  user_id: string
}
export interface UpdateUserName {
  id: string
  name: string
}
export interface UpdateUserProfileEmail {
  id: string
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
export interface UpdatePost {
  id: string
  title: string
  description: string
}
export interface CreateLike {
  user_id: string
  post_id: string
}
