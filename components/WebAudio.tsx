import { exit } from 'process'
import React, {
  useContext,
  useReducer,
  useState,
  createContext,
  useEffect,
} from 'react'
import { PlayPauseContext } from './PlayButton'
import { Store } from '../reducer/reducer'

let filter, gainNode, ctx, analyser, sampleSource
let isPlaying = false
let src = '/audio/lofi2.mp3'

const WebAudio = (props) => {
  const [musicCtrl, setMusicCtrl] = useContext(PlayPauseContext)
  const { state, dispatch } = useContext(Store)

  let [didPlay, setDidPlay] = useState(false)
  let [didSuspend, setDidSuspend] = useState(false)
  let [src, setSrc] = useState(props.src)

  src = state.sound

  useEffect(() => {
    const changeSample = async () => {
      await sampleSource.stop()
      await setSrc(state.sound)
      setupSample()
    }

    if (didPlay) {
      changeSample()
    }
  }, [state.sound])

  useEffect(() => {
    if (state.audioPlay) {
      if (!isPlaying && !didSuspend) {
        play()
      } else {
        ctx.resume()
        setDidSuspend(false)
        isPlaying = true
      }
    } else {
      pause()
    }
  }, [state.audioPlay])

  if (process.browser && !didPlay) {
    window.AudioContext = window.AudioContext || window.AudioContext
    ctx = new AudioContext()

    analyser = ctx.createAnalyser()
    gainNode = ctx.createGain()
    gainNode.gain.value = 0.8
    filter = ctx.createBiquadFilter()
    filter.type = 'allpass' // Low-pass filter. See BiquadFilterNode docs
    filter.frequency.value = 0
  }

  // 音源を取得しAudioBuffer形式に変換して返す関数
  async function setupSample() {
    const response = await fetch(src)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await ctx.decodeAudioData(
      arrayBuffer,
      function (buffer) {
        sampleSource = ctx.createBufferSource()
        sampleSource.buffer = buffer
        sampleSource
          .connect(gainNode)
          .connect(filter)
          .connect(analyser)
          .connect(ctx.destination)
        sampleSource.loop = true
        sampleSource.loopStart = 0
        sampleSource.start()
      },
      function (e) {
        console.log('Error with decoding audio data' + e.err)
      }
    )

    //return audioBuffer;
  }

  const play = async () => {
    if (isPlaying) return
    await setupSample()
    setDidPlay(true)
    isPlaying = true
  }

  const pause = async () => {
    if (!isPlaying && !didSuspend) return
    if (!didSuspend) {
      ctx.suspend()
      setDidSuspend(true)
      isPlaying = false
    } else {
      ctx.resume()
      setDidSuspend(false)
      isPlaying = true
    }
  }

  return <></>
}

export default WebAudio
