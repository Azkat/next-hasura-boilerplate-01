import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import firebase from '../firebaseConfig'
import {
  UPDATE_USER_NAME,
  UPDATE_USER_EMAIL,
  UPDATE_POST,
  DELETE_POST,
  CREATE_LIKE,
  DELETE_LIKE,
  DELETE_ACCOUNT,
  DELETE_USER_PROFILE,
  UPDATE_POST_PICKEDUP,
} from '../queries/queries'
import {
  UpdateUserName,
  UpdateUserProfileEmail,
  UpdatePost,
  CreateLike,
  UserLikes,
  DeleteLike,
  DeleteAccount,
  DeleteUserProfile,
  UpdatePostPickedup,
} from '../types/types'
import { useSelector, useDispatch } from 'react-redux'
import { resetEditedPost, selectPost } from '../slices/uiSlice'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient
const HASURA_TOKEN_KEY = 'https://hasura.io/jwt/claims'

export const useAppMutate = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const editedPost = useSelector(selectPost)

  useEffect(() => {
    const now = new Date()
    const expireTimestamp = cookie.get('token_expire')

    if (now > expireTimestamp) {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const token = await user.getIdToken(true)
          const idTokenResult = await user.getIdTokenResult()
          const hasuraClaims = await idTokenResult.claims[HASURA_TOKEN_KEY]
          await cookie.set('token', token, { path: '/' })
        }
      })

      cookie.set('token_expire', Date.now() + 1000 * 60 * 60, { path: '/' })
    }
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token_expire')])

  useEffect(() => {
    if (cookie.get('token')) {
      graphQLClient = new GraphQLClient(endpoint, {
        headers: {
          Authorization: `Bearer ${cookie.get('token')}`,
        },
      })
    }
  }, [cookie.get('token')])

  const updatePostMutation = useMutation(
    (updateParam: UpdatePost) =>
      graphQLClient.request(UPDATE_POST, updateParam),
    {
      onSuccess: (res, variables) => {
        const previousPosts =
          queryClient.getQueryData<UpdatePost[]>('userposts')
        if (previousPosts) {
          queryClient.setQueryData<UpdatePost[]>(
            'userposts',
            previousPosts.map((post) =>
              post.id === variables.id ? res.update_posts_by_pk : post
            )
          )
        }
        dispatch(resetEditedPost())
      },
      onError: (res) => {},
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  const deletePostMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_POST, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousPosts =
          queryClient.getQueryData<UpdatePost[]>('userposts')
        if (previousPosts) {
          queryClient.setQueryData<UpdatePost[]>(
            'userposts',
            previousPosts.filter((post) => post.id !== variables)
          )
        }
        dispatch(resetEditedPost())
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  const updateUserNameMutation = useMutation(
    (updateParam: UpdateUserName) =>
      graphQLClient.request(UPDATE_USER_NAME, updateParam),
    {
      onSuccess: (res) => {},
      onError: (res) => {},
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  const updateUserProfileEmailMutaion = useMutation(
    (updateParam: UpdateUserProfileEmail) =>
      graphQLClient.request(UPDATE_USER_EMAIL, updateParam),
    {
      onSuccess: (res) => {},
      onError: () => {},
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  const deleteAccountMutation = useMutation(
    (param: DeleteAccount) => graphQLClient.request(DELETE_ACCOUNT, param),
    {
      onSuccess: (res) => {},
      onError: () => {},
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  const deleteUserProfileMutation = useMutation(
    (param: DeleteUserProfile) =>
      graphQLClient.request(DELETE_USER_PROFILE, param),
    {
      onSuccess: (res) => {},
      onError: () => {},
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  const createLikeMutation = useMutation(
    (param: CreateLike) => graphQLClient.request(CREATE_LIKE, param),
    {
      onSuccess: (res, variables) => {
        const previousLikes = queryClient.getQueryData<UserLikes[]>('likes')
        if (previousLikes) {
          queryClient.setQueryData('likes', [
            ...previousLikes,
            res.insert_likes_one,
          ])
        }
      },
      onError: (res) => {},
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  const deleteLikeMutation = useMutation(
    (param: DeleteLike) => graphQLClient.request(DELETE_LIKE, param),
    {
      onSuccess: (res, variables) => {
        const previousLikes = queryClient.getQueryData<UserLikes[]>('likes')
        if (previousLikes) {
          queryClient.setQueryData<UserLikes[]>(
            'likes',
            previousLikes.filter((like) => like.id !== variables.id)
          )
        }
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  const updatePostPickedupMutaion = useMutation(
    (updateParam: UpdatePostPickedup) =>
      graphQLClient.request(UPDATE_POST_PICKEDUP, updateParam),
    {
      onSuccess: (res) => {
        console.log(res)
      },
      onError: () => {},
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  return {
    updateUserNameMutation,
    updateUserProfileEmailMutaion,
    updatePostMutation,
    deletePostMutation,
    createLikeMutation,
    deleteLikeMutation,
    deleteAccountMutation,
    deleteUserProfileMutation,
    updatePostPickedupMutaion,
  }
}
