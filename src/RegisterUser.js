// import axios from "axios";
// import { useState } from "react";
// import {useNavigate } from 'react-router-dom';
// function RegisterUser() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleEmail = (event) => {
//         setEmail(event.target.value);
//     }

//     const handleUsername = (event) => {
//         setUsername(event.target.value);
//     }
//     const handlePassword = (event) => {
//         setPassword(event.target.value)
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.warn(email,password,username )
//         axios.post(`api/auth/register`, {
//             password: password,
//             email: email,
//             username:username,
//             "registerAsAdmin":false
//         }).then(response => {
//             console.log(response.data);
//             alert("register successful please verify your email");
//             navigate('/Login');
//         }).catch(error => {
//             console.log(error)
//             alert("error occured try after sometime.")
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);
//             alert(error.response.data.error.message);
//         })
//     }
// return (
//     <>
//         <div className='container mt-5 pt-5'>
//             <div className='row'>
//                 <div className="col-12 col-sm-8 col-md-6 m-auto">
//                     <div className='card border-0 shadow'>
//                         <div className='card-body'>
//                             <svg className='bi bi-align-center' id='svgimg' xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
//                                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
//                                 <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
//                             </svg>
//                             <form>
//                                 <input type="text" name="text" onChange={handleEmail} required value={email} className='form-control my-4 py-2 border border-light' placeholder='Enter your  email' />
//                                 <input type="text" name="text" onChange={handleUsername} required value={username} className='form-control my-4 py-2 border border-light' placeholder='Enter your  username' />
//                                 <input type="password" name="password" onChange={handlePassword} required value={password} autoComplete="on" className='form-control my-4 py-2 border border-light' placeholder='Enter your password' />
//                                 <div className="text-center mt-3">
//                                     <button type='button' className=" btn btn-outline-danger" onClick={handleSubmit} >Register</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     </>
// )
// }
// export default RegisterUser;
import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Registerformik = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        username: '',
        password: '',
        showPassword: false
    };

    const handleSubmit = (values, { setStatus, resetForm }) => {
        axios.post('api/auth/register', {
            email: values.email,
            username: values.username,
            password: values.password,
            "registerAsAdmin":false
        }).then((response) => {
            setStatus(response.data.message);
            resetForm(initialValues)
            console.log(response.data);
            toast.success("Register successful please verify your email.", { position: "top-center", theme: "colored" });
            navigate('/Login');
        }).catch((errors) => {
            console.log(errors);
            toast.error('Cannot register try after sometime',{ position: "top-center", theme: "colored" });
        })
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        username: Yup.string().required('Username is required.'),
        password: Yup.string().required('Password is required.')
            .min(8, 'Password must be at least 8 characters long.')
    });
    return (
        <Container>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, status, values }) => (
                    <Form className="changepassword-form">
                        {errors.serverError && <Alert variant="danger">{errors.serverError}</Alert>}
                        {status && <Alert variant="success">{status}</Alert>}
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <Field type="email" name="email" className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">UserName</label>
                            <Field type="text" name="username" className={`form-control ${touched.username && errors.username ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type={values.showPassword ? "text" : "password"} name="password" className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field type="checkbox" name="showPassword" className="form-check-input" />
                            <label htmlFor="showPassword" className="form-check-label">Show password</label>
                        </div>
                        <div className="text-center mt-2">
                        <button   type="submit" disabled={isSubmitting} >
                            {isSubmitting ? 'Submitting...' : 'Register User'}
                        </button>
                        </div>                                                  
                    </Form>
                )}
            </Formik>
        </Container>
    );

};

export default Registerformik;
