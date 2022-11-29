import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dumpReducer from '../features/backingtrack/DumpSlice'
import mainReducer from '../features/mainpage/MainSlice'
import rotateReducer from '../features/rotatingbtn/RotateSlice'
import gameReducer from '../features/chordgame/GameSlice'
import chordReducer from '../features/chordthree/ChordSlice'
export const store = configureStore({
  // Reducer 등록
  reducer: {
    dump: dumpReducer,
    rotate: rotateReducer,
    main: mainReducer,
    game:gameReducer,
    chord: chordReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
