import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import Head from './header'
import { Button,Avatar, Dropdown, Menu, Space } from 'antd';
import { useRouter } from 'next/router';
import { useAuth } from '../context/Authcontext';
import { UserOutlined, CheckCircleTwoTone} from '@ant-design/icons';
import {auth} from '../pages/firebaseconfig'

export default function headerForLogedPages() {
  const user = auth.currentUser
  const [disabled,setDisabled] = useState(false)
  useEffect(() => {
    return () => {
      if(user){
        if(user.emailVerified){
          setDisabled(true)
          console.log('dis')
        }
      }

    };
  }, [user])
  
    const {logout} = useAuth()
    const router = useRouter()
    const handleLogout = async() =>{
        try{
          await logout()
          router.push('/')
          // setCurrentUser(null)
        // currentUser = null
        }
        catch(err){
          console.log(err)
        }
        
      }
    const menu = (
    <Menu
        items={[
        {
            key: '1',
            label: (
            <h5>update your pack</h5>
            ),
        },
        {
            key: '2',
            label: (
            <h5>update your profile</h5>
            ),
        },
        {
          key: '3',
            label: (
              <Button disabled={disabled} onclick={()=>{
                // const user = auth.currentUser
                if(!user.emailVerified){
                  user.sendEmailVerification()
                  .then(() => {
                    alert('email for verification has been sent for your email')
                  });
                }
              }} style={{backgroundColor:'green',marginLeft:'1.2rem',fontSize:'1rem'}} type="primary" icon={<CheckCircleTwoTone />} size='medium'>
              verify email
            </Button>
            ),
        },
        {
          type:'divider'
        },
        {
            key: '4',
            label: (
            <Button style={{marginLeft:'2rem',fontSize:'1rem'}} onClick={()=>(handleLogout())} type="primary" key="console">
                Log Out
            </Button>
            ),
        },
        ]}
    />);
  return (
    <Head>
        <ul style={{listStyle:'none',display:'flex',alignItems:'center',justifyItems:'space-between',margin:'0rem 1rem',}}>
                <li style={{margin:'0rem 1rem',}}>
                <Link href="/dashboard">
                <h4><a style={{textDecoration:'none',color:'#1890ff'}}>Home</a></h4>
                </Link>
                </li>
                <li style={{margin:'0rem 1rem',}}>
                <Space direction="vertical">
                    <Space wrap>
                    <Dropdown overlay={menu} placement="bottom">
                        <Avatar style={{cursor:'pointer'}}
                            size={{
                            xs: 25,
                            sm: 30,
                            md: 40,
                            lg: 50,
                            xl: 55,
                            xxl: 60,
                            }}
                            icon={<UserOutlined style={{color:'#1890ff'}}/>}
                        />
                    </Dropdown>
                    </Space>
                </Space>
                
                
                </li>
            </ul>
    </Head>
  )
}
