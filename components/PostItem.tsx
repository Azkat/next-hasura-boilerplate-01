import React, { useRef, useState, useEffect, useContext } from 'react'
import { Store } from '../reducer/reducer'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { LikeButton } from './LikeButton'
import { PlayIcon } from '@heroicons/react/solid'
import { useOnScreen } from '../hooks/useOnScreen'
import Image from 'next/image'

const PostItem = (props) => {
  const cookie = new Cookies()
  const [scrollEnough, setScrollEnough] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const targetViewPosition = useOnScreen(targetRef)
  const { state, dispatch } = useContext(Store)

  useEffect(() => {
    if (scrollEnough) {
      dispatch({ type: 'increment_listViewLoadCount' })
    }
  }, [scrollEnough])

  useEffect(() => {
    if (targetViewPosition === 'VISIBLE') {
      setScrollEnough(true)
    }
  }, [targetViewPosition])

  return (
    <div className="bg-backgroundGray mb-4">
      {targetViewPosition === 'VISIBLE' && <p>画面内に表示されています</p>}
      {targetViewPosition === 'ABOVE_VIEWPORT' && (
        <p>画面より上に表示されています</p>
      )}
      {targetViewPosition === 'BELOW_VIEWPORT' && (
        <p>画面より下に表示されています</p>
      )}
      <p className="font-bold my-3" key={props.post.id}>
        <div className="flex items-center p-4 pt-3">
          <Link href={'/user/' + props.post.user.id}>
            <img
              className="w-8 h-8 mr-2 rounded-full sm:w-8 sm:h-8"
              src="https://placeimg.com/192/192/people"
              alt=""
            />
          </Link>
          <div className="font-light dark:text-white">
            <Link href={'/user/' + props.post.user.id}>
              {props.post.user.name}
            </Link>
          </div>
          <div className="ml-auto">
            <Link href="/account/settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="bg-cover bg-center w-full relative h-vw sm:max-h-[calc(544px)] cursor-pointer">
          <Link href={'/post/' + props.post.id}>
            <Image
              src={`https://vmedia.droptune.net/post_image/${props.post.id}.jpg`}
              layout="fill"
              objectFit="contain"
            />
          </Link>
          <div className="playbutton absolute">
            <PlayIcon className="h-6 w-6  text-gray-100 opacity-80" />
          </div>
          <div className="likebutton absolute">
            <LikeButton post={props.post} currentUser={props.currentUser} />
          </div>
        </div>
        <div className="p-4 pt-3">
          <Link href={'/post/' + props.post.id}>{props.post.title}</Link>
        </div>
      </p>
      {props.index == 8 && (
        <span ref={targetRef}>{state.listViewLoadCount}</span>
      )}

      <style jsx>{`
        .h-vw {
          height: 100vw;
        }
        .likebutton {
          bottom: 24px;
          right: 16px;
        }
        .playbutton {
          bottom: 24px;
          left: 16px;
        }
      `}</style>
    </div>
  )
}

export default PostItem
