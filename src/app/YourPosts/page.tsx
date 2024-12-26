'use client'
import Loading from '@/Components/Loading/Loading'
import PostCard from '@/Components/PostCard/PostCard'
import { useAppDispatch, useAppSelector } from '@/Hooks/store.hook'
import { getUserPost } from '@/store/features/post.slice'
import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid2';


export default function page() {
     let posts =  useAppSelector((store)=> store.postReducer.posts)
       const dispatch = useAppDispatch()
     useEffect(()=>{
     dispatch(getUserPost())  
     },[])
    
  return (
    <>
   <Box sx={{mt:15}}>
   <Grid container>
    <Grid size={3}></Grid>
    <Grid size={{ xs: 12, md: 6 }} sx={{p:2}}>
   {
            posts? posts.map((post)=><PostCard  key={post._id} postInfo={post} showAllComments={false}/> ):<Loading/>
    
          }
          </Grid>
    <Grid size={3}></Grid>

   </Grid>
   </Box>
    </>
  )
}
