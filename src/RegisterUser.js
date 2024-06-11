import React,{useState} from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingPage from './LoadingPage'

const Registerformik = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    username: "",
    password: "",
    showPassword: false,
  };

  const handleSubmit = (values, { setStatus, resetForm }) => {
    setLoading(true); 
    axios
      .post("/apigateway/api/auth/register", {
        email: values.email,
        username: values.username,
        password: values.password,
        roles: [
          {
            RoleName: "ROLE_ADMIN",
          },
        ],
      })
      .then((response) => {
        setStatus(response.data.message);
        resetForm(initialValues);
        console.log(response.data);
        toast.success("Register successful please verify your email.", {
          position: "top-center",
          theme: "colored",
        });
        navigate("/Login");
        setLoading(false);
      })
      .catch((errors) => {
        console.log(errors);
        toast.error(errors.response.data.message || "Error updating details" );
        setLoading(false);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string().required("Username is required."),
    password:  Yup.string().required('New password is required.')
    .min(8, 'New password must be at least 8 characters long.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.')
  });
  return (
    <Container>
        {loading ? <LoadingPage/> : ''}
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
              <label htmlFor="username">UserName</label>
              <Field
                type="text"
                name="username"
                className={`form-control ${
                  touched.username && errors.username ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="username"
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
              <button  className='btn btn-outline-success py-2 px-4 mt-4' type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register User "}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Registerformik;
