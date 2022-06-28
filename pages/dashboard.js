import React, { useState ,useRef,useEffect} from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image';
import imgscr from '../graph.webp'
import { useAuth } from '../context/Authcontext';
import firebase,{auth, db,storage} from './firebaseconfig'

import LayoutComponent from '../components/layout'
import DemoRingProgress from '../components/userpercentchart';

import { Result,Modal,Form,Input,Button,message, Upload} from 'antd';
import { SmileOutlined,PlusOutlined,LoadingOutlined} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

export default function App() {
  const [formVisible,setFormVisible] = useState(false)
  const [displayName,setDisplayName] = useState(null)
  const router = useRouter()
  // console.log(router.pathname)
  const {currentUser} = useAuth()
  
  
  const user = auth.currentUser
  // console.log(user.displayName)
  // useEffect(()=>{
  //   var myUserId = user?(user.displayName?user.displayName:user.email):''
  // },[user.displayName,user.imageUrl])
  var myUserId = user?(user.displayName?user.displayName:user.email):''

  const ShowformModal = ()=>{
    setFormVisible(true)
  }

  const handleFormOk =()=>{
    setFormVisible(false)
  }
  const handleFormCancel =()=>{
    setFormVisible(false)
  }
  const [imageUrl, setImageUrl] = useState();

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
      <div style={{marginLeft:'4.5rem',borderRadius:'50%'}}>
      <Button type='primary' onClick={ShowformModal} style={{marginBottom:'1rem'}}>Click me</Button>
      <DemoRingProgress />
      <Modal title="Fill your details mofo" visible={formVisible} onOk={handleFormOk} onCancel={handleFormCancel}>
        {user&&<Form>
          <ImgCrop>
            <Input type='file' onChange={(e)=>{
            const file = e.target.files[0];
            uploadImg(file)
            }} name='imageUrl' />
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
      
      </div>
    </div>}
    </>
    
  </LayoutComponent>
)


}