import React, {useState, useEffect} from 'react';
import {Form, Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Footer from '../components/Layout/Footer';

const Register = () => {
   
    //Used for navigation from one page to another
    const navigate = useNavigate();

    //Set state
    const [loading, setLoading] = useState(false);

    //Form Submit
    const submitHandler = async (values) => {
      try {
        setLoading(true); //Intinally we initialize to true when it is starting to load
        await axios.post('/users/register', values);
        message.success('Registration Done Successfully.');
        setLoading(false); //Then we initialize to false after successfull loading & is ready to navigate to next page
        navigate('/login');
          } catch (error) {
        setLoading(false); //For error we initialize to false means can not navigate to next page & please wait
        message.error('Something went wrong.');
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
    <div className="registerpagestylingcss register-page">
        { loading && <Spinner />}
         <Form layout="vertical" onFinish={submitHandler}>
         <h6 className='registerHeadingStling'>Welcome to Full Stack MERN - Expense Management Application</h6>
         <br/>
              <h1 className='registerHeadingStling'>Register Form</h1>
            <Form.Item label="Name" name="name">
                <Input className='inputstylingcss' placeholder='Enter your name.' required/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type='email' className='inputstylingcss' placeholder='Enter your email.' required/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password' className='inputstylingcss' placeholder='Enter your password.' required/>
            </Form.Item>
            <div className='linkbuttonDiv d-flex justify-content-between'>
                <Link to="/login" className='linkClass'>Already Registered ? Click here to Login</Link>
                <button className="btnregister btn-primary">Register</button>
            </div>
         </Form>
    </div>
         <Footer />
    </>
  )
}

export default Register