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
import Lottie from 'react-lottie'

// Lottieコンポーネントをクライアントサイドでのみ読み込むように設定
const DynamicLottie = dynamic(() => import('react-lottie'), {
  ssr: false // サーバーサイドレンダリングを無効化
}) as typeof Lottie

export const LikeButton = (props) => {
  const cookie = new Cookies()
  const [liked, setLiked] = useState(false)
  const [likeId, setLikeId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const { createLikeMutation, deleteLikeMutation } = useAppMutate()
  const [lottie, setLottie] = useState(false)
  const { state, dispatch } = useContext(Store)
  const { status, data } = useQueryUserLikes(cookie.get('user_id'))
  const [isOpen, setIsOpen] = useState(false)
  let completeButtonRef = useRef(null)
  const { currentUser } = useContext(AuthContext)

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

  if (!currentUser) {
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
          <div className="fixed inset-0 flex items-center justify-center rounded-box ">
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

  if (liked) {
    return (
      <span className="h-full w-full flex float-right relative hover:opacity-60 duration-200  overflow-hidden">
        {lottie ? (
          <>
            {props.control ? (
              <>
                <div className={`absolute -right-[47px] -bottom-[50px] overflow-hidden`}>
                  <DynamicLottie options={animationOptions} height={136} width={136} />
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
          </>
        ) : (
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
