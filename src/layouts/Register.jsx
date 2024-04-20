import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import Button from "../components/Button";
import { AppContext } from "../context/Context";
import styles from "../styles/Login.module.css";
import generateRandomID from "../utils/generateRandomID";

const Register = () => {
  const { setShowLogin, setShowRegister, getUserDetails } =
    useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "user_details",
      JSON.stringify({
        id: generateRandomID(15),
        name: name,
        email: email,
        password: password,
        logged_in_date: new Date().toISOString(),
      })
    );
    getUserDetails();
    setShowRegister(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.box} onSubmit={register}>
        <AiOutlineClose
          className={styles.close}
          onClick={() => setShowRegister(false)}
        />
        <h2>Join Us😍</h2>

        <div className={styles.part_one}>
          <input
            name="name"
            type="text"
            placeholder="Enter your Name"
            autoComplete="off"
            required
            value={name}
            onInput={(e) => setName(e.target.value)}
          />

          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            autoComplete="off"
            required
            value={email}
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            autoComplete="off"
            required
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
          <Button
            label={"Register"}
            text={"Register"}
            padding="15px 20px"
            width="100%"
            fontSize="0.8rem"
            borderRadius="10px"
            background="var(--secondary-background)"
            marginTop="40px"
          />
        </div>

        <p className={styles.seprator}>------------ or -------------</p>

        <div className={styles.social_options}>
          <FaFacebookF />
          <BsGithub />
          <BsTwitterX />
          <FaGoogle />
        </div>

        <p className={styles.option_p}>
          Already have an account?{" "}
          <button
            label="Go to login page"
            onClick={() => {
              setShowLogin(true);
              setShowRegister(false);
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
