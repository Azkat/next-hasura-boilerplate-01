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
    default:
      return state
  }
}

const ReducerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export { Store, ReducerProvider }
