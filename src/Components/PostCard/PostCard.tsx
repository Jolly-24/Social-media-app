'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Post } from '@/types/posts.types';
import Image from 'next/image';
import CommentCard from '../CommentCard/CommentCard';
import { Box, Button, Divider, TextField, Menu, MenuItem, Fade } from '@mui/material';
import Link from 'next/link';
import CommentInput from '../CommentForm/CommentForm';
import { deletePost, getPosts, getUserPost } from '@/store/features/post.slice';
import { useAppDispatch } from '@/Hooks/store.hook';

export default function PostCard({ postInfo, showAllComments = false }: { postInfo: Post; showAllComments: boolean }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch()

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ Width: '70%', mx: 'auto', mt: 2, p: 3 }}>
      <CardHeader
        avatar={<Image src={postInfo.user.photo} width={50} height={50} alt={`${postInfo.user.name}`} />}
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              MenuListProps={{ 'aria-labelledby': 'fade-button' }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={()=>{
                handleMenuClose
                dispatch(deletePost(postInfo._id))
                setTimeout(()=>{
                  dispatch(getUserPost())
                },2000)
                }}>Delete Post</MenuItem>
              
            </Menu>
          </>
        }
        title={postInfo.user.name}
        subheader={new Date(postInfo.createdAt).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {postInfo.body}
        </Typography>
      </CardContent>
      {postInfo.image && (
        <CardMedia
          component="img"
          height="300"
          sx={{ boxShadow: 5 }}
          image={postInfo.image}
          alt="Post image"
        />
      )}
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton aria-label="like">
          <ThumbUpAltIcon />
        </IconButton>
        <IconButton aria-label="comment">
          <InsertCommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Divider sx={{ color: 'gray' }}>Comments</Divider>

      <Box sx={{ p: 2 }}>
        {postInfo.comments.length > 0 && !showAllComments && <CommentCard commentInfo={postInfo.comments[0]} />}
        {postInfo.comments.length > 1 &&
          showAllComments &&
          postInfo.comments.map((comment) => (
            <CommentCard key={comment._id} commentInfo={comment} />
          ))}
        {!showAllComments && postInfo.comments.length > 1 && (
          <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor: 'cadetblue ' }}>
            <Link href={`/post/${postInfo._id}`}>
              Show more comments
            </Link>
          </Button>
        )}
        <CommentInput postId={postInfo._id} />
      </Box>
    </Card>
  );
}
