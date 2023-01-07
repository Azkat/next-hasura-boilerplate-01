import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react'
import { LikeButton } from './LikeButton'
import { useRouter } from 'next/router'
import PlayButton from './PlayButton'
import { Store } from '../reducer/reducer'
import Image from 'next/image'
import { AuthContext } from '../lib/authProvider'
import Link from 'next/link'

const AudioControl = (props) => {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { currentUser } = useContext(AuthContext)
  const [post, setPost] = useState({})
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setPost({ id: state.playingId })
    setImageError(false)
  }, [state.playingId])

  return (
    <>
      {state.didPlay ? (
        <div className="fixed touch-none overflow-hidden bottom-4 w-full grid place-items-center z-[100000] opacity-95 px-2 sm:px-0 ">
          <div className="w-full sm:w-[768px] h-[76px] h-[64px] bg-backgroundPlayer rounded-lg flex px-4 sm:px-6 py-0 sm:py-1 items-center shadow-xl ">
            <Link
              href={'/post/' + state.playingId}
              className="contents"
              scroll={false}
            >
              {imageError ? (
                ''
              ) : (
                <div className="mr-2 relative w-12 h-12 rounded-md overflow-hidden">
                  <Image
                    src={`https://vmedia.droptune.net/post_image/${state.playingId}.jpg`}
                    layout="fill"
                    objectFit="cover"
                    alt="state.playingTitle"
                    onError={() => {
                      setImageError(true)
                    }}
                  />
                </div>
              )}
            </Link>
            <div className=" flex flex-col">
              <Link
                href={'/post/' + state.playingId}
                className="contents"
                scroll={false}
              >
                <div className=" text-sm mb-1">{state.playingTitle}</div>
              </Link>
              <Link
                href={'/user/' + state.playingUserId}
                className="contents"
                scroll={false}
              >
                <div className=" text-sm font-bold">{state.playingUser}</div>
              </Link>
            </div>
            <div className="ml-auto flex width-10 items-center">
              <div className="h-12 w-12 mr-3">
                <PlayButton control={true} />
              </div>
              {/* <div className="h-10 w-10">
                <LikeButton
                  control={true}
                  post={post}
                  currentUser={currentUser}
                />
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default AudioControl
