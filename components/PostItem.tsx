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
import PostItemSkelton from './PostItemSkelton'
import PlayButton from './PlayButton'
import WebAudio from './WebAudio'
import { formatDistance, format } from 'date-fns'

const PostItem = (props) => {
  const cookie = new Cookies()
  const [scrollEnough, setScrollEnough] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)
  const targetViewPosition = useOnScreen(targetRef)
  const { state, dispatch } = useContext(Store)
  const [userIconSrc, setUserIconSrc] = useState(
    `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}user_icon/${props.post.user.id}.jpg`
  )
  const [noAvatarImage, setNoAvatarImage] = useState(false)
  const [userImageLoadComplete, setUserImageLoadComplete] = useState(false)
  const [mainImageLoadComplete, setMainImageLoadComplete] = useState(false)
  const [mainImageError, setMainImageError] = useState(false)
  const [imageSize, setImageSize] = useState({
    width: 1,
    height: 1,
  })
  const [videoPlayed, setVideoPlayed] = useState(false)
  let [playPauseCtrl, setPlayPauseCtrl] = useState(false)
  let sound = `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}audio/ab85264e-af27-4e7b-8e39-709b4df85c86.aac`

  const videoRef: any = useRef(null)

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

  useEffect(() => {
    if (props.post.visual_format == 'Video') {
      if (state.audioPlay && state.playingId == props.post.id) {
        videoPlayed && videoRef.current.play()
        setVideoPlayed(true)
      } else if (videoPlayed) {
        videoRef.current.pause()
      }
    }
  }, [state.audioPlay, state.playingId])

  return (
    <div className="bg-backgroundGray mb-4 sm:rounded-lg ">
      {/* {targetViewPosition === 'VISIBLE' && <p>画面内に表示されています</p>}
      {targetViewPosition === 'ABOVE_VIEWPORT' && (
        <p>画面より上に表示されています</p>
      )}
      {targetViewPosition === 'BELOW_VIEWPORT' && (
        <p>画面より下に表示されています</p>
      )} */}

      {!props.post ? (
        <PostItemSkelton />
      ) : (
        <p className="font-bold my-3 " key={props.post.id}>
          <div className="flex items-center p-4 pt-3 ">
            <div className="flex items-center hover:opacity-80 active:opacity-60">
              <div className="w-8 h-8 mr-2  relative ">
                <Link
                  href={'/user/' + props.post.user.id}
                  className="contents "
                >
                  {!userImageLoadComplete ? (
                    <div className="w-8 h-8 mr-2  relative animate-pulse">
                      <div className="rounded-full bg-slate-700 h-8 w-8 duration-200  hover:opacity-95 active:opacity-80"></div>
                    </div>
                  ) : (
                    ''
                  )}

                  {noAvatarImage ? (
                    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden rounded-full bg-gray-600">
                      <span className="font-medium text-gray-300 duration-200  hover:opacity-95 active:opacity-80">
                        {props.post.user.name.slice(0, 1).toUpperCase()}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={userIconSrc}
                      className="w-8 h-8 mr-2 rounded-full sm:w-8 sm:h-8 duration-200  hover:opacity-95 active:opacity-80"
                      layout="fill"
                      objectFit="contain"
                      onError={() => {
                        //setUserIconSrc(`/noImageYet.png`)
                        setNoAvatarImage(true)
                        setUserImageLoadComplete(true)
                      }}
                      onLoadingComplete={(target) => {
                        setUserImageLoadComplete(true)
                      }}
                      alt=""
                    />
                  )}
                </Link>
              </div>
              <div className="font-light dark:text-white duration-200  ">
                <Link href={'/user/' + props.post.user.id}>
                  {props.post.user.name}
                </Link>
              </div>
            </div>
            <div className="ml-auto ">
              <DropdownPostmenu id={props.post.id} />
            </div>
          </div>
          {mainImageError ? (
            ''
          ) : (
            <div className="bg-cover bg-center w-full relative cursor-pointer overflow-hidden">
              <Link
                key={props.post.id}
                href={`/?postId=${props.post.id}`}
                //as={`/post/${props.post.id}`}
                scroll={false}
              >
                {!mainImageLoadComplete ? (
                  <div className="absolute w-full h-full flex items-center animate-pulse">
                    <div className="w-full h-full bg-slate-700 "></div>
                  </div>
                ) : (
                  ''
                )}

                <div className="w-full flex items-center duration-100 hover:brightness-110 active:brightness-125 ">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}post_image/${props.post.id}.jpg`}
                    layout="responsive"
                    objectFit="contain"
                    alt=""
                    onLoadingComplete={(target) => {
                      setImageSize({
                        width: target.naturalWidth,
                        height: target.naturalHeight,
                      })
                      setMainImageLoadComplete(true)
                    }}
                    onError={() => {
                      setMainImageError(true)
                    }}
                    width={imageSize.width}
                    height={imageSize.height}
                  />
                </div>

                {props.post.visual_format == 'Video' && videoPlayed ? (
                  <div className="w-full h-full flex items-center">
                    <video
                      ref={videoRef}
                      id="video"
                      playsInline
                      autoPlay
                      loop
                      muted
                      src={`${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}video/${props.post.id}.mp4`}
                      className="w-full absolute top-0 left-0"
                    ></video>
                  </div>
                ) : (
                  ''
                )}
              </Link>

              <div className="playbutton absolute h-10 w-10 ">
                <PlayButton post={props.post} control={false} />
              </div>
              <div className="likebutton absolute h-8 w-8 ">
                {/* <LikeButton
              post={props.post}
              currentUser={props.currentUser}
              control={false}
            /> */}
                <LikeButton
                  post={props.post}
                  currentUser={props.currentUser}
                  like={props.like}
                  control={false}
                />
              </div>
            </div>
          )}

          <div className="p-4 flex items-center">
            <div>
              <Link
                href={'/post/' + props.post.id}
                className="duration-200 hover:opacity-80 active:opacity-60"
              >
                {props.post.title}
              </Link>
              <div className="pt-1 text-xs font-normal text-gray-500 ">
                {formatDistance(Date.parse(props.post.created_at), new Date(), {
                  addSuffix: true,
                })}
              </div>
            </div>

            {mainImageError ? (
              <div className="ml-auto flex items-center">
                <div className="playbutton  h-10 w-10 mr-3">
                  <PlayButton post={props.post} control={false} />
                </div>
                <div className="likebutton  h-8 w-8">
                  {/* <LikeButton
              post={props.post}
              currentUser={props.currentUser}
              control={false}
            /> */}
                  <LikeButton
                    post={props.post}
                    currentUser={props.currentUser}
                    like={props.like}
                    control={false}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </p>
      )}

      {props.index == 8 && <span ref={targetRef}></span>}

      <style jsx>{`
        .nextImage {
          position: relative !important;
          width: 100% !important;
          height: unset !important;
        }
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
