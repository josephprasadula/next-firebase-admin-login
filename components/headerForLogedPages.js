import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import Head from './header'
import {Modal,Form,Input,message, Button,Avatar, Dropdown, Menu, Space } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useRouter } from 'next/router';
import { useAuth } from '../context/Authcontext';
import { UserOutlined, CheckCircleTwoTone} from '@ant-design/icons';
import {auth,storage} from '../pages/firebaseconfig'

export default function headerForLogedPages() {
  const user = auth.currentUser
  const [disabled,setDisabled] = useState(false)
  const [color,setColor] = useState('#f56a00')
  const [formVisible,setFormVisible] = useState(false)
  const [displayName,setDisplayName] = useState(null)
  const [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    return () => {
      if(user){
        if(user.emailVerified){
          setDisabled(true)
          console.log('dis')
          setColor('green')
        }
      }

    };
  }, [user])
  const ShowformModal = ()=>{
    setFormVisible(true)
  }

  const handleFormOk =()=>{
    setFormVisible(false)
  }
  const handleFormCancel =()=>{
    setFormVisible(false)
  }
  const uploadImg =  (file)=>{
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    console.log(isJpgOrPng,isLt2M,file.status,file.name)
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    let fileref = `file/${file.name}`
    let storageRef = storage.ref(fileref);
    var uploadTask = storageRef.put(file);
    uploadTask.on('state_changed', function(snapshot){ },function(error) {console.log(error);alert(err)}, function() {
         uploadTask.snapshot.ref.getDownloadURL().then(
          function(downloadURL) {
          console.log('File available at', downloadURL);
          setImageUrl(downloadURL)
      });
    });
  }
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
            <h5><div onClick={ShowformModal}>update your profile
              </div></h5>
            ),
        },
        {
          key: '3',
            label: (
              <Button disabled={disabled} onClick={()=>{
                // const user = auth.currentUser
                if(!user.emailVerified){
                  user.sendEmailVerification()
                  .then(() => {
                    alert('email for verification has been sent for your email')
                    
                  });
                }else{
                  setColor('green')
                  setDisabled(true)
                }
              }} style={{backgroundColor:color,marginLeft:'1.2rem',fontSize:'1rem'}} type="primary" icon={<CheckCircleTwoTone />} size='medium'>
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
                        <Avatar src={user&&(user.photoURL!==null?user.photoURL:'#')} style={{cursor:'pointer'}}
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
                
                <Modal title="Fill your details mofo" visible={formVisible} onOk={handleFormOk} onCancel={handleFormCancel}>
                  {user&&<Form>
                    <ImgCrop grid>
                      <Input type='file' onChange={(e)=>{
                      const file = e.target.files[0];
                      uploadImg(file)
                      }} name='imageUrl'></Input>
                      
                    </ImgCrop>
                    
                    <Input disabled={true}  name='email' value={user.email} style={{marginTop:'1.5rem', width: 'calc(100% - 200px)'}}/>
                    <Input.Group compact>
                      <Input onChange={(e)=>{setDisplayName(e.target.value)}} disabled={user.displayName&&true} placeholder= {user.displayName!=null?user.displayName:'Username'}name='dislayName' style={{marginTop:'1.5rem', width: 'calc(100% - 200px)'}}/>
                    </Input.Group>
                    <Button onClick={()=>{
                        user.updateProfile({
                          displayName: displayName||user.displayName,
                          photoURL: imageUrl
                        }).then(() => {
                          // Update successful
                          // ...
                        }).catch((error) => {
                          // An error occurred
                          // ...
                          alert(error)
                        });  
                      }} style={{marginTop:'1.5rem'}} type="primary">Submit</Button>
                  </Form>}
                </Modal>
                </li>
            </ul>
    </Head>
  )
}
