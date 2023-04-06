import { createSlice } from '@reduxjs/toolkit';

// initialState 타입 정의
type StateType = {
  isLoggedIn: boolean;
};

// initialState 생성
const initialState: StateType = { isLoggedIn: false };

// 슬라이스생성
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// 액션을 export 해준다.
export const { login, logout } = authSlice.actions;

// 슬라이스를 export 해준다.
export default authSlice.reducer;
