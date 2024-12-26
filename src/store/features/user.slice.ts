import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";


const initialState:userState = {
    token:localStorage.getItem("token")
}


export const login = createAsyncThunk('user/login',async function(values:{email:string,password:string}){
    const options = {
        url:`https://linked-posts.routemisr.com/users/signin`,
        method:"POST",
        data:values
    }
    let {data} = await axios.request(options)
    return data
})



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        logout(state) {
            state.token = null; // Clear the token from the state
            localStorage.removeItem("token"); // Remove the token from local storage
            toast.success("Logged out successfully");
        }
    },
    extraReducers:function(builder){
        builder.addCase(login.fulfilled,(state,action)=>{
            console.log('done')
            state.token=action.payload.token
            localStorage.setItem("token",action.payload.token)
            toast.success("welcome")
        })
        builder.addCase(login.rejected,(state,action)=>{
            toast.error("sorry")
        })
    }

})

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer