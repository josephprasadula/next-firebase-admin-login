import React,{ useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from '../styles/login.module.scss'

import { useAuth } from '../context/Authcontext';
import firebase from './firebaseconfig'

import Head from '../components/header'

import { Form, Input, Button, Checkbox } from 'antd';


const App = () => {
  const {login} = useAuth()
  const Router = useRouter()
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [data,setData] = useState({})
  const {currentUser,setCurrentUser} = useAuth()
  const handleInput = (e) =>{
    let input = {[e.target.name]:e.target.value}
    setData({...data,...input})
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    let email=data.email;
    let password = data.password;
    // if(!remember){
    //   alert("please ")
    // }
    login(email,password).then((userCreditials)=>{
      var user = userCreditials
      if(user){
        Router.push('/dashboard')
      // console.log(user.user.uid)
    }}).catch((err)=>{
      // setMsg("error")
      // setShowModal(true)
      alert(`${err}`)
    }
    )
  }
return (
  <div>
    <Head />
    <Form className={styles.form}
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input name='email' onChange={(e)=>{handleInput(e)}}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password name='password' onChange={(e)=>{handleInput(e)}}/>
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox onChange={()=>{setRemember(true)}}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button onClick={(e) =>{handleSubmit(e)}} type="primary" htmlType="submit">
          Submit
        </Button>  or <Link href="/register">
          <a>Register Now</a>
        </Link>
      </Form.Item>
    </Form>
  </div>
);
};

export default App;