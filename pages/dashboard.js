import React, { useState ,useContext,useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import Image from 'next/image';
import imgscr from '../graph.webp'
import { useAuth } from '../context/Authcontext';
import firebase,{auth, db,storage} from './firebaseconfig'

import LayoutComponent from '../components/layout'
import DemoRingProgress from '../components/userpercentchart';

import { Result,Input,Button,Tooltip} from 'antd';
import { SmileOutlined} from '@ant-design/icons';



export default function App() {
  
  const router = useRouter()
  // console.log(router.pathname)
  const {currentUser} = useAuth()
  var myUserId = currentUser?currentUser.email:''
  const user = auth.currentUser
  // console.log(user.displayName)

return(
  <LayoutComponent>
    <>
    <Result
    // style={{backgroungImage=url({imgscr})}}
    icon={<SmileOutlined/>}
    title="Welcome Back"
    extra={
      <div>
        <h3>{myUserId}</h3>
      </div>  
    }
    >
    </Result>
    {user&&<div style={{left:'0',right:'0',margin:'auto',width:'fit-content'}}>
      <h3>Complete user details</h3>
      <Tooltip title='click on me'>
      <div style={{marginLeft:'4.5rem',borderRadius:'50%'}}>
      <DemoRingProgress />
      </div>
      </Tooltip> 
    </div>}
    
    {/* {(user.displayName!==null)?<h1>{currentUser.displayName}</h1>:<>
    <Input.Group compact>
      <Lable>Enter your username</Lable>
      <Input
        style={{
          width: 'calc(100% - 200px)',
        }}
        defaultValue="https://ant.design"
      />
      <Button type="primary">Submit</Button>
    </Input.Group>
    </>} */}
    </>
    
  </LayoutComponent>
)


}