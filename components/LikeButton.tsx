import React, { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import Cookies from 'universal-cookie'
import { useAppMutate } from '../hooks/useAppMutate'
import { useQueryUserLikes } from '../hooks/useQueryPosts'
import Lottie from 'react-lottie'
import animationData from '../public/99800-heart-fav.json'
import { setTimeout } from 'timers'

export const LikeButton = (props) => {
  const cookie = new Cookies()
  const [liked, setLiked] = useState(false)
  const [likeId, setLikeId] = useState('')
  const { createLikeMutation, deleteLikeMutation } = useAppMutate()
  const { status, data } = useQueryUserLikes(cookie.get('user_id'))
  const [lottie, setLottie] = useState(false)

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
    if (data) {
      if (props.post) {
        data.forEach((item) => {
          if (item.post_id == props.post.id) {
            setLiked(true)
            setLikeId(item.id)
          }
        })
      } else {
        console.log(props)
        data.forEach((item) => {
          console.log('here')
          if (item.post_id == props.id) {
            setLiked(true)
            setLikeId(item.id)
          }
        })
      }
    }
  }, [data])

  if (status == 'loading') {
    return (
      <span className="flex float-right ml-4">
        <HeartIconOutline className="h-8 w-8  text-gray-100 opacity-10" />
      </span>
    )
  }

  if (!props.currentUser) {
    return (
      <span className="flex float-right ml-4">
        <HeartIconOutline
          className="h-8 w-8 text-gray-100 opacity-90 cursor-pointer"
          onClick={() => alert('ログインしてください')}
        />
      </span>
    )
  }

  if (liked) {
    return (
      <span className="flex float-right relative">
        {lottie && liked ? (
          <div className="absolute -bottom-[40px] -right-[37px] sm:-bottom-[40px] sm:-right-[37px]">
            <Lottie options={animationOptions} height={108} width={108} />
          </div>
        ) : (
          <HeartIcon
            className="h-8 w-8 text-white opacity-80 cursor-pointer"
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
        )}
      </span>
    )
  }

  return (
    <span className="flex float-right relative">
      <HeartIconOutline
        className="h-8 w-8  text-gray-100 opacity-50 cursor-pointer"
        onClick={async () => {
          setLiked(true)
          lottiFire()
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
      {lottie ? (
        <div className="absolute-bottom-[40px] -right-[37px] sm:-bottom-[41px] sm:-right-[38px">
          <Lottie options={animationOptions} height={108} width={108} />
        </div>
      ) : (
        ''
      )}
    </span>
  )
}
