import { postsState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const initialState:postsState = {
    posts:null,
    postDetails:null
}
export const getPosts = createAsyncThunk('posts/getPosts',async function(_,{getState}){
    const state:any = getState()
    const token = state.userReducer.token

const options = {
    url:`https://linked-posts.routemisr.com/posts?limit=50&page=42`,
    method:"GET",
    headers:{
        token
    }
}
let {data} = await axios.request(options)
return data.posts
})

export const getPostDetails = createAsyncThunk('posts/getPostDetails',async function(id:string,{getState}){
    const state:any = getState()
    const token = state.userReducer.token

const options = {
    url:`https://linked-posts.routemisr.com/posts/${id}`,
    method:"GET",
    headers:{
        token
    }
}
let {data} = await axios.request(options)
return data.post
})

export const getUserPost = createAsyncThunk('posts/getUserPost',async function(_,{getState}){
    const state:any = getState()
    const token = state.userReducer.token

const options = {
    url:`https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?limit=10`,
    method:"GET",
    headers:{
        token
    }
}
let {data} = await axios.request(options)
return data.posts
}) 
export const deletePost = createAsyncThunk('posts/deletePost',async function(id:string,{getState}){
    const state:any = getState()
    const token = state.userReducer.token

const options = {
    url:`https://linked-posts.routemisr.com/posts/${id}`,
    method:"DELETE",
    headers:{
        token
    }
}
let {data} = await axios.request(options)
return data.post
}) 

const postSlice  = createSlice({
    name:"posts",
    initialState,
    reducers:{

    },
    extraReducers:function(builder){
        builder.addCase(getPosts.fulfilled,function(state,action){
            console.log("done")
            console.log({state,action})
            state.posts=action.payload
        })
        builder.addCase(getPosts.rejected,function(state,action){
            console.log("failed")
            console.log({state,action})
        })
        builder.addCase(getPostDetails.fulfilled,function(state,action){
            console.log("done")
            console.log({state,action})
            state.postDetails=action.payload
        })
        builder.addCase(getPostDetails.rejected,function(state,action){
            console.log("failed")
            console.log({state,action})
        })
        builder.addCase(getUserPost.fulfilled,function(state,action){
            console.log("done")
            console.log({state,action})
            state.posts=action.payload
        })
        builder.addCase(getUserPost.rejected,function(state,action){
            console.log("failed")
            console.log({state,action})
        })
        builder.addCase(deletePost.fulfilled,function(state,action){
            console.log("done")
            console.log({state,action})
            toast.success("Your post deleted successfully")
        })
        builder.addCase(deletePost.rejected,function(state,action){
            console.log("failed")
            console.log({state,action})
        })
    }
})

export const postReducer = postSlice.reducer