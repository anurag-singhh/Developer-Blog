import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link,NavLink, useNavigate } from "react-router-dom";
import "./register.css";
import Swal from "sweetalert2";

const Register = ({ handleAuthenticate }) => {

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const  onSubmit = async (values, { resetForm, setSubmitting }) => {
    // values.avatar = selImg;

    console.log(values);
    setSubmitting(true);

    const res = await fetch("http://localhost:5000/user/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res.status);
    setSubmitting(false);

    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "WellDone!",
        text: "Registered Successfully 😎",
      });
      navigate("/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    }

    // write code to submit form to server
  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="registerForm">
          <div className="formGroup">
            <label htmlFor="username">Username</label>
            <Field
              type="text"
              id="username"
              name="username"
              className="registerInput"
            />
            <ErrorMessage
              component="div"
              className="error"
              name="username"
            />
          </div>
          <div className="formGroup mt-3"> 
            <label htmlFor="email">Email</label>
            <Field
              type="text"
              id="email"
              name="email"
              className="registerInput"
            />
            <ErrorMessage
              component="div"
              className="error"
              name="email"
            />
          </div>
          <div className="formGroup mt-3">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              className="registerInput"
            />
            <ErrorMessage
              component="div"
              className="error"
              name="password"
            />
          </div>
          <button className="registerButton" type="submit">
            Register
          </button>
        </Form>
      </Formik>
      <NavLink to="/login">
        <button className="registerLoginButton">Login</button>
      </NavLink>
    </div>
  );
};

export default Register;
