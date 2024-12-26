import { Box, CardHeader, IconButton, Typography } from '@mui/material'
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'
import { Comments } from '@/types/posts.types';
import userPlaceholder from '../../assets/images/boy.png'

export default function CommentCard({commentInfo}:{commentInfo:Comments}) {

    function handleImagePath(path:string){
        if(path.includes("undefined")) return userPlaceholder
        else return path
    }

  return (
   <>
      <Box sx={{backgroundColor:"gainsboro",borderRadius:"5px",mb:2,boxShadow:3}}>
      <CardHeader
        avatar={
          <Image src={handleImagePath(commentInfo.commentCreator.photo)}  width={50} height={50} alt={`${commentInfo.commentCreator.name}`} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={commentInfo.commentCreator.name}
        subheader={new Date(commentInfo.createdAt).toLocaleDateString()}
      />
      <Typography component={"p"} sx={{px:4,py:2}}>
        {commentInfo.content}
      </Typography>
      </Box>
   </>
  )
}
