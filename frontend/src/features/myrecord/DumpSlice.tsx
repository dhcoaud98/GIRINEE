import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// type지정

export interface dumpData {
    dump: string
    dump2: number | null
}


// Initial State

const initialState = {
    dump: '',
    dump2: 4
}

const dumpSlice = createSlice({
  name: 'dump',
  initialState,
  reducers: {
    // Reducer 작성
    setPlayerProfile: (state:dumpData, action) => {
      state.dump = action.payload
      state.dump2 = 1
    },
  }
})

const { reducer, actions } =dumpSlice
export const {setPlayerProfile} = actions
export default dumpSlice.reducer