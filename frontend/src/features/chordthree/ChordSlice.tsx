import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// type지정

export interface chordData {
  chordColor: string
}


// Initial State

const initialState = {
    chordColor: "lightblue"
}

const chordSlice = createSlice({
  name: 'chord',
  initialState,
  reducers: {
    // Reducer 작성
    setChordColor: (state:chordData, action) => {
      state.chordColor = action.payload
    },
  }
})
const { reducer, actions } =chordSlice
export const {setChordColor} = actions

export default chordSlice.reducer