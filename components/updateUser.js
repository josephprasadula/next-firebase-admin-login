import {useState,useRef} from 'react'
import { useRouter } from 'next/router';

import { useAuth } from '../context/Authcontext';
import {db,storage,Auth} from '../pages/firebaseconfig'

import {
  Form,
  Input,
  Select,
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
export default function updateUser({value}) {
const [data,setData] = useState({})
const {currentUser,setCurrentUser} = useAuth()
const [query,setQuery] = useState('')
const Router = useRouter()
const handleInput =(e) =>{
  let input = {[e.target.name] : e.target.value}
  setData({...data,...input})
}
const handleSubmit= (e) =>{
  e.preventDefault()
  console.log(value)
  db.collection("next-register").where("email", "==", `${value}`)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          doc.ref.update({...data})
      });
 }).catch((err)=>{alert(err)})
  // db.collection('next-register').where('email','==',`${queryEmail}`).get().then(querySnapshot => {
  //   // console.log(querySnapshot)
  //   querySnapshot.ref.update({data}).then(async() => {
  //     console.log("Document successfully updated!");
  //   }).catch(function(error) {
  //     console.error("Error removing document: ", error);
  //   });
  // }
  // ).catch(function(error) {
  //   console.log("Error getting documents: ", error);
  // });
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
return (
  <div>
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
            ]}><Input name='name'  onChange={(e)=>{handleInput(e)}} /></Form.Item>

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
        <Form.Item {...tailFormItemLayout}>
            <Button value={value} onClick={(e)=>{handleSubmit(e)}} type="primary" htmlType="submit">
            Update
            </Button>
        </Form.Item>
        </Form>
  </div>
);
}
