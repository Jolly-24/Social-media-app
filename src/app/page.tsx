'use client'
import PostCard from "@/Components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "@/Hooks/store.hook";
import { getPosts } from "@/store/features/post.slice";
import Grid from '@mui/material/Grid2';
import { useEffect } from "react";
import Loading from '@/Components/Loading/Loading'
import { Box, Typography } from "@mui/material";
import TimelineIcon from '@mui/icons-material/Timeline';
import Postform from "@/Components/PostForm/Postform";



export default function Home() {
 let posts =  useAppSelector((store)=> store.postReducer.posts)
  const dispatch = useAppDispatch()
useEffect(()=>{
dispatch(getPosts())  
},[])
  return (
   <>
    <Box sx={{textAlign:"center" , mt:15, fontWeight:"bold", fontSize:"35px",color:"cadetblue",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"}}>
    <Box
  sx={{
    width: 50,
    height: 50,
      backgroundColor: "cadetblue",
    borderRadius: "100%",
    color: "white",
    display: "flex", // Added for centering the icon
    alignItems: "center", // Vertically center content
    justifyContent: "center", // Horizontally center content
  }}
>
  <TimelineIcon />
</Box>
          TimeLine
          </Box>

  <Box>
  <Grid container>
    <Grid size={3}></Grid>
    <Grid size={{ xs: 12, md: 6 }} sx={{p:2}}>
    <Postform/>
      {
        posts? posts.map((post)=><PostCard  key={post._id} postInfo={post} showAllComments={false}/> ):<Loading/>

      }
        
    </Grid>
    <Grid size={3}></Grid>

   </Grid>
  </Box>
  
   </>
  );
}
