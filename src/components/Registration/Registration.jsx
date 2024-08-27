import React, { useState } from 'react';
import './Registration.css';
import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import { MdError } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { auth , db} from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setDoc , doc } from 'firebase/firestore';

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [errname, setErrname] = useState(null);
  const [erremail, setErremail] = useState(null);

  const [visibility, setVisibility] = useState(false);
  const [showIcon, setShowIcon] = useState(<FaEyeSlash/>);

  const navigate = useNavigate();

  const handleName = (event) => {
    const { value } = event.target;
    setName(value);

    if (value.trim()) {
      setIsNameValid(true);
      setErrname(<BsCheckCircleFill />);
    } else {
      setIsNameValid(false);
      setErrname(<MdError />);
    }
  };

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
      // setErrpass(<BsCheckCircleFill />);
      setIsPasswordValid(true);
    } else {
      // setErrpass(<MdError />);
      setIsPasswordValid(false);
    }
  };

  const handelShowHide = () => {
    setVisibility(!visibility)
    visibility ? setShowIcon(<FaEyeSlash/>) : setShowIcon(<FaEye/>);
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        console.log(user)
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            name: name,
            password: password
          });
        }
        toast.success("Registration successful!"); 
        navigate('/')
      } catch (error) {
        toast.error("Registration failed." + error.message);
      }
    }
  };

  const handelRegisterSignInToggle = () => {
    navigate('/');
  }
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  return (
    <div className="container">
      <ToastContainer/>
      <div className="header">
        <div className="text">Register</div>
        <div className="underline"></div>
      </div>
      <form action="">
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="user icon" />
            <input
              type="text"
              placeholder="Enter name"
              onChange={handleName}
              value={name}
              spellCheck="False"
              required
            />
            <p>{errname}</p>
          </div>
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
        <p onClick={handelRegisterSignInToggle}>Already have an account ? </p>
        <button className="register-btn" disabled={!isFormValid} onClick={handleRegister}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
