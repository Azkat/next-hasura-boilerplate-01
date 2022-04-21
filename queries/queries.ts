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
