import React, { useState, createContext } from 'react'
import WebAudio from '../components/WebAudio'

export const PlayPauseContext = createContext(undefined)

const Music = (props) => {
  let [musicCtrl, setMusicCtrl] = useState('pause')
  let [filterCtrl, setFilterCtrl] = useState('allpass')
  let [low, setLow] = useState(0)
  let [src, setSrc] = useState('/audio/2.m4a')

  const playPause = () => {
    musicCtrl == 'play' ? setMusicCtrl('pause') : setMusicCtrl('play')
  }
  const toggleLowpass = () => {
    filterCtrl == 'lowpass'
      ? setFilterCtrl('allpass')
      : setFilterCtrl('lowpass')
  }
  const toggleHighpass = () => {
    filterCtrl == 'highpass'
      ? setFilterCtrl('allpass')
      : setFilterCtrl('highpass')
  }
  const changeTrack = () => {
    setSrc('/audio/1.m4a')
  }

  return (
    <>
      <PlayPauseContext.Provider value={[musicCtrl, setMusicCtrl]}>
        <div onClick={playPause}>play / pause</div>
        <div onClick={toggleLowpass}>lowpass</div>
        <div onClick={toggleHighpass}>highpass</div>
        <div onClick={changeTrack}>changeTrack</div>
        <WebAudio src={src} />
        <br />
      </PlayPauseContext.Provider>
    </>
  )
}

export default Music
