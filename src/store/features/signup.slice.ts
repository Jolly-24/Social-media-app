import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import toast from "react-hot-toast"

const initialState:userState = {
    token:null
}

export const signup = createAsyncThunk('usersignup/signup',async function(values:{name:string,email:string,password:string,rePassword:string,dateOfBirth: string;gender: string }){
    const options = {
        url:`https://linked-posts.routemisr.com/users/signup`,
        method:"POST",
        data:values
    }
    let {data} = await axios.request(options)
    return data
})

const signupSlice = createSlice({
    name:"usersignup",
    initialState,
    reducers:{

    },
    extraReducers:function(builder){
        builder.addCase(signup.fulfilled,(state,action)=>{
            console.log('done')
            state.token=action.payload.token
            toast.success("signup done")
        })
        builder.addCase(signup.rejected,(state,action)=>{
            toast.error("sorry")
        })
    }

})

export const signupReducer = signupSlice.reducer