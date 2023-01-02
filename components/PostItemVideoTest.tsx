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

const PostItemVideoTest = (props) => {
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

  return (
    <div className="bg-backgroundGray mb-4 sm:rounded-lg ">
      <p className="font-bold my-3 " key="38a6b84e-f05f-46b6-b810-d2c9dd5cb6c2">
        <div className="flex items-center p-4 pt-3 ">
          <div className="w-8 h-8 mr-2  relative">
            <Link
              href={'/user/4a22aa82-5ed9-4e59-9aad-87ce9519926b'}
              className="contents"
            >
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
            <Link href={'/user/4a22aa82-5ed9-4e59-9aad-87ce9519926b'}>
              あああああ
            </Link>
          </div>
          <div className="ml-auto">
            <DropdownPostmenu id="38a6b84e-f05f-46b6-b810-d2c9dd5cb6c2" />
          </div>
        </div>
        <div className="bg-cover bg-center w-full relative cursor-pointer flex">
          <Link
            key={props.post.id}
            href={`/?postId=38a6b84e-f05f-46b6-b810-d2c9dd5cb6c2`}
            as={`/post/38a6b84e-f05f-46b6-b810-d2c9dd5cb6c2`}
            scroll={false}
            className="flex items-center w-full"
          >
            <div className="w-full flex items-center">
              <Image
                src={`https://vmedia.droptune.net/post_image/Ay0TiCWzv1pTX5uaNqac.png`}
                width={544}
                height={544}
                className="w-full h-full "
                alt="absolute"
              />
            </div>
            {state.audioPlay && state.playingId == props.post.id ? (
              <video
                ref={videoRef}
                playsInline
                autoPlay
                loop
                muted
                src={
                  'https://vmedia.droptune.net/video/Ay0TiCWzv1pTX5uaNqac.mp4'
                }
                className="w-full absolute"
              ></video>
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
          <Link href={'/post/' + props.post.id}>あああ</Link>
        </div>
      </p>

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

export default PostItemVideoTest
