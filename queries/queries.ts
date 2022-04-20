import { gql } from 'graphql-request'

export const GET_POSTS = gql`
  query GetPosts {
    posts {
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
      posts {
        title
        id
        created_at
      }
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    users_by_pk(id: $id) {
      name
      id
    }
  }
`
