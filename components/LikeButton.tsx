import React, { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import Cookies from 'universal-cookie'
import { useAppMutate } from '../hooks/useAppMutate'
import { useQueryUserLikes } from '../hooks/useQueryPosts'

export const LikeButton = (props) => {
  const cookie = new Cookies()
  const [liked, setLiked] = useState(false)
  const [likeId, setLikeId] = useState('')
  const { createLikeMutation, deleteLikeMutation } = useAppMutate()
  const { status, data } = useQueryUserLikes(cookie.get('user_id'))

  useEffect(() => {
    if (data) {
      data.forEach((item) => {
        if (item.post_id == props.post.id) {
          setLiked(true)
          setLikeId(item.id)
        }
      })
    }
  }, [data])

  if (status == 'loading') {
    return (
      <span className="flex float-right ml-4">
        <HeartIcon className="h-5 w-5 mx-1 text-gray-100" />
      </span>
    )
  }

  if (!props.currentUser) {
    return (
      <span className="flex float-right ml-4">
        <HeartIconOutline
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => alert('ログインしてください')}
        />
      </span>
    )
  }

  if (liked) {
    return (
      <span className="flex float-right ml-4">
        <HeartIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={async () => {
            setLiked(false)
            const param = {
              id: likeId,
            }
            await deleteLikeMutation.mutate(param, {
              onError: (res) => {
                setLiked(true)
              },
            })
          }}
        />
      </span>
    )
  }

  return (
    <span className="flex float-right ml-4">
      <HeartIconOutline
        className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
        onClick={async () => {
          setLiked(true)
          const param = await {
            user_id: cookie.get('user_id'),
            post_id: props.post.id,
          }
          await createLikeMutation.mutate(param, {
            onError: (res) => {
              setLiked(false)
            },
            onSuccess: (res) => {},
          })
        }}
      />
    </span>
  )
}
