import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  queryData: { data: [], meta: { total: 1, current: 1, pages: 1 } },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const userInfo = action?.payload?.data
      state.userInfo = userInfo
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    logout: (state) => {
      state.userInfo = null
      localStorage.removeItem("userInfo")
    },
    setQueryData: (state, action) => {
      const queryData = action?.payload?.data
      state.queryData = queryData
    },
  },
})

export const { setCredentials, logout, setQueryData } = authSlice.actions

export default authSlice.reducer
