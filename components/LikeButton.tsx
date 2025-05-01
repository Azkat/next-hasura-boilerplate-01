import React, { useEffect, useState, useContext, useRef } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import Cookies from 'universal-cookie'
import { useAppMutate } from '../hooks/useAppMutate'
import { useQueryUserLikes } from '../hooks/useQueryPosts'
import dynamic from 'next/dynamic'
import animationData from '../public/99800-heart-fav.json'
import { setTimeout } from 'timers'
import { Store } from '../reducer/reducer'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { AuthContext } from '../lib/authProvider'
import { useQuery, useQueryClient } from 'react-query'
//import Lottie from 'react-lottie'

const fetchUserLikes = async (userId) => {
  const res = await fetch(`/api/likes?userId=${userId}`)
  if (!res.ok) throw new Error('Network response was not ok')
  const data = await res.json()
  return data.data.likes
}

const addLike = async (userId, postId) => {
  const res = await fetch('/api/likes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, postId }),
  })
  if (!res.ok) throw new Error('Like追加に失敗しました')
  return await res.json()
}

const deleteLike = async (likeId) => {
  const res = await fetch('/api/likes', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: likeId }),
  })
  if (!res.ok) throw new Error('Like削除に失敗しました')
  return await res.json()
}

export const LikeButton = (props: {
  post?: {
    id: string
  }
  currentUser?: any
  big?: boolean
  control?: boolean
  like?: any
}) => {
  const cookie = new Cookies()
  const [liked, setLiked] = useState(false)
  const [likeId, setLikeId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const { createLikeMutation, deleteLikeMutation } = useAppMutate()
  const [lottie, setLottie] = useState(false)
  const { state, dispatch } = useContext(Store)
  const [isOpen, setIsOpen] = useState(false)
  let completeButtonRef = useRef(null)
  const { currentUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const queryClient = useQueryClient()

  const {
    data: likes = [],
    isLoadingError,
    error,
  } = useQuery(
    ['userLikes', cookie.get('user_id')],
    () => fetchUserLikes(cookie.get('user_id')),
    { enabled: !!cookie.get('user_id') }
  )
  const likedtest = likes.some((like) => like.post_id === props.post.id)

  useEffect(() => {
    if (likes && props) {
      if (props.post) {
        likes.forEach((item) => {
          if (item.post_id == props.post.id) {
            setLiked(true)
            setLikeId(item.id)
          }
        })
      }
      setIsChecked(true)
    }
  }, [likes])

  if (!currentUser || currentUser === undefined) {
    return (
      <span className="h-full w-full flex float-right ml-4 hover:opacity-60 duration-200">
        <HeartIconOutline
          className="h-full w-full text-gray-100 opacity-90 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />

        <Dialog
          open={isOpen}
          initialFocus={completeButtonRef}
          onClose={() => setIsOpen(false)}
          className="relative"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div className="fixed flex inset-0 items-center justify-center rounded-box overflow-y-auto">
            <Dialog.Panel className=" max-w-sm rounded-box  bg-baseBody border border-borderLow shadow-xl p-6 w-[343px]">
              <Dialog.Title className="font-bold text-lg">
                Like this post?
              </Dialog.Title>
              <Dialog.Description className="py-4 text-gray-500">
                Login to like. <span ref={completeButtonRef}></span>
              </Dialog.Description>

              <div className="pt-6 flex justify-end gap-8 items-center">
                <div
                  className="cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </div>
                <Link href="/login">
                  <div>Login</div>
                </Link>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </span>
    )
  }

  if (actionLoading) {
    return (
      <span className="h-full w-full flex float-right relative hover:opacity-60 duration-200  overflow-hidden">
        <svg
          className="animate-spin h-full w-full text-gray-400"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </span>
    )
  }

  if (!isChecked) {
    return null
  }

  if (likedtest) {
    return (
      <span className="h-full w-full flex float-right relative hover:opacity-60 duration-200  overflow-hidden">
        <HeartIcon
          className="h-full w-full  text-white opacity-80 cursor-pointer hover:opacity-60 duration-200"
          onClick={async () => {
            setActionLoading(true)
            console.log('さくじょします')
            try {
              await deleteLike(likeId)
              queryClient.invalidateQueries([
                'userLikes',
                cookie.get('user_id'),
              ])
            } catch (e) {
              alert('お気に入り削除に失敗しました')
            }
            console.log('さくじょした')
            setActionLoading(false)
          }}
        />
      </span>
    )
  } else {
    return (
      <span className="h-full w-full flex float-right relative hover:opacity-60 duration-200">
        <HeartIconOutline
          className="h-full w-full  text-gray-100 opacity-50 cursor-pointer"
          onClick={async () => {
            setActionLoading(true)
            console.log('追加します')
            try {
              await addLike(cookie.get('user_id'), props.post.id)
              queryClient.invalidateQueries([
                'userLikes',
                cookie.get('user_id'),
              ])
            } catch (e) {
              alert('お気に入り追加に失敗しました')
            }
            console.log('追加した')
            setActionLoading(false)
          }}
        />
      </span>
    )
  }
}
