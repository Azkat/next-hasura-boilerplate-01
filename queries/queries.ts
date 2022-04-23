import { gql } from 'graphql-request'

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      title
      id
      description
      created_at
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
      user {
        name
        id
      }
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
    }
  }
`
export const GET_USERBY_ID_PK = gql`
  query MyQuery($id: uuid!) {
    users_by_pk(id: $id) {
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
        user_profile: { data: { email: $email } }
      }
    ) {
      id
    }
  }
`
export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $description: String, $user_id: uuid!) {
    insert_posts_one(
      object: { title: $title, description: $description, user_id: $user_id }
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
export const GET_ROCKET = gql`
  query GetRocket($id: ID!) {
    rocket(id: $id) {
      id
      company
      country
      diameter {
        meters
      }
      engines {
        number
        version
      }
    }
  }
`
