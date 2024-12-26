"use client"
import { useAppDispatch } from '@/Hooks/store.hook'
import { signup } from '@/store/features/signup.slice'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import * as Yup from "yup";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export default function Page() {
      const dispatch = useAppDispatch()
        const router = useRouter()

        const SignupSchema = Yup.object().shape({
            name: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .required("Password is required"),
            rePassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Re-enter your password"),
            dateOfBirth: Yup.string().required("Date of Birth is required"),
            gender: Yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
          });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "", // Include gender here
    },
    validationSchema: SignupSchema, // Add validation schema
    onSubmit: (values) => {
      dispatch(signup(values))
        .then((res: any) => {
          if (res.payload?.message === "success") {
            toast.success("Signup successful! Redirecting...");
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Signup failed. Please try again.");
        });
    },
  });

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
  <VpnKeyIcon />
</Box>
         Sign up
          </Box>
      <Box sx={{ width: "600px", mx: "auto", borderRadius: 10, p: 3 }}>
        <Paper elevation={6} sx={{ p: 4, mt: 2 }}>
          <form style={{ display: "flex", flexDirection: "column", gap: "25px" }} onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              type="text"
              variant="filled"
              value={formik.values.name}
              onChange={formik.handleChange}
              name="name"
            />
            <TextField
              fullWidth
              id="email"
              label="Email"
              type="email"
              variant="filled"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
            />
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              variant="filled"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
            />
            <TextField
              fullWidth
              id="rePassword"
              label="Re-enter Password"
              type="password"
              variant="filled"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              name="rePassword"
            />
              <TextField
              fullWidth
              id="dateOfBirth"
              label="Date of Birth"
              type="date"
              variant="filled"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              name="dateOfBirth"
              InputLabelProps={{
                shrink: true, 
              }}
            />
            <FormControl>
              <FormLabel id="gender-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender-label"
                name="gender" // Match the initialValues key
                value={formik.values.gender} // Bind to Formik value
                onChange={formik.handleChange} // Use Formik change handler
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{backgroundColor:"cadetblue",fontWeight:"bold",fontSize:"18px"}}>
              Sign up
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}

