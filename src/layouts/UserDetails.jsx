import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/UserDetails.module.css";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { AppContext } from "../context/Context";
import generateRandomID from "../utils/generateRandomID";
import { FaAddressCard } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMail } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const UserDetails = () => {
  const { setShowProfile, getUserDetails,user } =
    useContext(AppContext);
  const [userDetails,setUserDetails] = useState({
    name:"",
    email:"",
    password:"",
    address:""
  })
  const [editProfile,setEditProfile] = useState(false)

  const handleOnChange = (e)=> {
    setUserDetails((data)=> {
        return {...data,[e.target.name]:e.target.value}
    })
  }

    useEffect(()=> {
      setUserDetails(user)
    },[])


  const editProfileFunction = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "user_details",
      JSON.stringify({
        id: generateRandomID(15),
        email: userDetails.email,
        password:userDetails.password,
        address:userDetails.address,
        name:userDetails.name,
        logged_in_date: new Date().toISOString(),
      })
    );
    getUserDetails();
    setShowProfile(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.box} onSubmit={editProfileFunction}>
        <AiOutlineClose
          className={styles.close}
          onClick={() => setShowProfile(false)}
        />
        <h2>{editProfile ? "Edit Profile🎨" : "My Profile✨"}</h2>

        <div className={styles.part_one}>
        <div>
            <FaUser />
            <input
              name="name"
              type="type"
              placeholder="Enter your Name"
              autoComplete="off"
              required
              onInput={handleOnChange}
              value={userDetails.name}
              readOnly={editProfile ? false : true}
            />
          </div>

          <div>
            <IoMail />
            <input
              name="email"
              type="email"
              placeholder="Enter your Email"
              autoComplete="off"
              required
              onInput={handleOnChange}
              value={userDetails.email}
              readOnly
            />
          </div>

          <div>
            <FaAddressCard />
            <input
              name="address"
              type="address"
              placeholder="Enter your Address"
              autoComplete="off"
              onInput={handleOnChange}
              value={userDetails.address}
              readOnly={editProfile ? false : true}
            />
          </div>

          <div>
            <RiLockPasswordFill />
            <input
              style={{ paddingRight: "40px" }}
              name="password"
              type="password"
              placeholder="Enter your Password"
              autoComplete="off"
              required
              onInput={handleOnChange}
              value={userDetails.password}
              readOnly
            />
          </div>

        {editProfile ? <button className={styles.forgot_password} onClick={(e)=> e.preventDefault()}>Forgot password</button> : null}
        <div className={styles.sep}>
        <button className={styles._btn} onClick={(e)=> {setEditProfile(true);editProfile ? null : e.preventDefault()}}>{editProfile ? "Save Changes" : "Edit Profile"}</button>
        {editProfile ? null :  <button className={`${styles.btn_dark} ${styles.logout}`} onClick={(e)=> {e.preventDefault();setShowProfile(false);localStorage.removeItem("user_details");getUserDetails()}}>Logout</button>}
        </div>
         {editProfile ?  <button style={{marginTop:"10px"}} className={styles.btn_dark} onClick={()=> setEditProfile(false)}>Cancle</button> : null}
        </div>

      </form>
    </div>
  );
};

export default UserDetails;
