import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// type지정

export interface mainData {
    directIntensity: number
}


// Initial State

const initialState = {
    directIntensity: 2
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    // Reducer 작성
    setDirectIntensity: (state:mainData, action) => {
      state.directIntensity = action.payload
    },
  }
})

const { reducer, actions } = mainSlice
export const {setDirectIntensity} = actions
export default mainSlice.reducer