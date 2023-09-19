import { useState } from "react";
import "./login.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import useUserContext from "../../UserContext";

export default function Login({ handleAuthenticate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {setLoggedIn} = useUserContext();

  const loginForm = useFormik({
    initialValues: {
      email : '',
      password : ''
    },
    onSubmit : async (values) => {
      const res = await fetch('http://localhost:5000/user/authenticate', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type' : 'application/json'
        }
      });

      console.log(res.status);

      if(res.status === 200){
        Swal.fire({
          icon : 'success',
          title : 'Nice!',
          text : 'Logged in Successfully 😎'
        });

        const data = await res.json();
        console.log(data);
        sessionStorage.setItem('user', JSON.stringify(data) );
        navigate('/write');
        setLoggedIn(true);
        // resetForm();

      }else if(res.status === 401){
        Swal.fire({
          icon : 'error',
          title : 'Error',
          text : 'Email or Password is incorrect 😢'
        })
      }else{
        Swal.fire({
          icon : 'error',
          title : 'Error',
          text : 'Something went wrong'
        })
      }
    }
  })

  return (
    <div className=" login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={loginForm.handleSubmit} >
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          id="email"
          value={loginForm.values.email}
          onChange={loginForm.handleChange}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          id="password"
          value={loginForm.values.password}
          onChange={loginForm.handleChange}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
        <NavLink to="/register" className="loginRegisterButton">Register</NavLink>
    </div>
  );
}
