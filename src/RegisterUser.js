import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Alert, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Registerformik = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    employeeType: "",
  };
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = (values, { setStatus, resetForm }) => {
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
        setStatus(response.data.message);
        resetForm(initialValues);
        console.log(response.data);
        toast.success("Registered successfully. please verify your email", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((errors) => {
        console.log(errors);
        toast.error(
          errors.response.data.message ||
            "An error occurred while registering the user"
        );
        setLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .matches(/^[a-zA-Z]+$/, "First name can only contain letters")
      .max(30, "First name must be at most 30 characters long"),
    middleName: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Middle name can only contain letters")
      .max(30, "Middle name must be at most 30 characters long"),
    lastName: Yup.string()
      .required("Last name is required")
      .matches(/^[a-zA-Z]*$/, "Last name can only contain letters")
      .max(30, "Last name must be at most 30 characters long"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co\.in|in)$/,
        "Email must be a valid email address ending with .com, .co.in, or .in"
      )
      .required("Email is required"),
    password: Yup.string()
      .required("New password is required.")
      .min(8, "New password must be at least 8 characters long.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required.")
      .min(8, "New password must be at least 8 characters long.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
  });
  return (
    <div>
      <div className="mt-3">
        <nav
          aria-label="breadcrumb"
          style={{ "--bs-breadcrumb-divider": "'>>'" }}
        >
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>{" "}
            </li>
            <li className="breadcrumb-item">
              <a href="">Employee Management</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Employee
            </li>
          </ol>
        </nav>
      </div>
      <Container
        style={{
          marginTop: "50px",
          marginLeft: "200px",
          width: "40rem",
          height: "60rem",
        }}
      >
        {loading ? <LoadingPage /> : ""}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, status, values }) => (
            <Form className="changepassword-form">
              {errors.serverError && (
                <Alert variant="danger">{errors.serverError}</Alert>
              )}
              {status && <Alert variant="success">{status}</Alert>}
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  className={`form-control ${
                    touched.firstName && errors.firstName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="middleName">Middle Name</label>
                <Field
                  type="text"
                  name="middleName"
                  className={`form-control ${
                    touched.middleName && errors.middleName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="middleName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  className={`form-control ${
                    touched.lastName && errors.lastName ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="employeeType" className="form-check-label">
                  Employee Type
                </label>
                <Field
                  type="text"
                  name="employeeType"
                  className={`form-control ${
                    touched.employeeType && errors.employeeType
                      ? "is-invalid"
                      : ""
                  }`}
                  as="select"
                >
                  <option value="Contractual">Contractual</option>
                  <option value="FullTime">Full Time</option>
                </Field>
                <ErrorMessage
                  name="employeeType"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type={values.showPassword ? "text" : "password"}
                  name="password"
                  className={`form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type={values.showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={`form-control ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group  d-flex">
                <label htmlFor="showPassword" className="form-check-label">
                  Show password
                </label>
                <Field
                  type="checkbox"
                  name="showPassword"
                  className="form-check-input ms-4"
                />
              </div>

              <div className="text-center mt-2">
                <button
                  className="btn btn-outline-success py-2 px-4 mt-4"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Register User "}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Registerformik;
