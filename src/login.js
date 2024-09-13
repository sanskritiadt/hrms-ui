// import React from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useState } from 'react';
// import './Hrmscss/App.css';
// import '@fortawesome/fontawesome-free/css/all.css';
// import { toast } from 'react-toastify';
// import LoadingPage from "./LoadingPage";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [logincheck, setlogincheck] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const navigate = useNavigate();
//   const handleSubmit = (values) => {
//     setlogincheck(true);
//     setLoading(true);
//     axios
//       .post(`/apigateway/api/auth/login`, {
//         email: values.email,
//         password: values.password,
//         deviceInfo: {
//           deviceId: 'D1',
//           deviceType: 'DEVICE_TYPE_ANDROID',
//         },
//       })
//       .then((response) => {
//         localStorage.setItem('response-token', response.data.jwtAuthenticationResponse.accessToken);
//         localStorage.setItem('refresh-token', response.data.jwtAuthenticationResponse.refreshToken);
//         localStorage.setItem('EmpID', response.data.employeeId);
//         console.log(response.data.jwtAuthenticationResponse.accessToken);
//         toast.success('Login-Successfull.', { position: "top-center", theme: "colored" });
//         navigate('/');
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response) {
//           if (error.response.status === 417) {
//             setlogincheck(false);
//             toast.error("Bad credentials. Please try again.", {
//               position: "top-center",
//               theme: "colored",
//             });
//           } else {
//             toast.error("Server error. Please try again.", {
//               position: "top-center",
//               theme: "colored",
//             });
//           }
//         }
//         // alert("server error Cannot Login!!");
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//         // toast.error("Server error Cannot Login!!", {
//         //   position: "top-center",
//         //   theme: "colored",
//         // });
//       })
//       .finally(() => {
//         setlogincheck(false);
//         setLoading(false);
//       });
//   };

//   return (
//     <div className=' d-flex justify-content-center align-items-center ' style={{height:'100vh'}}>
//         {loading ? <LoadingPage/> : ''}
//       <div className='border-0 shadow ' style={{ width:"550px", height:'420px', borderRadius:'50px'}}>

//       <div className='card-body' >
//               <svg className='bi bi-align-center mt-4' id='svgimg' xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" viewBox="0 0 16 16">
//                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
//                 <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
//               </svg>

//               <Formik
//                 initialValues={{ email: '', password: '' }}
//                 onSubmit={handleSubmit}
//               >
//                 {({ isSubmitting, values }) => (
//                   <Form>
//                     <Field
//                       type="email"
//                       name="email"
//                       placeholder="Enter email"
//                       className="form-control my-4 py-2 border border-light"
//                     />
//                     <ErrorMessage name="email" component="div" className="text-danger" />

//                     <div className="input-group" style={{ alignItems: 'center' }}>
//                       <Field
//                         type={showPassword ? 'text' : 'password'}
//                         name="password"
//                         placeholder="Enter password"
//                         className="form-control py-2 border border-light"
//                       />
//                       <div className="input-group-append position-absolute" style={{ zIndex: '100' , right:0, top:'-1px'}}>
//                         <button
//                           type="button"
//                           className="btn btn-dark py-2"
//                           onClick={toggleShowPassword}
//                         >
//                           {showPassword ? (
//                             <i className="fas fa-eye-slash"></i>
//                           ) : (
//                             <i className="fas fa-eye"></i>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                     <ErrorMessage name="password" component="div" className="text-danger" />
//                     <div className="text-center mt-3">
//                       <button
//                         type='submit'
//                         className=" btn btn-outline-success py-2 px-4 "
//                         disabled={ logincheck || !values.email || !values.password}
//                       >
//                         Login
//                       </button>
//                       <div style={{ marginTop: '20px' }}>
//                         <Link to="/Forgotpassword" className="nav-link pt-2 fp"><i className="fas fa-lock"></i> Forget password</Link>
//                         <Link to="/ChangepasswordForm" className="nav-link pt-2 cp"><i className="fas fa-key"></i> Change password</Link>
//                         <Link to="/RegisterUser" className="nav-link pt-2 ru"><i className="fas fa-user-plus"></i> Register User</Link>
//                       </div>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             </div>

//       </div>
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "./Store/authSlice";
// import {
//   TextField,
//   Button,
//   IconButton,
//   InputAdornment,
//   Container,
//   Paper,
//   Typography,
//   Box,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import LoadingPage from "./LoadingPage";
// import alphaLogo from "./Images/alphaLogo.png";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = (values) => {
//     dispatch(login(values))
//       .unwrap()
//       .then(() => {
//         toast.success("Login Successful.", {
//           position: "top-center",
//           theme: "colored",
//         });
//         navigate("/");
//       })
//       .catch((error) => {
//         toast.error(error, { position: "top-center", theme: "colored" });
//       });
//   };

//   return (
//     <Container
//       maxWidth="xs"
//       style={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {loading && <LoadingPage />}
//       <Paper
//         elevation={3}
//         sx={{ padding: "2rem", borderRadius: "15px", width: "100%" }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//           <Link to="/">
//             <img
//               src={alphaLogo}
//               className="d-inline-block align-top"
//               style={{ width: "80px", height: "80px" }}
//               alt="alphaLogo"
//             />
//           </Link>
//         </Box>

//         <Formik
//           initialValues={{ email: "", password: "" }}
//           onSubmit={handleSubmit}
//         >
//           {({ values, errors, touched }) => (
//             <Form>
//               <Field name="email">
//                 {({ field }) => (
//                   <TextField
//                     {...field}
//                     placeholder="Enter your email address"
//                     fullWidth
//                     margin="normal"
//                     type="email"
//                     error={Boolean(touched.email && errors.email)}
//                     helperText={touched.email && errors.email}
//                     InputProps={{
//                       style: { backgroundColor: "white" },
//                     }}
//                   />
//                 )}
//               </Field>

//               <Field name="password">
//                 {({ field }) => (
//                   <TextField
//                     {...field}
//                     placeholder="Enter your password"
//                     fullWidth
//                     margin="normal"
//                     type={showPassword ? "text" : "password"}
//                     InputProps={{
//                       style: { backgroundColor: "white" },
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton onClick={toggleShowPassword} edge="end">
//                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                     error={Boolean(touched.password && errors.password)}
//                     helperText={touched.password && errors.password}
//                   />
//                 )}
//               </Field>

//               <Box sx={{ textAlign: "left", mt: 1, mb: 2 }}>
//                 <Link
//                   to="/Forgotpassword"
//                   style={{ color: "#1976d2", textDecoration: "none" }}
//                 >
//                   Forgot Password?
//                 </Link>
//               </Box>

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   mt: 2,
//                   mb: 2,
//                   bgcolor: "#333",
//                   "&:hover": { bgcolor: "#555" },
//                   color: "white",
//                   textTransform: "none",
//                 }}
//                 disabled={loading || !values.email || !values.password}
//               >
//                 Log In
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </Paper>
//     </Container>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./Store/authSlice";
import LoadingPage from "./LoadingPage";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import alphaLogo from "./Images/alphaLogo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success("Login Successful.", {
          position: "top-center",
          theme: "colored",
        });
        navigate("/");
        // window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Incorrect Credentials", { position: "top-center", theme: "colored" });
      });
  };

  const inputStyle = {
    '& .MuiInputBase-input': {
      border: 'none',
      outline: 'none',
      padding: '10px 0',
      '&::placeholder': {
        color: '#999',
        opacity: 1,
      },
      background:'none'
    },
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && <LoadingPage />}
      <Paper
        elevation={3}
        sx={{ padding: "2rem", borderRadius: "25px", width: "100%" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Link to="/">
            <img
              src={alphaLogo}
              className="d-inline-block align-top"
              style={{ width: "80px", height: "80px" }}
              alt="alphaLogo"
            />
          </Link>
        </Box>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched }) => (
            <Form>
              <Field name="email">
                {({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter your email address"
                    fullWidth
                    margin="normal"
                    type="email"
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    sx={inputStyle}
                  />
                )}
              </Field>

              <Field name="password">
                {({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter your password"
                    fullWidth
                    margin="normal"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={toggleShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    sx={inputStyle}
                  />
                )}
              </Field>

              <Box sx={{ textAlign: "left", mt: 1, mb: 2 }}>
                <Link
                  to="/Forgotpassword"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  mb: 2,
                  bgcolor: "#333",
                  "&:hover": { bgcolor: "#555" },
                  color: "white",
                  textTransform: "none",
                }}
                disabled={loading || !values.email || !values.password}
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "./Store/authSlice";
// import LoadingPage from './LoadingPage';
// import {
//   TextField,
//   Button,
//   IconButton,
//   InputAdornment,
//   Container,
//   Paper,
//   Box,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import alphaLogo from "./Images/alphaLogo.png";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = (values) => {
//     dispatch(login(values))
//       .unwrap()
//       .then(() => {
//         toast.success("Login Successful.", {
//           position: "top-center",
//           theme: "colored",
//         });
//         navigate("/");
//         // window.location.reload();
//       })
//       .catch((error) => {
//         toast.error(error, { position: "top-center", theme: "colored" });
//       });
//   };

//   const inputStyle = {
//     '& .MuiInputBase-root': {
//       backgroundColor: '#f0f0f0',
//       borderRadius: '4px',
//       padding: '4px 12px',
//       border: 'none',
//       '&:hover': {
//         backgroundColor: '#e8e8e8',
        
//       },
//     },
//     '& .MuiInputBase-input': {
//       padding: '0',
//       '&::placeholder': {
//         color: '#999',
//         opacity: 1,
//         border: 'none',
//       },
//     },
//     '& .MuiOutlinedInput-notchedOutline': {
//       border: 'none',
//     },
//   };

//   return (
//     <Container
//       maxWidth="xs"
//       style={{
//         height: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {loading && <LoadingPage />}
//       <Paper
//         elevation={3}
//         sx={{ 
//           padding: "2rem", 
//           borderRadius: "15px", 
//           width: "100%",
//           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
//           <Link to="/">
//             <img
//               src={alphaLogo}
//               style={{ width: "80px", height: "80px" }}
//               alt="alphaLogo"
//             />
//           </Link>
//         </Box>

//         <Formik
//           initialValues={{ email: "", password: "" }}
//           onSubmit={handleSubmit}
//         >
//           {({ values, errors, touched }) => (
//             <Form>
//               <Field name="email">
//                 {({ field }) => (
//                   <TextField
//                     {...field}
//                     placeholder="Enter your email address"
//                     fullWidth
//                     margin="normal"
//                     type="email"
//                     variant="outlined"
//                     error={Boolean(touched.email && errors.email)}
//                     helperText={touched.email && errors.email}
//                     sx={inputStyle}
//                   />
//                 )}
//               </Field>

//               <Field name="password">
//                 {({ field }) => (
//                   <TextField
//                     {...field}
//                     placeholder="Enter your password"
//                     fullWidth
//                     margin="normal"
//                     type={showPassword ? "text" : "password"}
//                     variant="outlined"
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton onClick={toggleShowPassword} edge="end">
//                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                     error={Boolean(touched.password && errors.password)}
//                     helperText={touched.password && errors.password}
//                     sx={inputStyle}
//                   />
//                 )}
//               </Field>

//               <Box sx={{ textAlign: "left", mt: 1, mb: 2 }}>
//                 <Link
//                   to="/Forgotpassword"
//                   style={{ color: "#1976d2", textDecoration: "none" }}
//                 >
//                   Forgot Password?
//                 </Link>
//               </Box>

//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 sx={{
//                   mt: 2,
//                   mb: 2,
//                   bgcolor: "#333",
//                   "&:hover": { bgcolor: "#555" },
//                   color: "white",
//                   textTransform: "none",
//                   borderRadius: '4px',
//                 }}
//                 disabled={loading || !values.email || !values.password}
//               >
//                 Log In
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </Paper>
//     </Container>
//   );
// };

// export default Login;
