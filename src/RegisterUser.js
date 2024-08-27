// import React, { useState } from "react";
// import axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Alert, Container } from "react-bootstrap";
// import { toast } from "react-toastify";
// import LoadingPage from "./LoadingPage";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const Registerformik = () => {
//   const [loading, setLoading] = useState(false);
//   const initialValues = {
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     showPassword: false,
//     employeeType: "",
//   };
//   const token = useSelector((state) => state.auth.token);

//   const handleSubmit = (values, { setStatus, resetForm }) => {
//     setLoading(true);
//     axios
//       .post(
//         "/apigateway/api/auth/register",
//         {
//           firstName: values.firstName,
//           middleName: values.middleName,
//           lastName: values.lastName,
//           email: values.email,
//           password: values.password,
//           confirmPassword: values.confirmPassword,
//           employeeType: values.employeeType,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setStatus(response.data.message);
//         resetForm(initialValues);
//         console.log(response.data);
//         toast.success("Registered successfully. please verify your email", {
//           position: "top-center",
//           theme: "colored",
//         });
//         setLoading(false);
//       })
//       .catch((errors) => {
//         console.log(errors);
//         toast.error(
//           errors.response.data.message ||
//             "An error occurred while registering the user"
//         );
//         setLoading(false);
//       });
//   };

//   const validationSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .required("First name is required")
//       .matches(/^[a-zA-Z]+$/, "First name can only contain letters")
//       .max(30, "First name must be at most 30 characters long"),
//     middleName: Yup.string()
//       .matches(/^[a-zA-Z]+$/, "Middle name can only contain letters")
//       .max(30, "Middle name must be at most 30 characters long"),
//     lastName: Yup.string()
//       .required("Last name is required")
//       .matches(/^[a-zA-Z]*$/, "Last name can only contain letters")
//       .max(30, "Last name must be at most 30 characters long"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .matches(
//         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.in|in)$/,
//         "Email must be a valid email address ending with .com, .co.in, or .in"
//       )
//       .required("Email is required"),
//     password: Yup.string()
//       .required("New password is required.")
//       .min(8, "New password must be at least 8 characters long.")
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
//         "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
//       ),
//     confirmPassword: Yup.string()
//       .required("Confirm password is required.")
//       .min(8, "New password must be at least 8 characters long.")
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
//         "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
//       ),
//   });
//   return (
//     <div>
//       <div className="mt-3">
//         <nav
//           aria-label="breadcrumb"
//           style={{ "--bs-breadcrumb-divider": "'>>'" }}
//         >
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <Link to="/">Home</Link>{" "}
//             </li>
//             <li className="breadcrumb-item">
//               <a href="">Employee Management</a>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               Add Employee
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <Container
//         style={{
//           marginTop: "50px",
//           marginLeft: "200px",
//           width: "40rem",
//           height: "60rem",
//         }}
//       >
//         {loading ? <LoadingPage /> : ""}
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting, errors, touched, status, values }) => (
//             <Form className="changepassword-form">
//               {errors.serverError && (
//                 <Alert variant="danger">{errors.serverError}</Alert>
//               )}
//               {status && <Alert variant="success">{status}</Alert>}
//               <div className="form-group">
//                 <label htmlFor="firstName">First Name</label>
//                 <Field
//                   type="text"
//                   name="firstName"
//                   className={`form-control ${
//                     touched.firstName && errors.firstName ? "is-invalid" : ""
//                   }`}
//                 />
//                 <ErrorMessage
//                   name="firstName"
//                   component="div"
//                   className="invalid-feedback"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="middleName">Middle Name</label>
//                 <Field
//                   type="text"
//                   name="middleName"
//                   className={`form-control ${
//                     touched.middleName && errors.middleName ? "is-invalid" : ""
//                   }`}
//                 />
//                 <ErrorMessage
//                   name="middleName"
//                   component="div"
//                   className="invalid-feedback"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="lastName">Last Name</label>
//                 <Field
//                   type="text"
//                   name="lastName"
//                   className={`form-control ${
//                     touched.lastName && errors.lastName ? "is-invalid" : ""
//                   }`}
//                 />
//                 <ErrorMessage
//                   name="lastName"
//                   component="div"
//                   className="invalid-feedback"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email">E-mail</label>
//                 <Field
//                   type="email"
//                   name="email"
//                   className={`form-control ${
//                     touched.email && errors.email ? "is-invalid" : ""
//                   }`}
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="invalid-feedback"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="employeeType" className="form-check-label">
//                   Employee Type
//                 </label>
//                 <Field
//                   type="text"
//                   name="employeeType"
//                   className={`form-control ${
//                     touched.employeeType && errors.employeeType
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                   as="select"
//                 >
//                   <option value="Contractual">Contractual</option>
//                   <option value="FullTime">Full Time</option>
//                 </Field>
//                 <ErrorMessage
//                   name="employeeType"
//                   component="div"
//                   className="invalid-feedback"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <Field
//                   type={values.showPassword ? "text" : "password"}
//                   name="password"
//                   className={`form-control ${
//                     touched.password && errors.password ? "is-invalid" : ""
//                   }`}
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="invalid-feedback"
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <Field
//                   type={values.showPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   className={`form-control ${
//                     touched.confirmPassword && errors.confirmPassword
//                       ? "is-invalid"
//                       : ""
//                   }`}
//                 />
//                 <ErrorMessage
//                   name="confirmPassword"
//                   component="div"
//                   className="invalid-feedback"
//                 />
//               </div>
//               <div className="form-group  d-flex">
//                 <label htmlFor="showPassword" className="form-check-label">
//                   Show password
//                 </label>
//                 <Field
//                   type="checkbox"
//                   name="showPassword"
//                   className="form-check-input ms-4"
//                 />
//               </div>

//               <div className="text-center mt-2">
//                 <button
//                   className="btn btn-outline-success py-2 px-4 mt-4"
//                   type="submit"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Submitting..." : "Register User "}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </Container>
//     </div>
//   );
// };

// export default Registerformik;

import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Breadcrumbs,
  Link,
  Paper,
  Snackbar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MuiAlert from "@mui/material/Alert";
import LoadingPage from "./LoadingPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Registerformik = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const token = useSelector((state) => state.auth.token);

  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeType: "Contractual",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    axios
      .post(
        "/apigateway/api/auth/register",
        {
          firstName: values.firstName,
          middleName: values.middleName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          employeeType: values.employeeType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        resetForm();
        setSnackbar({
          open: true,
          message: "Registered successfully. Please verify your email.",
          severity: "success",
        });
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message:
            error.response?.data?.message ||
            "An error occurred while registering the user",
          severity: "error",
        });
      })
      .finally(() => {
        setLoading(false);
        setSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[a-zA-Z]+$/, "First name can only contain letters")
      .max(30, "First name must be at most 30 characters long"),
    middleName: Yup.string()
      .matches(/^[a-zA-Z]*$/, "Middle name can only contain letters")
      .max(30, "Middle name must be at most 30 characters long"),
    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[a-zA-Z]+$/, "Last name can only contain letters")
      .max(30, "Last name must be at most 30 characters long"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.in|in)$/,
        "Email must be a valid address ending with .com, .co.in, or .in"
      )
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    employeeType: Yup.string().required("Employee type is required"),
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        {loading && <LoadingPage />}
        <Box my={4}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} to="/" color="inherit">
              Home
            </Link>
            <Link color="inherit">Employee Management</Link>
            <Typography color="textPrimary">Add Employee</Typography>
          </Breadcrumbs>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Paper elevation={3} sx={{ p: 4, mt: 4, width: '100%', maxWidth: 600 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="firstName"
                        label="First Name"
                        error={touched.firstName && errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="middleName"
                        label="Middle Name"
                        error={touched.middleName && errors.middleName}
                        helperText={touched.middleName && errors.middleName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        error={touched.lastName && errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="email"
                        label="Email"
                        error={touched.email && errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        error={touched.employeeType && errors.employeeType}
                      >
                        <InputLabel>Employee Type</InputLabel>
                        <Field
                          as={Select}
                          name="employeeType"
                          label="Employee Type"
                        >
                          <MenuItem value="Contractual">Contractual</MenuItem>
                          <MenuItem value="FullTime">Full Time</MenuItem>
                        </Field>
                        <FormHelperText>
                          {touched.employeeType && errors.employeeType}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        error={touched.password && errors.password}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </Grid>
                  </Grid>
                  <Box mt={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Register User"}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Registerformik;



