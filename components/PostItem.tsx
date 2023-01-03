import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react'
import { Store } from '../reducer/reducer'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { LikeButton } from './LikeButton'
import { PlayIcon } from '@heroicons/react/solid'
import { useOnScreen } from '../hooks/useOnScreen'
import Image from 'next/image'
import DropdownPostmenu from './DropdownPostmenu'
import PlayButton from './PlayButton'
import WebAudio from './WebAudio'

const PostItem = (props) => {
  const cookie = new Cookies()
  const [scrollEnough, setScrollEnough] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const targetViewPosition = useOnScreen(targetRef)
  const { state, dispatch } = useContext(Store)
  const [userIconSrc, setUserIconSrc] = useState(
    `https://vmedia.droptune.net/user_icon/${props.post.user.id}.jpg`
  )
  let [playPauseCtrl, setPlayPauseCtrl] = useState(false)
  let sound =
    'https://vmedia.droptune.net/audio/ab85264e-af27-4e7b-8e39-709b4df85c86.aac'

  const videoRef = useRef(null)

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
    <div className="bg-backgroundGray mb-4 sm:rounded-lg ">
      {/* {targetViewPosition === 'VISIBLE' && <p>画面内に表示されています</p>}
      {targetViewPosition === 'ABOVE_VIEWPORT' && (
        <p>画面より上に表示されています</p>
      )}
      {targetViewPosition === 'BELOW_VIEWPORT' && (
        <p>画面より下に表示されています</p>
      )} */}
      <p className="font-bold my-3 " key={props.post.id}>
        <div className="flex items-center p-4 pt-3 ">
          <div className="w-8 h-8 mr-2  relative">
            <Link href={'/user/' + props.post.user.id} className="contents">
              <Image
                src={userIconSrc}
                className="w-8 h-8 mr-2 rounded-full sm:w-8 sm:h-8"
                layout="fill"
                objectFit="contain"
                onError={() => {
                  setUserIconSrc(`/noImageYet.png`)
                }}
                alt=""
              />
            </Link>
          </div>
          <div className="font-light dark:text-white">
            <Link href={'/user/' + props.post.user.id}>
              {props.post.user.name}
            </Link>
          </div>
          <div className="ml-auto">
            <DropdownPostmenu id={props.post.id} />
          </div>
        </div>
        <div className="bg-cover bg-center w-full relative h-vw sm:max-h-[calc(544px)] cursor-pointer">
          {/*  <Link href={'/post/' + props.post.id}> */}
          <Link
            key={props.post.id}
            href={`/?postId=${props.post.id}`}
            as={`/post/${props.post.id}`}
            scroll={false}
          >
            <div className="w-full flex items-center">
              <Image
                src={`https://vmedia.droptune.net/post_image/${props.post.id}.jpg`}
                layout="fill"
                objectFit="contain"
                alt=""
              />
            </div>

            {state.audioPlay && state.playingId == props.post.id ? (
              <div className="w-full h-full flex items-center">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  loop
                  muted
                  src={`https://vmedia.droptune.net/video/${props.post.id}.mp4`}
                  className="w-full absolute"
                ></video>
              </div>
            ) : (
              ''
            )}
          </Link>
          <div className="playbutton absolute h-10 w-10">
            <PlayButton post={props.post} control={false} />
          </div>
          <div className="likebutton absolute h-8 w-8">
            <LikeButton post={props.post} currentUser={props.currentUser} />
          </div>
        </div>
        <div className="p-4 pt-3">
          <Link href={'/post/' + props.post.id}>{props.post.title}</Link>
        </div>
      </p>
      {/* {props.index == 8 && (
        <span ref={targetRef}>{state.listViewLoadCount}</span>
      )} */}

      <style jsx>{`
        .h-vw {
          height: 100vw;
        }
        .likebutton {
          bottom: 24px;
          right: 16px;
        }
        .playbutton {
          bottom: 22px;
          left: 16px;
        }
      `}</style>
    </div>
  )
}

export default PostItem
