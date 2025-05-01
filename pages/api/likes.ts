// pages/api/likes.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { userId } = req.query
    // お気に入り一覧取得
    const response = await fetch(process.env.NEXT_PUBLIC_HASURA_ENDPOINT!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_KEY!,
      },
      body: JSON.stringify({
        query: `
          query ($userId: uuid!) {
            likes(where: {user_id: {_eq: $userId}}, order_by: { created_at: desc }) {
              id
              created_at
              post_id
              user_id
              user {
                name
                id
              }
              post {
                id
                title
              }
            }
          }
        `,
        variables: { userId },
      }),
    })
    const data = await response.json()
    res.status(200).json(data)
  } else if (req.method === 'POST') {
    // お気に入り追加
    const { userId, postId } = req.body
    const response = await fetch(process.env.NEXT_PUBLIC_HASURA_ENDPOINT!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_KEY!,
      },
      body: JSON.stringify({
        query: `
          mutation ($userId: uuid!, $postId: uuid!) {
            insert_likes_one(object: {user_id: $userId, post_id: $postId}) {
              id
              user_id
              post_id
              created_at
            }
          }
        `,
        variables: { userId, postId },
      }),
    })
    const data = await response.json()
    res.status(200).json(data)
  } else if (req.method === 'DELETE') {
    // お気に入り削除
    const { id } = req.body
    const response = await fetch(process.env.NEXT_PUBLIC_HASURA_ENDPOINT!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_KEY!,
      },
      body: JSON.stringify({
        query: `
          mutation DeleteLike($id: uuid!) {
            delete_likes_by_pk(id: $id) {
              id
              post_id
              user_id
            }
          }
        `,
        variables: { id },
      }),
    })
    const data = await response.json()
    res.status(200).json(data)
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
