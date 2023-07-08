import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {message} from 'antd';
import { DollarOutlined, UserOutlined } from '@ant-design/icons';

const Header = () => {

 // useState Hook 
 const [loginUser, setLoginUser ] = useState('') // '' this is string here if want to pass object use {}

 // navigate
 const navigate = useNavigate();

 //To get data from Local Storage we use useEffect Hook
 useEffect(() => {
   const user = JSON.parse(localStorage.getItem('user')); // converting object to string that is console user data in string
   if(user) {
    setLoginUser(user);
   }
  }, []);

//Logout Handler 
  const logoutHandler = () => {
    localStorage.removeItem('user');
    message.success('Logout Successfully');
    navigate('/login');
  }

  return (
    <>
    {/* Just simply copy & paste Navbar from Bootstart-https://getbootstrap.com/docs/5.3/components/navbar/#responsive-behaviors */}
    {/* And then right click & select convert html to JSX or Ctrl+Alt+X */}
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="topicstyling navbar-brand" to="/" >
        <DollarOutlined className='dollarcolorstyle'/> Full Stack MERN - <DollarOutlined className='dollarcolorstyle' /> Expense Management Application
        </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {" "}
          <p className="nav-link" >
          <UserOutlined className='buttoncolorstylingcss'/>
           {loginUser && loginUser.name}
          </p> {" "}
        </li>
        <li className="nav-item">
          <button className="logoutButton btn btn-primary"
           onClick={logoutHandler}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Header