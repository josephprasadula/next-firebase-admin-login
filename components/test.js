import React, { useState ,useContext,useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { useAuth, AuthContext } from '../context/Authcontext';
import firebase,{auth, db,storage} from './firebaseconfig'
import {getAuth} from 'firebase/auth'

import Head from '../components/header'
import Register from './register'

import { Result, Button ,Modal,Select,Menu, Layout} from 'antd';
import { SmileOutlined, MailOutlined, SettingOutlined, HomeOutlined , AppstoreOutlined,LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
function redirect (to){
    
   return router.push(`${to}`)
}
function getItem(label, key, icon, children, type,keyPath) {
    return {
      key,
      icon,
      children,
      label,
      type,
      keyPath
    };
  }
  
  const items = [
    getItem('Users management', 'sub1', <MailOutlined />, 
    [
      getItem('create new user', 'Option 1','/register'),
      getItem('userlist', 'Option 2','/userlist'),
    //   getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
    getItem('Upload', 'sub2', <AppstoreOutlined />, [
      getItem('Images', '5'),
      getItem('files', '6'),
    //   getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Settings', 'sub4', <SettingOutlined />, [
      getItem('Update password', '9'),
      getItem('update email', '10'),
    //   getItem('Option 11', '11'),
    //   getItem('Option 12', '12'),
    ]),
  ];
  const onClick = (e) => {
    
    console.log('click', e);
  };
  
  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

export default function App() {
  function Redirect({ to }) {
    const router = useRouter();
  
    useEffect(() => {
      router.push(to);
    }, [to]);
  
    return null;
  }
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const {logout} = useAuth()
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {currentUser,setCurrentUser} = useAuth()
  // console.log(currentUser.email)
  // var myUserId = auth.currentUser.email;
  // let myUserId = auth.currentUser.email
  // if(currentUser){
  //   myUserId = auth.currentUser
  // }
  // db.collection("users").get().then((querySnapshot) => {
  //   querySnapshot.filter((doc) => {
  //       if(data.id==myUserId);
  //   });
  // const userName=db.collection('next-register').doc(myUserId).get().then(data=>console.log(data))  
  // const name = userName.name
  // console.log(myUserId,userName)
  // console.log(userName)
  // const querySnapshot = getDocs(collection(db, "labels"));

  // querySnapshot.map((doc) => {
  //   if(doc=`${currentUser.user.uid}`){
  //     return doc.name
  //   }
  // });
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


const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};

const userdata = () =>{
  db.collection('next-register').doc()
}
const formHandler = (e) =>{
  e.preventDefault();
  const file = e.target[0].files[0]
  console.log(file)
  uploadFile(file)
}
const uploadFile = (file) =>{
  const uploadTask = storage.ref(`file/${file.name}`).put(file)
  uploadTask.on('state_change',snapShot => {},error =>{console.log(error)},()=>{
    storage.ref("file").child(file.name).getDownloadURL().then((url)=>{console.log(url)})
  })
}
const img=()=>{
  storage.ref().child('file/Chana Masala.png').getDownloadURL()
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    var img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });
}

const [data, setData] = useState({})


return(currentUser&&
    <>
     <Layout style={{backgroundColor:"white"}}>
        <Head >
            <ul style={{listStyle:'none',display:'flex',alignItems:'center',justifyItems:'space-between',margin:'0rem 1rem',}}>
                <li style={{margin:'0rem 1rem',}}>
                <Link href="/dashboard">
                    <a style={{textDecoration:'none'}}>Home</a>
                </Link>
                </li>
                <li style={{margin:'0rem 1rem',}}>
                <Link href="/userlist">
                    <a style={{textDecoration:'none'}}>UserList</a>
                </Link>
                </li>
                <li style={{margin:'0rem 1rem',}}>
                <Button type="success" onClick={showModal}>
                Add user
                </Button>
                </li>
                
                <li style={{margin:'0rem 1rem',}}>
                <Button style={{marginRight:'2rem'}} onClick={()=>(handleLogout())} type="primary" key="console">
                Log Out
                </Button>
                </li>
            </ul>
        </Head>
        <Content style={{padding: '0 50px',}}>
            <Layout style={{padding: '24px 0',backgroundColor:"white"}}>
                <Sider className='site-layout-backkground' width={200}>
                <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: 256,
                    height: '100%',
                }}
                items={items}
                onClick={(item, key, keyPath, domEvent)=>{
                  let path=this.label;
                  router.push(`/${label}`)
                }}
                />
                </Sider>
                <Content
                style={{
                    padding: '0 24px',
                    minHeight: 280,
                }}
                >
                    <Result
                    icon={<SmileOutlined/>}
                    title="Welcome Back"
                    extra={
                        <div>
                            {/* <h2>{currentUser.email}</h2> */}
                        {/* <h3>{currentUser&&myUserId}
                        </h3> */}
                        
                        
                        </div>
                        
                    }
                    >
                        <h2>share stories/shorts</h2>
                        <form onSubmit={formHandler}>
                        <input type='file'/>
                        <input type='submit' />
                        </form>
                        <br />

                        <button onClick={()=>{img()}}>View Your Last Uploads</button>
                        <img id='myimg' src='#'/>
                    </Result>
                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <div>
                        <Register />
                            
                    </div>
                    </Modal>
                </Content>
            </Layout>
        </Content>
     </Layout>
        
        
        
            <>
                
            </>
    </>
// ||<Redirect to='/'/>
)


}