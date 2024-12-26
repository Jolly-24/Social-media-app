import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAppSelector } from '@/Hooks/store.hook';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Postform() {
  const { token } = useAppSelector((store) => store.userReducer);
  const postContentRefrence = useRef<HTMLInputElement>(null);
  const postFileRefrence = useRef<HTMLInputElement>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  async function createPost() {
    const content = postContentRefrence.current?.value || '';
    const file = postFileRefrence.current?.files?.[0];

    const myFormData = new FormData();
    myFormData.append('body', content);
    if (file) {
      myFormData.append('image', file);
    }

    try {
      const options = {
        url: `https://linked-posts.routemisr.com/posts`,
        method: 'POST',
        headers: {
          token,
        },
        data: myFormData,
      };

      const { data } = await axios.request(options);
      if (data.message === 'success') {
        toast.success('Post has been created');
      } else {
        toast.error('Sorry, try again later');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileType(file.name); 
    } else {
      setFileType(null);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', mx: 'auto' }}>
        <TextField
          fullWidth
          multiline
          minRows={7}
          placeholder="What's on your mind"
          inputRef={postContentRefrence}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              sx={{ backgroundColor: 'cadetblue' }}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput type="file" ref={postFileRefrence} onChange={handleFileChange} />
            </Button>
            <Typography sx={{mt:2}}>
              {fileType ? `File name: ${fileType}` : 'No files selected'}
            </Typography>
          </Box>

          <Button
            sx={{ backgroundColor: 'cadetblue' }}
            onClick={createPost}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Post
          </Button>
        </Box>
      </Box>
    </>
  );
}
