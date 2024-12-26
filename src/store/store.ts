import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user.slice";
import { postReducer } from "./features/post.slice";
import { signupReducer } from "./features/signup.slice";
import { commentsReducer } from "./features/comment.slice";

export const myStore = configureStore({
    reducer:{
        userReducer,
        postReducer,
        signupReducer,
        commentsReducer
    },
})

type AppState = typeof myStore
export type RootState = ReturnType<AppState["getState"]>
export type AppDispatch = AppState["dispatch"]