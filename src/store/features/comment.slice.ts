import { commentsState } from "@/types/posts.types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Define the initial state for the comments slice
const initialState:commentsState = {
  comments: [], // Array to store comments
};

// Async thunk for creating a comment
export const createComment = createAsyncThunk(
    "comments/createComment",
    async ({ token, content, postId }: { token: string; content: string; postId: string }, thunkAPI) => {
      try {
        const response = await axios.post(
          "https://linked-posts.routemisr.com/comments",
          { content, post: postId },
          {
            headers: {
              token,
            },
          }
        );
        return response.data.comment; // Return the comment object if the API sends it under `comment`
      } catch (error) {
        console.log(error)
      }
    }
  );
  
// Comments slice
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments=action.payload;
        toast.success("Comment added successfully")
      })
      .addCase(createComment.rejected, (state, action) => {
        console.log("fail")
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
