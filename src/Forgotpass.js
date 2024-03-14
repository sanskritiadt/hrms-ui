
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Hrmscss/FPF.css';
import {toast } from 'react-toastify';

function ForgotPassword1() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch(`/apigateway/api/auth/password/resetlink`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ email: values.email }),
        });
        const result = await response.json();
        console.log(result);
        toast.success('Email reset link successfully sent', { position: 'top-center', theme: "colored" });
      } catch (error) {
        console.error(error);
        toast.error("Error happend try after sometime.", { position: "top-center", theme: 'colored' })
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="forgot-password-container" style={{margin:'0px 15rem'}}>
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className="forgot-password-label" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            className={`forgot-password-input ${
              formik.touched.email && formik.errors.email ? 'is-invalid' : ''
            }`}
            type="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback">{formik.errors.email}</div>
          ) : null}
          <button
            className="forgot-password-button" 
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
  
    </div>
  );
}

export default ForgotPassword1;
