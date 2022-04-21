import { request } from 'graphql-request'
import { useQuery } from 'react-query'
import { Rocket } from '../types/types'
import { GET_ROCKET } from '../queries/queries'

interface RocketRes {
  rocket: Rocket[]
}
export const fetchRocketById = async (id) => {
  const { rocket: data } = await request<RocketRes>({
    url: process.env.NEXT_PUBLIC_SPACEX_ENDPOINT,
    document: GET_ROCKET,
    variables: { id: id },
  })
  console.log(data)
  return data
}
export const useQueryUsers = (id) => {
  return useQuery<Rocket[], Error>({
    queryKey: ['rocket', id],
    queryFn: () => fetchRocketById(id),
    staleTime: Infinity,
  })
}
