import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import firebase from '../firebaseConfig'
import {
  UPDATE_USER_NAME,
  CREATE_USER,
  UPDATE_USER_EMAIL,
  // CREATE_TASK,
  // DELETE_TASK,
  // UPDATE_TASK,
  // CREATE_NEWS,
  // DELETE_NEWS,
  // UPDATE_NEWS,
} from '../queries/queries'
import {
  /* Task, EditTask, News, EditNews,  */ CreateUser,
  UpdateUserName,
  UpdateUserProfileEmail,
} from '../types/types'
import { useDispatch } from 'react-redux'
import { resetEditedTask, resetEditedNews } from '../slices/uiSlice'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient
const HASURA_TOKEN_KEY = 'https://hasura.io/jwt/claims'

export const useAppMutate = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

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

  const updateUserNameMutation = useMutation(
    (updateParam: UpdateUserName) =>
      graphQLClient.request(UPDATE_USER_NAME, updateParam),
    {
      onSuccess: (res) => {},
      onError: (res) => {
        console.log(res)
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  )

  const updateUserProfileEmailMutaion = useMutation(
    (updateParam: UpdateUserProfileEmail) =>
      graphQLClient.request(UPDATE_USER_EMAIL, updateParam),
    {
      onSuccess: (res) => {},
      onError: () => {},
    }
  )

  /* const createUserMutation = useMutation(
    (createUser: CreateUser) => graphQLClient.request(CREATE_USER, createUser),
    {
      onSuccess: (res) => {
        console.log(res)
      },
      onError: () => {
        dispatch(resetEditedTask())
      },
    }
  ) */

  /* const createTaskMutation = useMutation(
    (title: string) => graphQLClient.request(CREATE_TASK, { title: title }),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData('tasks', [
            ...previousTodos,
            res.insert_tasks_one,
          ])
        }
        dispatch(resetEditedTask())
      },
      onError: () => {
        dispatch(resetEditedTask())
      },
    }
  )

  const updateTaskMutation = useMutation(
    (task: EditTask) => graphQLClient.request(UPDATE_TASK, task),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.map((task) =>
              task.id === variables.id ? res.update_tasks_by_pk : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
      onError: () => {
        dispatch(resetEditedTask())
      },
    }
  )

  const deleteTaskMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_TASK, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )

  const createNewsMutation = useMutation(
    (content: string) =>
      graphQLClient.request(CREATE_NEWS, { content: content }),
    {
      onSuccess: (res) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData('news', [
            ...previousNews,
            res.insert_news_one,
          ])
        }
        dispatch(resetEditedNews())
      },
      onError: () => {
        dispatch(resetEditedNews())
      },
    }
  )

  const updateNewsMutation = useMutation(
    (news: EditNews) => graphQLClient.request(UPDATE_NEWS, news),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            'news',
            previousNews.map((news) =>
              news.id === variables.id ? res.update_news_by_pk : news
            )
          )
        }
        dispatch(resetEditedNews())
      },
      onError: () => {
        dispatch(resetEditedNews())
      },
    }
  )
  const deleteNewsMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_NEWS, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousNews = queryClient.getQueryData<News[]>('news')
        if (previousNews) {
          queryClient.setQueryData<News[]>(
            'news',
            previousNews.filter((news) => news.id !== variables)
          )
        }
        dispatch(resetEditedNews())
      },
    }
  ) */

  return {
    updateUserNameMutation,
    updateUserProfileEmailMutaion,
    //createUserMutation,
    // createTaskMutation,
    // updateTaskMutation,
    // deleteTaskMutation,
    // createNewsMutation,
    // updateNewsMutation,
    // deleteNewsMutation,
  }
}
