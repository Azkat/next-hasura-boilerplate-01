export interface Post {
  title: string
  id: string
  description: string
  created_at: string
  user: {
    name: string
    id: string
  }
}

export interface User {
  name: string
  id: string
}
