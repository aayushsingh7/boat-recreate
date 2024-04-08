import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import Button from "../components/Button";
import { AppContext } from "../context/Context";
import styles from "../styles/Login.module.css";
import generateRandomID from "../utils/generateRandomID";

const Login = () => {

  const { setShowLogin,setShowRegister,getUserDetails } = useContext(AppContext);
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
    getUserDetails()
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
           value={email}
            required
            onInput={(e)=> setEmail(e.target.value)}
          />
          <input
         name="password"
            type="password"
            placeholder="Enter your Password"
            autoComplete="off"
            required
            value={password}
            onInput={(e)=> setPassword(e.target.value)}
          />
          <button className={styles.forgot_password}>Forgot password</button>
           <Button text={"Login"} onClick={login} padding="15px 20px"  width="100%"  fontSize= "0.8rem"  borderRadius= "10px"  background= "var(--secondary-background)"  marginTop= "40px" />
        </div>

        <p className={styles.seprator}>------------ or -------------</p>

        <div className={styles.social_options}>
          <FaFacebookF />
          <BsGithub />
          <BsTwitterX />
          <FaGoogle />
        </div>

        <p className={styles.option_p}>Doesn't have an account? <button onClick={()=> {setShowLogin(false);setShowRegister(true)}}>Register</button></p>


      </form>
    </div>
  );
};

export default Login;
