import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UpdatePost } from '../types/types'
import { RootState } from '../app/store'

export interface uiState {
  editedPost: UpdatePost
}
const initialState: uiState = {
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
    setEditedPost: (state, action: PayloadAction<UpdatePost>) => {
      state.editedPost = action.payload
    },
    resetEditedPost: (state) => {
      state.editedPost = initialState.editedPost
    },
  },
})
export const { setEditedPost, resetEditedPost } = uiSlice.actions

export const selectPost = (state: RootState) => state.ui.editedPost

export default uiSlice.reducer
