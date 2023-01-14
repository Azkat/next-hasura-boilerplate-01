import React, { useEffect, useState, useContext } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import Cookies from 'universal-cookie'
import { useAppMutate } from '../hooks/useAppMutate'
import { useQueryUserLikes } from '../hooks/useQueryPosts'
import Lottie from 'react-lottie'
import animationData from '../public/99800-heart-fav.json'
import { setTimeout } from 'timers'
import { Store } from '../reducer/reducer'

export const LikeButton = (props) => {
  const cookie = new Cookies()
  const [liked, setLiked] = useState(false)
  const [likeId, setLikeId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const { createLikeMutation, deleteLikeMutation } = useAppMutate()
  const [lottie, setLottie] = useState(false)
  const { state, dispatch } = useContext(Store)
  const { status, data } = useQueryUserLikes(cookie.get('user_id'))

  const animationOptions = {
    loop: false,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const lottiFire = () => {
    setLottie(true)
    setTimeout(() => {
      setLottie(false)
    }, 700)
  }

  useEffect(() => {
    if (status == 'success' && props) {
      if (props.post) {
        data.forEach((item) => {
          if (item.post_id == props.post.id) {
            setLiked(true)
            setLikeId(item.id)
          }
        })
      }
    }
  }, [data])

  if (!props.currentUser) {
    return (
      <span className="h-full w-full flex float-right ml-4 hover:opacity-60 duration-200">
        <HeartIconOutline
          className="h-full w-full text-gray-100 opacity-90 cursor-pointer"
          onClick={() => alert('Login to like.')}
        />
      </span>
    )
  }

  if (liked) {
    return (
      <span className="h-full w-full flex float-right relative hover:opacity-60 duration-200">
        {lottie ? (
          <>
            <div
              className={`absolute -right-[37px] -bottom-[40px]  overflow-hidden`}
            >
              <Lottie
                options={animationOptions}
                height={108}
                width={108}
                className="text-white opacity-80"
              />
            </div>
            <HeartIcon className="h-full w-full text-white opacity-0" />
          </>
        ) : (
          <HeartIcon
            className="h-full w-full  text-white opacity-80 cursor-pointer hover:opacity-60 duration-200"
            onClick={async () => {
              setLiked(false)
              const param = {
                id: likeId,
              }
              await deleteLikeMutation.mutate(param, {
                onError: (res) => {
                  console.log('like delete error')
                  setLiked(true)
                },
              })
            }}
          />
        )}
      </span>
    )
  } else {
    return (
      <span className="h-full w-full flex float-right relative hover:opacity-60 duration-200">
        <HeartIconOutline
          className="h-full w-full  text-gray-100 opacity-50 cursor-pointer"
          onClick={async () => {
            setLiked(true)
            lottiFire()
            const param = await {
              user_id: cookie.get('user_id'),
              post_id: props.post.id,
            }
            await createLikeMutation.mutate(param, {
              onError: (res) => {
                console.log('like create error')
                setLiked(false)
              },
              onSuccess: (res) => {},
            })
          }}
        />
      </span>
    )
  }
}
