import {
  useState,
  useCallback,
  useContext,
  ChangeEvent,
  FormEvent,
} from 'react'
import { Store } from '../reducer/reducer'
import { UPDATE_PROFILE } from '../queries/queries'
import { UpdateProfile } from '../types/types'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import { useEffect } from 'react'
import { useQueryUserById } from '../hooks/useQueryUserById'
import axios from 'axios'
import { useRouter } from 'next/router'

const cookie = new Cookie()
const endpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

export const useEditProfile = () => {
  const { status, data } = useQueryUserById(cookie.get('user_id'))
  const router = useRouter()

  const [name, setName] = useState('')
  const [website, setWebsite] = useState('')
  const [bio, setBio] = useState('')

  const { state, dispatch } = useContext(Store)

  const updateProfileMutation = useMutation(
    (updateProfile: UpdateProfile) =>
      graphQLClient.request(UPDATE_PROFILE, updateProfile),
    {
      onSuccess: (res) => {
        router.replace('/account')
      },
      onError: (res) => {
        console.log(res)
      },
    }
  )

  useEffect(() => {
    if (status == 'success') {
      setName(data.name)
      setBio(data.bio)
      setWebsite(data.website)
    }
  }, [status])

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])

  const nameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }, [])

  const websiteChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value)
  }, [])

  const bioChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value)
  }, [])

  const updateProfile = useCallback(async () => {
    //e.preventDefault()
    console.log('update profile')
    const param = {
      name: name,
      website: website,
      bio: bio,
      id: cookie.get('user_id'),
    }
    updateProfileMutation.mutate(param)
  }, [name, bio, website])

  return {
    name,
    website,
    bio,
    nameChange,
    websiteChange,
    bioChange,
    updateProfile,
  }
}
