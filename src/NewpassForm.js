// import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import axios from "axios";

// const PasswordForm = ({ token, email, type }) => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     console.log(urlParams);
//     const token = urlParams.get("token");
//     console.log(token);
//     const email = urlParams.get("email");
//     console.log(email);

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     axios
//       .post(`api/auth/password/reset`,
//         {
//           email: email
//           , password: password
//           , confirmPassword: confirmPassword
//           , token: token
//         })
//       .then((response) => {
//         console.log(response.data);
//         // handle successful response
//       })
//       .catch((error) => {
//         console.error(error);
//         setError("Failed to update password");
//       });
//   };

//   return (
//     <Container>
//       <Row>
//         <Col md={{ span: 6, offset: 3 }}>
//           <h3>{type === "new-password" ? "Create" : "Reset"} Password</h3>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="password">
//               <Form.Label> New Password</Form.Label>
//               <Form.Control
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="confirmPassword">
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Confirm password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="showPassword">
//               <Form.Check
//                 type="checkbox"
//                 label="Show password "
//                 checked={showPassword}
//                 onChange={(e) => setShowPassword(e.target.checked)}
//               />
//             </Form.Group>

//             <Button
//               variant="primary"
//               type="submit"
//               style={{ marginTop: "10px" }}
//             >
//               Submit
//             </Button>
//             {error && <p>{error}</p>}
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default PasswordForm;





import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import {useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from "axios";

const PasswordForm = ({ token, email, type }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: ""
  }

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required")
  })

  const onSubmit = (values, { setSubmitting, resetForm }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const email = urlParams.get("email");
  axios
    .post(`api/auth/password/reset`, {
      email: email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      token: token
    })
    .then((response) => {
      console.log(response.data);
      alert ("password change successfully")
      navigate('/Login');
      // handle successful response
    })
    .catch((error) => {
      console.error(error);
      // handle error
    })
    .finally(() => {
      setSubmitting(false);
      resetForm();
    });
};


  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3>{type === "new-password" ? "Create" : "Reset"} Password</h3>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting,handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="password">
                  <Form.Label>New Password</Form.Label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    className="form-control"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="form-control"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                </Form.Group>

                <Form.Group controlId="showPassword">
                  <Form.Check
                    type="checkbox"
                    label="Show password"
                    name="showPassword"
                    checked={showPassword}
                    onChange={(e) => setShowPassword(e.target.checked)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ marginTop: "10px" }} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordForm;
