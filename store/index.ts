import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// *** store.ts 파일
// 슬라이스들을 통합한 store를 만들고, RootState를 정의해준다.

// 리덕스 store 생성함수
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// store 엑스포트
export default store;

// RootState 엑스포트
export type RootState = ReturnType<typeof store.getState>;
