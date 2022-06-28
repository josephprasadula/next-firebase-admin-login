import React, { useState ,useRef,useEffect} from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image';
import { useAuth } from '../context/Authcontext';
import firebase,{auth, db,storage} from './firebaseconfig'

import LayoutComponent from '../components/layout'
import DemoRingProgress from '../components/userpercentchart';

import { Result,Modal,Form,Input,Button,message, Upload} from 'antd';
import { SmileOutlined,} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

export default function App() {
  const router = useRouter()
  const {currentUser} = useAuth()
  const user = auth.currentUser
  // console.log(user.displayName)
  // useEffect(()=>{
  //   var myUserId = user?(user.displayName?user.displayName:user.email):''
  // },[user.displayName,user.imageUrl])
  var myUserId = user?(user.displayName?user.displayName:user.email):''



return(
  <LayoutComponent>
    <>
    <Result
    icon={<SmileOutlined/>}
    title="Welcome Back"
    extra={
      <div>
        <h3>{myUserId}</h3>
        {/* {user&&<img style={{maxWidth:'10rem',maxHeight:'10rem',width:'auto',height:'auto'}} src={user.photoURL!==null?user.photoURL:'#'}></img>} */}
      </div>  
    }
    >
    </Result>
    {user&&<div style={{left:'0',right:'0',margin:'auto',width:'fit-content'}}>
      <h3>Complete user details</h3>
      <div style={{marginLeft:'4.5rem',borderRadius:'50%'}}>
      <DemoRingProgress />
      </div>
    </div>}
    </>
    
  </LayoutComponent>
)


}