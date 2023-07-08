import React, {useState, useEffect} from 'react';
import {Form, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Footer from '../components/Layout/Footer';

const Login = () => {

    //Used for navigation from one page to another
    const navigate = useNavigate();

    //Set state
    const [loading, setLoading] = useState(false);  
   
    //Form Submit
    const submitHandler = async (values) => {
      try {
        setLoading(true); //Intinally we initialize to true when it is starting to load
        const {data} = await axios.post('/api/v1/users/login', values); // making varaible data to show in local storage in console
        setLoading(false); //Then we initialize to false after successfull loading & is ready to navigate to next page
        message.success('Login Successfully.');
        localStorage.setItem('user', JSON.stringify({...data.user, password: ''})) // password is not stored in local storage so it is set to '' that is empty & JSON data is converted into String & ...data is used spreading data 
        navigate('/');
          } catch (error) {
        setLoading(false); //For error we initialize to false means can not navigate to next page & please wait
        message.error('User not found.'); 
      }  
     };

     //prevent for login user 
    useEffect(() => {
      if(localStorage.getItem('user')){
       navigate('/');
      }  
   }, [navigate]);

  return (
    <>
      <div className="loginpagestylingcss register-page">
      { loading && <Spinner />}
         <Form layout="vertical" onFinish={submitHandler}>
              <h6 className='loginHeadingStling'>Welcome Back to Full Stack MERN - Expense Management Application</h6>
              <br/>
              <h1 className='loginHeadingStling'>Login Form</h1>
            <Form.Item label="Email" name="email">
                <Input type='email' className='inputstylingcss' placeholder='Enter your registerted email.' required/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password' className='inputstylingcss' placeholder='Enter your password.' required/>
            </Form.Item>
            <div className='linkbuttonDiv d-flex justify-content-between'>
                <Link to="/register" className='linkClass'>Don't have an account ? Click here to Register</Link>
                <button className="btnregister btn-primary">Login</button>
            </div>
         </Form>
    </div>
        <Footer/>
    </>
  )
}

export default Login