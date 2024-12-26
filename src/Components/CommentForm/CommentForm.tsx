import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Box, TextField, IconButton } from "@mui/material";
import { createComment } from "@/store/features/comment.slice"; // Assuming you have a slice for comments
import { useAppDispatch, useAppSelector } from "@/Hooks/store.hook";

export default function CommentInput({ postId }: { postId: string }) {
  const [comment, setComment] = useState("");
  const token = useAppSelector((store) => store.userReducer.token);
  const dispatch = useAppDispatch();

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const submitComment = () => {
    if (!comment.trim()) {
      alert("Comment cannot be empty");
      return;
    }
    if (!token) {
        alert("You need to be logged in to add a comment.");
        return;
      }
    dispatch(createComment({ token, content: comment, postId }));
    setComment(""); 
  };

  return (
    <Box sx={{ position: "relative", mt: 2 }}>
      <TextField
        multiline
        minRows={3}
        placeholder="Add your comment"
        fullWidth
        value={comment}
        onChange={handleCommentChange}
      />
      <IconButton
        sx={{ position: "absolute", top: "60px", right: "15px" }}
        onClick={submitComment}
      >
        <SendIcon sx={{ cursor: "pointer", ":hover": { color: "cadetblue" } }} />
      </IconButton>
    </Box>
  );
}
