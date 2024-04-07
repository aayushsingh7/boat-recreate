import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from '../components/Button';
import { AppContext } from "../context/Context";
import styles from "../styles/UserDetails.module.css";
import generateRandomID from "../utils/generateRandomID";

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

        {editProfile ? <Button onClick={(e)=> e.preventDefault()} text={"Forgot password"}  className={styles.forgot_password} marginTop="15px" background="none" fontSize="0.8rem" textAlign="end" /> : null}

        


        <div className={styles.sep}>

        <Button padding={"15px 20px"} fontSize="0.9rem" borderRadius="10px" width="100%" onClick={(e)=> {setEditProfile(true);editProfile ? null : e.preventDefault()}} text={editProfile ? "Save Changes" : "Edit Profile"}  background="var(--secondary-background)" />

        {editProfile ? null :  <Button padding={"15px 20px"} fontSize="0.9rem" borderRadius="10px" width="100%" onClick={(e)=> {e.preventDefault();setShowProfile(false);localStorage.removeItem("user_details");getUserDetails()}} text={"Logout"}  background="var(--mid-dark-background)" />}
        
  
        </div>
         {editProfile && <Button marginTop="7px" text={"Cancle"} background="var(--mid-dark-background)" padding="15px 20px" width="100%" fontSize="0.9rem" borderRadius="10px"/>}
         
        </div>

      </form>
    </div>
  );
};

export default UserDetails;
