import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UpdatePost } from '../types/types'
import { RootState } from '../app/store'

export interface uiState {
  editedPost: UpdatePost
  previewCanvasRef: any
}
const initialState: uiState = {
  editedPost: {
    id: '',
    title: '',
    description: '',
  },
  previewCanvasRef: 'オオオオオ',
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
    setPreviewCanvasRef: (state, action: PayloadAction<UpdatePost>) => {
      state.previewCanvasRef = action.payload
    },
  },
})
export const { setEditedPost, resetEditedPost, setPreviewCanvasRef } =
  uiSlice.actions

export const selectPost = (state: RootState) => state.ui.editedPost
export const previewCanvasRef = (state: RootState) => state.ui.previewCanvasRef

export default uiSlice.reducer
