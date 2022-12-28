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

const AudioControl = (props) => {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)

  useEffect(() => {}, [])

  return (
    <>
      {state.didPlay ? (
        <div className="absolute bottom-6 w-full grid place-items-center z-[100000] opacity-95">
          <div className="sm:w-[768px] h-[74px] bg-backgroundPlayer rounded-lg flex px-3 sm:px-6 pt-1 items-center">
            <div className="mr-3">
              <PlayButton control={true} />
            </div>
            <div className=" flex flex-col">
              <div className=" text-sm mb-1">{state.playingTitle}</div>
              <div className=" text-sm font-bold">{state.playingUser}</div>
            </div>
            <div className="ml-auto">
              <LikeButton className="h-12 w-12  text-gray-100 opacity-80" />
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
