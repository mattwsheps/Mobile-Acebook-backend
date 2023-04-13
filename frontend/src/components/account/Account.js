import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import './Account.css';
import Navbar from '../feed/navbar/Navbar';
import {EmailForm, UsernameForm} from './forms/forms.js';

const AccountPage = ({ navigate }) => {
  
  const { state } = useLocation();
  const userData = state.userData;
  const token = state.token;
  const [email, setEmail] = useState(false)
  const [username, setUsername] = useState(false)

  const deleteAccount = () => {
    if(token) {
      fetch(`/users?id=${userData._id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        method: "DELETE"
      })
        .then(response => response.json())
        .then(data => {
          window.localStorage.removeItem("token")
          navigate('/login')
        })
        .catch(error => console.log(error));
    }
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const postPage = () => {
    navigate('/posts')
  }

  if(token) {
    return(
      <>
      <Navbar currentPage="account" logout={logout} post={postPage}/>
      <div className="account-page">
        
        <h1>Account Information</h1> <br></br>
          <h2>Email</h2>
          {userData.email}
          {email === true && <EmailForm/>}
        <br></br>
        <br></br> 
            <h2>Username</h2>
            {userData.username}
            {username === true && <UsernameForm/>}
        <br></br>
        <br></br>
            <h2>Password</h2>
            ********

        <br></br>
        <br></br>
            <h2>Avatar</h2>
            <img src={ userData.avatar } alt="Avatar" width="200" height="200"></img>
        <br></br>
        <br></br>   


        <div>
          <button className="account-btn" onClick={() => setEmail(!email)}>Change Email</button>
          <button className="account-btn" onClick={() => setUsername(!username)}>Change Username</button>
          <button className="account-btn">Change Password</button>
          <button className="account-btn">Change Avatar</button>
        </div>

        <br></br>
        <br></br>
        <div>
          <button className="delete-btn" onClick={deleteAccount}>Delete Account</button>
        </div>
      </div>
      </>
      

    )
  }

  
}

export default AccountPage;