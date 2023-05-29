import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert, Container } from 'react-bootstrap';
import './Hrmscss/CP.css'
import { toast } from 'react-toastify';

const ChangepasswordForm = () => {
    const token = localStorage.getItem("response-token")
    const initialValues = {
        oldPassword: '',
        newPassword: '',
        showPassword: false
    };
    const handleSubmit = (values, { setStatus, resetForm }) => {
        axios.post('/api/user/password/update', {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setStatus(response.data.message);
            resetForm(initialValues)
            console.log(response.data);
            toast.success("password changed successfully.", { position: 'top-center', theme: "colored" })

        }).catch((errors) => {
            console.log(errors);
            toast.error('error!!', { position: 'top-center', theme: "colored" })
        })
    }
    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('old  password is required.'),
        newPassword: Yup.string().required('New password is required.')
            .min(8, 'New password must be at least 8 characters long.')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
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
                            <label htmlFor="oldPassword">Current Password</label>
                            <Field type="password" name="oldPassword" className={`form-control ${touched.oldPassword && errors.oldPassword ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="oldPassword" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <Field type={values.showPassword ? "text" : "password"} name="newPassword" className={`form-control ${touched.newPassword && errors.newPassword ? 'is-invalid' : ''}`} />
                            <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field type="checkbox" name="showPassword" className="form-check-input" />
                            <label htmlFor="showPassword" className="form-check-label">Show password</label>
                        </div>
                        <Button variant="primary" type="submit" disabled={isSubmitting} style={{ marginTop: 20 }}>
                            {isSubmitting ? 'Submitting...' : 'Change Password'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};
export default ChangepasswordForm;





