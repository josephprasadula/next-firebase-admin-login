import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import {db} from './firebaseconfig' 
import {storage} from './firebaseconfig' 
import { useAuth} from '../context/Authcontext';

import Head from '../components/header'

import firebase from './firebaseconfig'
import {getAuth} from 'firebase/auth'
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button
} from 'antd';
import registerStyles from '../styles/register.module.scss'
const { Option } = Select;


const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const App = () => {
  const [data,setData] = useState({})
  const {currentUser,setCurrentUser} = useAuth()
  const Router = useRouter()
  const {signup} = useAuth()
  const handleInput =(e) =>{
    let input = {[e.target.name] : e.target.value}
    setData({...data,...input})
    // console.log(data)
  }
  const handleRem = (e) =>{ 
    if(e.target.checked){
      let createdAt= new Date().toLocaleTimeString()
      let time= {createdAt}
      // console.log(time)
      // setData({...data,...time})
      if(currentUser){
      // let createdBy={createdBy:currentUser.uid}
      time.createdBy=currentUser.uid
      // time.docId = currentUser.uid
      setData({...data,...time})
      // setData({...data,...createdBy})
      }else{
      // let createdBy={createdBy:'user'}
      time.createdBy='user'
      setData({...data,...time})
      // setData({...data,...createdBy})
      // setData({...data,...time})
      }
    }
  }
  const handleSubmit= (e) =>{
    e.preventDefault()
    // console.log(data)
    
    let email=data.email;
    let password= data.password;
    signup(email,password).then((userCreditials)=>{
      var user = userCreditials.user
      // currentUser = user
      const uid=user.uid
      setData({...data,...{docId:uid}})
      // const docid = {docid:uid}
      // setData({...data,...docid})
      db.collection("next-register").doc(uid).set({
        ...data
      })
    }).then(
      Router.pathname=='/register'?Router.push('/dashboard'):alert('user has been created')
    ).catch((err)=>{
      alert(`${err}`)
    })
    
    // var storageRef = firebase.storage().ref();
    // let image={logoImg}
    // storage.ref(`file/${data.name+createdAt}`).put(image)
  }
  const handleRadio = (e) =>{
    let radio = {gender : e}
    setData({...data,...radio})
    console.log(data)
  }
  
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="0">0</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
      <div>
        <Head />
        <Form className={registerStyles.form}
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                prefix: '91',
            }}
            scrollToFirstError
            >
                <Form.Item name="name"
                label="FullName"
                rules={[
                    {
                        type: 'name',
                        message: 'the name is less than 3 characters',
                    },
                    {
                        required: true,
                        message: 'Please Input your fullName',
                    }
                ]}><Input name='name' onChange={(e)=>{handleInput(e)}} /></Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input name='email' onChange={(e)=>{handleInput(e)}} />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password  name='password' onChange={(e)=>{handleInput(e)}} />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                {
                    required: true,
                    message: 'Please input your phone number!',
                },
                ]}
            >
                <Input  name='phoneNo' onChange={(e)=>{handleInput(e)}}
                addonBefore={prefixSelector}
                style={{
                    width: '100%',
                }}
                />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                {
                    required: true,
                    message: 'Please select gender!',
                },
                ]}
            >
                <Select name='gender' onChange={(event)=>{ handleRadio(event)}} placeholder="select your gender">
                <Option /*{name='gender'}*/ value="male">Male</Option>
                <Option /*{name='gender'}*/ value="female">Female</Option>
                <Option /*{name='gender'}*/ value="other">Other</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                {
                    validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox onClick={(e)=>{handleRem(e)}}>
                I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button onClick={(e)=>{handleSubmit(e)}} type="primary" htmlType="submit">
                Register
                </Button>
            </Form.Item>
            </Form>
      </div>
    
  );
};

export default App;