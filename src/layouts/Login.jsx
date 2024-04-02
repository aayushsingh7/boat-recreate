import React, { useContext, useState } from "react";
import styles from "../styles/Login.module.css";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { AppContext } from "../context/Context";
import generateRandomID from "../utils/generateRandomID";

const Login = () => {

  const { setShowLogin } = useContext(AppContext);
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const login = (e) => {
    e.preventDefault()
    localStorage.setItem("user_details",JSON.stringify(
        {
            id:generateRandomID(15),
            email:email,
            password:password,
            logged_in_date:new Date().toISOString(),
        }
    ))
    setShowLogin(false)
  };

  return (
    <div className={styles.container}>
      <form className={styles.box} onSubmit={login}>
        <AiOutlineClose
          className={styles.close}
          onClick={() => setShowLogin(false)}
        />
        <h2>Welcome Back🎉</h2>

        <div className={styles.part_one}>
          <input
          name="email"
            type="email"
            placeholder="Enter your Email"
            autoComplete="off"
            autoFocus={true}
            required
            onInput={(e)=> setEmail(e.target.value)}
          />
          <input
         name="password"
            type="password"
            placeholder="Enter your Password"
            autoComplete="off"
            required
            onInput={(e)=> setPassword(e.target.value)}
          />
          <button className={styles.forgot_password}>Forgot password</button>
          <button className={styles.login_btn}>Login</button>
        </div>

        <p className={styles.seprator}>------------ or -------------</p>

        <div className={styles.social_options}>
          <FaFacebookF />
          <BsGithub />
          <BsTwitterX />
          <FaGoogle />
        </div>
      </form>
    </div>
  );
};

export default Login;
