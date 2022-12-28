import React, { useReducer, createContext } from 'react'

const initialState = {
  //reducer test
  sono1: 0,
  sono2: 100,
  testState: '実行前',
  name: 'to-R Media',
  imageFile: '',
  canvasWidth: 0,
  isImageFile: false,
  canvasAdjust: false,
  audioFile: {},
  listViewLoadCount: 0,
  listViewData: [],
  didPlay: false,
  audioPlay: false,
  sound:
    'https://vmedia.droptune.net/audio/ab85264e-af27-4e7b-8e39-709b4df85c86.aac',
  playingTitle: '',
  playingUser: '',
  playingId: '',
}

const Store = createContext()

function reducer(state, action) {
  switch (action.type) {
    //test
    case 'sono1_increment':
      return { ...state, sono1: state.sono1 + 1 }
    case 'testChange':
      return { ...state, name: 'me' }
    case 'setImageFile':
      return { ...state, imageFile: action.payload }
    case 'setCanvasWidth':
      return { ...state, canvasWidth: action.payload }
    case 'setCanvasAdjust':
      return { ...state, canvasAdjust: action.payload }
    case 'setAudioFile':
      return { ...state, audioFile: action.payload }
    case 'increment_listViewLoadCount':
      return { ...state, listViewLoadCount: state.listViewLoadCount + 1 }
    case 'setListViewData':
      return { ...state, listViewData: action.payload }
    case 'setDidPlay':
      return { ...state, didPlay: action.payload }
    case 'setAudioPlay':
      return { ...state, audioPlay: action.payload }
    case 'setSound':
      return { ...state, sound: action.payload }
    case 'setPlayingTitle':
      return { ...state, playingTitle: action.payload }
    case 'setPlayingUser':
      return { ...state, playingUser: action.payload }
    case 'setPlayingId':
      return { ...state, playingId: action.payload }
    default:
      return state
  }
}

const ReducerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export { Store, ReducerProvider }
