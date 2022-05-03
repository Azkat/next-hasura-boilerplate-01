import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { /* EditNews, EditTask,  */ UpdatePost } from '../types/types'
import { RootState } from '../app/store'

export interface uiState {
  /* editedTask: EditTask
  editedNews: EditNews */
  editedPost: UpdatePost
}
const initialState: uiState = {
  /* editedTask: {
    id: '',
    title: '',
  }, 
  editedNews: {
    id: '',
    content: '',
  },*/
  editedPost: {
    id: '',
    title: '',
    description: '',
  },
}
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /* setEditedTask: (state, action: PayloadAction<EditTask>) => {
      state.editedTask = action.payload
    },
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask
    },
    setEditedNews: (state, action: PayloadAction<EditNews>) => {
      state.editedNews = action.payload
    },
    resetEditedNews: (state) => {
      state.editedNews = initialState.editedNews
    }, */
    setEditedPost: (state, action: PayloadAction<UpdatePost>) => {
      state.editedPost = action.payload
    },
    resetEditedPost: (state) => {
      state.editedPost = initialState.editedPost
    },
  },
})
export const {
  /* setEditedTask,
  resetEditedTask,
  setEditedNews,
  resetEditedNews, */
  setEditedPost,
  resetEditedPost,
} = uiSlice.actions

/* export const selectTask = (state: RootState) => state.ui.editedTask
export const selectNews = (state: RootState) => state.ui.editedNews */
export const selectPost = (state: RootState) => state.ui.editedPost

export default uiSlice.reducer
