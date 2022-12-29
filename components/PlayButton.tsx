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
  let sound =
    'https://vmedia.droptune.net/audio/ab85264e-af27-4e7b-8e39-709b4df85c86.aac'

  useEffect(() => {}, [])

  const playPause = () => {
    if (!state.didPlay) {
      const audioElement = document.querySelector('audio')
      audioElement.play()
      dispatch({ type: 'setDidPlay', payload: true })
      setTimeout(() => {
        dispatch({ type: 'setAudioPlay', payload: true })
      }, 300)
    }
    if (state.audioPlay && state.playingId == props.post.id) {
      dispatch({ type: 'setAudioPlay', payload: false })
    } else {
      dispatch({
        type: 'setSound',
        payload: 'https://vmedia.droptune.net/audio/' + props.post.id + '.aac',
      })
      dispatch({ type: 'setPlayingTitle', payload: props.post.title })
      dispatch({ type: 'setPlayingUser', payload: props.post.user.name })
      dispatch({ type: 'setPlayingId', payload: props.post.id })
      dispatch({ type: 'setAudioPlay', payload: true })
    }
  }

  const playPauseControl = () => {
    if (state.audioPlay) {
      console.log('4')
      dispatch({ type: 'setAudioPlay', payload: false })
    } else {
      dispatch({ type: 'setAudioPlay', payload: true })
    }
  }

  if (props.control) {
    return (
      <>
        {state.audioPlay ? (
          <PauseIcon
            className="h-full w-full mr-3 text-gray-100 opacity-80 "
            onClick={playPauseControl}
          />
        ) : (
          <PlayIcon
            className="h-full w-full mr-3  text-gray-100 opacity-80 "
            onClick={playPauseControl}
          />
        )}

        <audio src="https://vmedia.droptune.net/music/0.m4a"></audio>
      </>
    )
  }

  if (props.post != undefined) {
    return (
      <>
        {state.audioPlay && state.playingId == props.post.id ? (
          <PauseIcon
            className="h-full w-full text-gray-100 opacity-80"
            onClick={playPause}
          />
        ) : (
          <PlayIcon
            className="h-full w-full  text-gray-100 opacity-80"
            onClick={playPause}
          />
        )}

        <audio src="https://vmedia.droptune.net/music/0.m4a"></audio>
      </>
    )
  } else {
    return <></>
  }
}

export default PlayButton
