import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { DELETE_LIKE, GET_USERBY_ID_PK } from '../../queries/queries'
import { DeleteLike, User } from '../../types/types'
import { useQuery } from 'react-query'
import { request, GraphQLClient } from 'graphql-request'

export default (req, res) => {
  console.log('triggered')
  res.status(200).json({ name: 'John Doe' })
}
