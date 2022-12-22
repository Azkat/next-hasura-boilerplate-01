import { gql } from 'graphql-request'

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      title
      id
      description
      created_at
      image_url
      audio_url
      user {
        id
        name
      }
    }
  }
`

export const GET_FIRST_POSTS = gql`
  query GetPosts {
    posts(order_by: { created_at: desc }, limit: 100) {
      title
      id
      description
      created_at
      image_url
      audio_url
      user {
        id
        name
      }
    }
  }
`

export const GET_NEXT_POSTS = gql`
  query GetPosts($offset: Number!) {
    posts(order_by: { created_at: desc }, limit: 10, offset: $offset) {
      title
      id
      description
      created_at
      image_url
      audio_url
      user {
        id
        name
      }
    }
  }
`

export const GET_POST_BY_ID_PK = gql`
  query GetPostByIdPk($id: uuid!) {
    posts_by_pk(id: $id) {
      title
      id
      description
      created_at
      image_url
      audio_url
      user {
        name
        id
      }
    }
  }
`
export const GET_USER_POSTS = gql`
  query GetUserPosts($user_id: uuid!) {
    posts(where: { user_id: { _eq: $user_id } }) {
      id
      title
      description
      created_at
      image_url
      audio_url
    }
  }
`
export const GET_USERS = gql`
  query GetUsers {
    users {
      name
      id
    }
  }
`
export const GET_USERBY_ID = gql`
  query MyQuery($id: uuid!) {
    users(where: { id: { _eq: $id } }) {
      id
      name
      bio
      website
    }
  }
`

export const GET_USERBY_ID_PK = gql`
  query MyQuery($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name

      website
      bio
      posts {
        id
        title
        created_at
        description
      }
    }
  }
`

export const GET_USER_BY_FIREBASEID = gql`
  query GetUserByFirebaseId($firebase_id: String!) {
    users(where: {firebase_id: {_eq: firebase_id: $firebase_id}}) {
      id
      name
      posts {
        id
        title
        created_at
        description
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($firebase_id: String!, $email: String!) {
    insert_users_one(
      object: {
        firebase_id: $firebase_id
        user_profiles: { data: { email: $email } }
      }
    ) {
      id
    }
  }
`
export const UPDATE_PROFILE = gql`
  mutation UpdateUserName(
    $id: uuid!
    $name: String!
    $bio: String!
    $website: String!
  ) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, bio: $bio, website: $website }
    ) {
      id
    }
  }
`

export const UPDATE_USER_NAME = gql`
  mutation UpdateUserName($id: uuid!, $name: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
    }
  }
`

export const UPDATE_USER_EMAIL = gql`
  mutation UpdateUserProfileEmail($id: uuid!, $email: String!) {
    update_user_profiles(
      where: { user_id: { _eq: $id } }
      _set: { email: $email }
    ) {
      returning {
        email
        id
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $description: String
    $audio_url: String
    $image_url: String
    $user_id: uuid!
  ) {
    insert_posts_one(
      object: {
        title: $title
        description: $description
        audio_url: $audio_url
        image_url: $image_url
        user_id: $user_id
      }
    ) {
      id
    }
  }
`
export const UPDATE_POST = gql`
  mutation UpdatePost($id: uuid!, $title: String!, $description: String!) {
    update_posts_by_pk(
      pk_columns: { id: $id }
      _set: { title: $title, description: $description }
    ) {
      id
      title
      description
    }
  }
`

export const GET_USER_LIKES = gql`
  query MyQuery($user_id: uuid!) {
    likes(where: { user_id: { _eq: $user_id } }) {
      id
      post_id
      user_id
    }
  }
`

export const DELETE_POST = gql`
  mutation DeletePost($id: uuid!) {
    delete_posts_by_pk(id: $id) {
      id
      title
      description
    }
  }
`

export const CREATE_LIKE = gql`
  mutation MyMutation($user_id: uuid!, $post_id: uuid!) {
    insert_likes_one(object: { post_id: $post_id, user_id: $user_id }) {
      id
      post_id
      user_id
    }
  }
`
export const DELETE_LIKE = gql`
  mutation DeleteLike($id: uuid!) {
    delete_likes_by_pk(id: $id) {
      id
      post_id
      user_id
    }
  }
`
export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: uuid!) {
    delete_likes(where: { user_id: { _eq: $id } }) {
      affected_rows
    }
    delete_posts(where: { user_id: { _eq: $id } }) {
      affected_rows
    }
    delete_users_by_pk(id: $id) {
      id
    }
  }
`

export const DELETE_USER_PROFILE = gql`
  mutation DeleteUserProfile($id: uuid!) {
    delete_user_profiles(where: { user_id: { _eq: $id } }) {
      affected_rows
      returning {
        email
        id
        user_id
      }
    }
  }
`
