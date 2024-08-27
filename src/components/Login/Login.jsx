import React, { useState } from 'react';
import './Login.css'
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import { MdError } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [erremail, setErremail] = useState(null);

  const [visibility, setVisibility] = useState(false);
  const [showIcon, setShowIcon] = useState(<FaEyeSlash/>);

  const navigate = useNavigate();

  const handleEmail = (event) => {
    const { value } = event.target;
    setEmail(value);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(value)) {
      setErremail(<BsCheckCircleFill />);
      setIsEmailValid(true);
    } else {
      setErremail(<MdError />);
      setIsEmailValid(false);
    }
  };

  const handlePassword = (event) => {
    const { value } = event.target;
    setPassword(value);

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordPattern.test(value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handelShowHide = () => {
    setVisibility(!visibility)
    visibility ? setShowIcon(<FaEyeSlash/>) : setShowIcon(<FaEye/>);
  }

  const handelSignIn = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/success');
      } catch (error) {
        toast.error("Login failed. Please try again.");
      }
    }
  }

  const handelRegisterSignInToggle = () => {
    navigate('/register');
  }
  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <div className="container">
      <ToastContainer/>
      <div className="header">
        <div className="text">Log In</div>
        <div className="underline"></div>
      </div>
      <form action="">
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="email icon" />
            <input
              type="email"
              placeholder="Enter email"
              onChange={handleEmail}
              value={email}
              required
            />
            <p>{erremail}</p>
          </div>
          <div className="input input-password">
            <img src={password_icon} alt="password icon" />
            <input
              type={visibility ? "text" : "password"}
              placeholder="Enter Password"
              onChange={handlePassword}
              value={password}
              required
            />
            <button type="button" onClick={() => handelShowHide()}>{showIcon}</button>
            {/* <span>{errpass}</span> */}
          </div>
        </div>
        <p className="password-disclaimer">
          * Password must contain 8 characters, a capital letter, a small letter, a digit, and a special character.
        </p>
        <div className="submit-container">
        <p onClick={handelRegisterSignInToggle}>Don't have an account ? </p>
        <button type="submit" className="register-btn" disabled={!isFormValid} onClick={handelSignIn}>Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
