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
  const { status, data } = useQueryUserLikes(cookie.get('user_id'))
  const [lottie, setLottie] = useState(false)
  const { state, dispatch } = useContext(Store)

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
    if (props.control != undefined) {
      props = { post: { id: state.playingId } }
    }
  }, [props])

  useEffect(() => {
    setDeleteId(state.justDeleteLikeId)
  }, [state.justDeleteLikeId])

  useEffect(() => {
    if (data) {
      if (props.post) {
        data.forEach((item) => {
          if (item.post_id == props.post.id) {
            setLiked(true)
            setLikeId(item.id)
          } else {
            setLiked(false)
          }
        })
      } else {
        data.forEach((item) => {
          if (item.post_id == props.id) {
            setLiked(true)
            setLikeId(item.id)
          } else {
            setLiked(false)
          }
        })
      }
    }
  }, [data, state.justDeleteLikeId, state.playingId])

  if (status == 'loading') {
    return (
      <span className="flex float-right ml-4">
        <HeartIconOutline className="h-full w-full  text-gray-100 opacity-10" />
      </span>
    )
  }

  if (!props.currentUser) {
    return (
      <span className="flex float-right ml-4">
        <HeartIconOutline
          className="h-full w-full text-gray-100 opacity-90 cursor-pointer"
          onClick={() => alert('ログインしてください')}
        />
      </span>
    )
  }

  if (liked) {
    return (
      <span className="flex float-right relative">
        {lottie && liked ? (
          <>
            {props.control ? (
              <>
                <div
                  className={`absolute -right-[47px] -bottom-[50px]  overflow-hidden`}
                >
                  <Lottie options={animationOptions} height={136} width={136} />
                </div>
                <HeartIcon className="h-full w-full text-white opacity-0" />
              </>
            ) : (
              <>
                <div
                  className={`absolute -right-[37px] -bottom-[40px]  overflow-hidden`}
                >
                  <Lottie options={animationOptions} height={108} width={108} />
                </div>
                <HeartIcon className="h-full w-full text-white opacity-0" />
              </>
            )}
          </>
        ) : (
          <HeartIcon
            className="h-full w-full text-white opacity-80 cursor-pointer"
            onClick={async () => {
              setLiked(false)
              dispatch({ type: 'setDidPlay', payload: true })
              dispatch({ type: 'setJustDeleteLikeId', payload: props.post.id })
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
    <span className="h-full w-full flex float-right relative">
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
              setLiked(false)
            },
            onSuccess: (res) => {},
          })
        }}
      />
    </span>
  )
}
