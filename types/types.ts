export interface Post {
  title: string
  id: string
  image_url: string
  audio_url: string
  description: string
  created_at: string
  visual_format: string
  pickedup: boolean
  user: {
    id: string
    name: string
  }
}
export interface User {
  id: string
  name: string
  profile_id: string
  bio: string
  website: string
  posts: Array<{
    id: string
    title: string
    image_url: string
    audio_url: string
    created_at: string
    description: string
    visual_format: string
  }>
}
export interface UpdateProfile {
  id: string
  name: string
  bio: string
  website: string
}
export interface CreateUser {
  firebase_id: string
  email: string
}
export interface CreatePost {
  title: string
  description: string
  audio_url: string
  image_url: string
  user_id: string
  visual_format: string
}
export interface UpdateUserName {
  id: string
  name: string
}
export interface UpdateUserProfileEmail {
  id: string
  email: string
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
export interface UserLikes {
  id: string
  post_id: string
  user_id: string
  created_at: string
}

export interface UserLikesShow {
  id: string
  post_id: string
  user_id: string
  created_at: string
  posts: Array<{
    id: string
    title: string
  }>
  users: Array<{
    id: string
    name: string
  }>
}

export interface DeleteLike {
  id: string
}

export interface DeleteAccount {
  id: string
}

export interface DeleteUserProfile {
  id: string
}

export interface UpdatePostPickedup {
  id: string
  pickedup: boolean
}
