import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type rotateData = {
  roBtnState: number
};

export const initialState: rotateData = {
  roBtnState: 0
};




const rotateSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRoBtnState: (state: rotateData, action) => {
        state.roBtnState = action.payload
    }
    
  },
});

// export const sendRegisterRequest = (data : Object) => {
//     request('POST', 'api/user/register', data)
// }


const { reducer, actions } = rotateSlice; //
export const { setRoBtnState } = actions;
export default rotateSlice.reducer;