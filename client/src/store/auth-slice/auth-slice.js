import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { CloudHail } from "lucide-react"



const initialState = {
   isAuthenticated: false,
   isLoading: true,
   user: null
}

export const registerUser = createAsyncThunk(
   '/auth/register',
   async (formData) => {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
         withCredentials: true
      })
      console.log("the response of the register is", response)
      return response?.data;
   }

)

export const loginUser = createAsyncThunk(
   '/auth/login',
   async (formData) => {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
         withCredentials: true
      })
      console.log("the response of the login is", response)

      return response?.data
   }
)

export const checkAuth = createAsyncThunk(
   '/auth/check-auth',

   async () => {
      const response = await axios.get('http://localhost:5000/api/auth/check-auth', {
         withCredentials: true,
         headers: {
            "Cache-Control":
               "no-store, no-cache, must-revalidate, proxy-revalidate",
         },
         // here have to do something
      })
      return response?.data
   }
)

export const logout = createAsyncThunk('/auth/logout',
   async () => {
      // {}have to send accorign to the axios
      const response = await axios.post('http://localhost:5000/api/auth/logout', {}, {
         withCredentials: true
      })
      console.log(response)
   }
)

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {

   },
   // we havenot used extrareducers here
   // have to manage state here
   extraReducers: (builder) => {
      builder
         .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
         })
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            console.log(action);

            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
         })
         .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
         })
         .addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
         }).addCase(logout.fulfilled, (state) => {
            console.log("called here")
            state.isLoading = false,
               state.isAuthenticated = false,
               state.user = null

         })
   }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer

