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
import { PlayIcon } from '@heroicons/react/solid'
import { PauseIcon } from '@heroicons/react/solid'
import { useOnScreen } from '../hooks/useOnScreen'
import Image from 'next/image'
import WebAudio from './WebAudio'

export const PlayPauseContext = createContext([])
let didPlay = false

const PlayButton = (props) => {
  const cookie = new Cookies()
  const [scrollEnough, setScrollEnough] = useState(false)
  const { state, dispatch } = useContext(Store)
  let [playPauseCtrl, setPlayPauseCtrl] = useState(false)
  let sound = `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}audio/ab85264e-af27-4e7b-8e39-709b4df85c86.aac`

  useEffect(() => {}, [])

  const playPause = () => {
    if (!state.didPlay) {
      const audioElement = document.querySelector('audio')
      audioElement.play()
      dispatch({ type: 'setDidPlay', payload: true })
      setTimeout(() => {
        dispatch({ type: 'setAudioPlay', payload: true })
      }, 1000)
    }
    if (state.audioPlay && state.playingId == props.post.id) {
      dispatch({ type: 'setAudioPlay', payload: false })
    } else {
      dispatch({
        type: 'setSound',
        payload:
          `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}audio/` +
          props.post.id +
          `.aac`,
      })
      dispatch({ type: 'setPlayingTitle', payload: props.post.title })
      dispatch({ type: 'setPlayingUser', payload: props.post.user.name })
      dispatch({ type: 'setPlayingUserId', payload: props.post.user.id })
      dispatch({ type: 'setPlayingId', payload: props.post.id })
      dispatch({ type: 'setAudioPlay', payload: true })
      dispatch({ type: 'setPlayingVisual', payload: props.post.visual_format })
    }
  }

  const playPauseControl = () => {
    if (state.audioPlay) {
      dispatch({ type: 'setAudioPlay', payload: false })
    } else {
      dispatch({ type: 'setAudioPlay', payload: true })
    }
  }

  const playPauseUser = () => {
    if (!state.didPlay) {
      const audioElement = document.querySelector('audio')
      audioElement.play()
      audioElement.addEventListener('play', () => {
        dispatch({ type: 'setAudioPlay', payload: true })
      })
      dispatch({ type: 'setDidPlay', payload: true })
    }
    if (state.audioPlay && state.playingId == props.post.id) {
      dispatch({ type: 'setAudioPlay', payload: false })
    } else {
      dispatch({
        type: 'setSound',
        payload:
          `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}audio/` +
          props.post.id +
          `.aac`,
      })
      dispatch({ type: 'setPlayingTitle', payload: props.post.title })
      dispatch({ type: 'setPlayingUser', payload: props.user.name })
      dispatch({ type: 'setPlayingUserId', payload: props.user.id })
      dispatch({ type: 'setPlayingId', payload: props.post.id })
      dispatch({ type: 'setAudioPlay', payload: true })
      dispatch({ type: 'setPlayingVisual', payload: props.post.visual_format })
    }
  }

  if (props.control) {
    return (
      <div className="hover:opacity-60 duration-200">
        {state.audioPlay ? (
          <PauseIcon
            className="h-full w-full mr-3 text-gray-100 opacity-80 cursor-pointer"
            onClick={playPauseControl}
          />
        ) : (
          <PlayIcon
            className="h-full w-full mr-3  text-gray-100 opacity-80 cursor-pointer"
            onClick={playPauseControl}
          />
        )}

        <audio src="https://vmedia.droptune.net/music/0.m4a"></audio>
      </div>
    )
  }

  if (props.post != undefined && props.user == undefined) {
    return (
      <div className="hover:opacity-60 duration-200">
        {state.audioPlay && state.playingId == props.post.id ? (
          <PauseIcon
            className="h-full w-full text-gray-100 opacity-80 cursor-pointer"
            onClick={playPause}
          />
        ) : (
          <PlayIcon
            className="h-full w-full  text-gray-100 opacity-80 cursor-pointer"
            onClick={playPause}
          />
        )}

        <audio src="https://vmedia.droptune.net/music/0.m4a"></audio>
      </div>
    )
  }

  if (props.user != undefined) {
    return (
      <div className="hover:opacity-60 duration-200">
        {state.audioPlay && state.playingId == props.post.id ? (
          <PauseIcon
            className="h-full w-full text-gray-100 opacity-80 cursor-pointer"
            onClick={playPauseUser}
          />
        ) : (
          <PlayIcon
            className="h-full w-full  text-gray-100 opacity-80 cursor-pointer"
            onClick={playPauseUser}
          />
        )}

        <audio src="https://vmedia.droptune.net/music/0.m4a"></audio>
      </div>
    )
  } else {
    return <></>
  }
}

export default PlayButton
