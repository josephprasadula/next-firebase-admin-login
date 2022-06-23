import React, { useState ,useEffect} from 'react';
import { useRouter } from 'next/router'

import { useAuth,} from '../context/Authcontext';
import firebase,{auth, db} from '../pages/firebaseconfig'

import HeadSection from './headerForLogedPages'
import Register from '../pages/register'

import { Result, Button ,Modal,Select,Menu, Layout,Form,Input} from 'antd';
import { MailOutlined, SettingOutlined, HomeOutlined , AppstoreOutlined} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Content, Footer, Sider } = Layout;

export default function App({children}) {
  const {logout} = useAuth()
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [deleteModal,setDeleteModal] = useState(false)
  const [passwordModal,setPasswordModal] = useState(false)
  const [updateEmail,setUpdateEmail] = useState('')
  const {currentUser,setCurrentUser} = useAuth()

const showModal = () => {
  setIsModalVisible(true);
};
const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
  
};
const showPasswordchangeModal = ()=>{
  setPasswordModal(true)
}
const handlePasswordOk = () => {
  setPasswordModal(false);
};

const handlePasswordCancel = () => {
  setPasswordModal(false);
};
const showDeletechangeModal =()=>{
  setDeleteModal(true)
}
const handleDeleteOk = () => {
  setDeleteModal(false);
};

const handleDeleteCancel = () => {
  setDeleteModal(false);
};
const showUpdateEmailModal =()=>{
  setUpdateEmail(true)
}
const handleEmailOk = () => {
  setUpdateEmail(false);
};

const handleEmailCancel = () => {
  setUpdateEmail(false);
};

const [data, setData] = useState({})

return(
    <>
     <Layout style={{backgroundColor:"white"}}>
        <HeadSection />
        <Content style={{padding: '0 50px',}}>
            <Layout style={{padding: '24px 0',backgroundColor:"white"}}>
                <Sider theme='light' className='site-layout-backkground' width={200}>
                  <Menu
                    defaultSelectedKeys={['userlist']}
                    mode="inline"
                  >
                    <SubMenu key ='users'
                        title={
                          <span>
                            <MailOutlined />
                            <span>Manage users</span>
                          </span>
                        }
                    >
                      <Menu.Item key='location5' onClick={showModal}> Create user</Menu.Item>
                      <Menu.Item key='location6' onClick={()=>{router.push('/userlist')}}> user List</Menu.Item>
                    </SubMenu>
                    <SubMenu key ='upload'
                      title={
                        <span>
                          <AppstoreOutlined />
                          <span>Upload</span>
                        </span>
                      }
                    >
                      <Menu.Item key='location1' onClick={()=>{router.push('/upload')}}> Images</Menu.Item>
                      <Menu.Item key='location2' onClick={()=>{router.push('/upload')}}> files</Menu.Item>
                    </SubMenu>
                    <SubMenu key ='Settings'
                      title={
                        <span>
                          <SettingOutlined />
                          <span>Settings</span>
                        </span>
                      }
                    >
                      <Menu.Item key='location3' onClick={showPasswordchangeModal}> Update Password</Menu.Item>
                      <Menu.Item key='location4' onClick={showUpdateEmailModal}> Update Email</Menu.Item>
                      <Menu.Item key='location554' onClick={showDeletechangeModal}> Delete Account</Menu.Item>
                    </SubMenu>
                  </Menu>
                  {/* <Menu
                    defaultSelectedKeys={['userlist']}
                    mode="inline"
                    onClick={(e)=>{
                      let b=e.target.getAttribute.menu-id
                      // let keyArr = e.target.getAttribute('data-menu-id')
                      console.log(b)
                      if(e.target.getAttribute('key') == 'option1'){
                        showModal
                      }
                    }}
                    items={[{
                      key: '1',
                      label:'Manage users',
                      icon:<MailOutlined />,
                      children:
                        [
                          {
                            key:'option1',
                            label:"Create User",
                          },
                          {
                            key:"option2",
                            label:"userList"
                          }
                        ]
                    },
                    {
                      key: '2',
                      icon:<AppstoreOutlined />,
                      label:"Upload",
                      children:[
                        {
                          key:'option3',
                          label:"Images"
                        },
                        {
                          key:"option4",
                          label:"files"
                        }
                      ]
                    },
                    {
                      key: '3',
                      label:'Settings',
                      icon:<SettingOutlined />,
                      children:[
                        {
                          key:'option5',
                          label:"Update password"
                        },
                        {
                          key:"option6",
                          label:"Update email"
                        }
                      ]
                    },]}
                  >
                  </Menu> */}
                </Sider>
                <Content
                style={{
                    padding: '0 24px',
                    minHeight: 280,
                }}
                >
                  {children}
                  <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <div>
                      <Register />
                    </div>
                  </Modal>
                  <Modal title="Update password" visible={passwordModal} onOk={handlePasswordOk} onCancel={handlePasswordCancel}>
                  <Form
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 14,
                    }}
                    layout="horizontal"
                  >
                    <Form.Item label="Input">
                      <Input style={{marginBottom:'2rem'}} onChange={(e)=>{let newPassword=e.target.value.toString();setPassword(newPassword);
                      console.log(password)
                      }}/>
                      <Button onClick={
                        ()=>{
                        const user = auth.currentUser;
                        if(password){
                          user.updatePassword(password).then(() => {
                            alert('password updated succesfull and on next signIn use new password')
                          }).catch((error) => {
                            console.log(error)
                            alert(error)
                          });
                        }}} style={{float:'right'}} type="primary" htmlType="submit">
                      Submit
                    </Button>
                    </Form.Item>
                  </Form>
                  </Modal>
                  <Modal title="Update email" visible={updateEmail} onOk={handleEmailOk} onCancel={handleEmailCancel}>
                  <Form
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 14,
                    }}
                    layout="horizontal"
                  >
                    <Form.Item label="Input">
                      <Input style={{marginBottom:'2rem'}} onChange={(e)=>{let newEmail=e.target.value.toString();setEmail(newEmail);
                      console.log(email)
                      }}/>
                      <Button onClick={
                        ()=>{
                        const user = auth.currentUser;
                        if(email){
                          user.updateEmail(email).then(() => {
                            alert('email updated succesfull and on next signIn use new email')
                          }).catch((error) => {
                            console.log(error)
                            alert(error)
                          });
                        }}} style={{float:'right'}} type="primary" htmlType="submit">
                      Submit
                    </Button>
                    </Form.Item>
                  </Form>
                  </Modal>
                  <Modal title="Delete account" visible={deleteModal} onOk={handleDeleteOk} onCancel={handleDeleteCancel}>
                    <div>
                      <h3>Do you want to delete this account</h3>
                        <Button onClick={
                        ()=>{
                          const user = auth.currentUser
                          user.delete().then(() => {
                            // User deleted.
                          }).catch((error) => {
                            alert(error)
                          });                          
                      }
                        }  type="primary" danger>
                      Delete
                    </Button>
                    </div>
                  </Modal>
                </Content>
            </Layout>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Brexit Design ©2022 Created by web3
        </Footer>
     </Layout>
    </>
)
}