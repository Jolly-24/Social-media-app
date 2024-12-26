"use client"
import { useAppDispatch } from '@/Hooks/store.hook'
import { login } from '@/store/features/user.slice'
import { Box, Button, Paper, TextField } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function page() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const formik  = useFormik({
        initialValues:{
                email:"",
                password:"",
           
        },
        onSubmit:(values)=>{
            dispatch(login(values)).then((res)=>{
                if(res.payload.message==="success"){
                    setTimeout(()=>{
                     router.push("/")   
                    },2000)
                }
            }).catch((error)=>{console.log(error)})
        } 
    })
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
    fontSize:"50px",
    fontWeight:"bold",
    display: "flex", // Added for centering the icon
    alignItems: "center", // Vertically center content
    justifyContent: "center", // Horizontally center content
  }}
>
  <LockOpenIcon/>
</Box>
        Login
          </Box>
  <Box sx={{width:"600px",mx:"auto", borderRadius:"20px",p:3}}>
    <Paper elevation={6} sx={{p:4,mt:5}}>
    <form style={{display:"flex" , flexDirection:"column" ,gap:"25px"}} onSubmit={formik.handleSubmit}>
    <TextField fullWidth id="filled-basic" label="Email" type='email' variant="filled" 
    value={formik.values.email} onChange={formik.handleChange} name='email' />
    <TextField fullWidth id="filled-basic" label="Password" type='password' variant="filled"
    value={formik.values.password} onChange={formik.handleChange} name='password' />
    <Button type='submit' fullWidth variant="contained" sx={{backgroundColor:"cadetblue",fontWeight:"bold",fontSize:"18px"}}>Login</Button>

    </form>
    </Paper>
  </Box>
    </>
  )
}
