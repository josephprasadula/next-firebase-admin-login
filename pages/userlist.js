
import React, { useState,useEffect,useRef} from 'react';

import { useAuth, AuthContext } from '../context/Authcontext';
import firebase,{auth, db,storage} from './firebaseconfig'

import { useRouter } from 'next/router'

import UserUpdate from '../components/updateUser';


import { Button ,Modal,Divider,message,Space, Popconfirm,Table} from 'antd';

import LayoutSection from '../components/layout'



const text = 'Are you sure to delete this user?';
const confirm = () => {
  message.info('deleted this user');
};

export default function App() {
  const [user,setUser] = useState([])
  const [temp1,setTemp1] = useState(0)
  const [updateUser,setUpdateUser] = useState('')
  const router = useRouter()
  const [updateUserVisible,setUpdateUserVisible] = useState(false)
  const {currentUser,setCurrentUser} = useAuth()

  const showUpdateUserVisible = ()=>{
    setUpdateUserVisible(true)
  }

  const handleUserOk =()=>{
    setUpdateUserVisible(false)
    getMarkers()
  }
  const handleUserCancel =()=>{
    setUpdateUserVisible(false)
    getMarkers()
  }

  const getMarkers= async()=> {
    const events = await db.collection('next-register').get()
      .then(querySnapshot => {
        const temp=querySnapshot.docs.map(doc => {
        //   console.log('LOG 1', doc.data());
          return { ...doc.data(),
            uid: doc.id
          };
        });
        // ********************must********************
        setUser(temp)
      });
    return events;
  }
  useEffect(()=>{
    getMarkers()
  },[temp1])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Gender ',
      dataIndex: 'gender',
    },
    {
      title: 'Email-Id',
      dataIndex: 'email',
    },
    {
      title: 'Created-By',
      dataIndex: 'createdBy',
    },
    {
      title: '  Action',
      dataIndex: 'uid',
      render: ((text,record) => {
        return (<div>
          <Popconfirm placement="leftTop" title={text} onConfirm={confirm} okText="Yes" cancelText="No" >
            <Button onClick={(e)=>{
              let queryEmail = record.email
              console.log(queryEmail)
              const collectionRef=db.collection('next-register')
                collectionRef.where("email", "==", `${queryEmail}`)
                .get()
                .then(querySnapshot => {
                  // console.log(querySnapshot) 
                  querySnapshot.forEach((doc) => {
                    doc.ref.delete().then(async() => {
                      console.log("Document successfully deleted!");
                      await getMarkers()
                      setTemp1(temp1+1)
                    }).catch(function(error) {
                      console.error("Error removing document: ", error);
                    });
                  });
                })
                .catch(function(error) {
                  console.log("Error getting documents: ", error);
                });
              }} type='primary' danger>Delete</Button>
          </Popconfirm>
          <Divider type="vertical" style={{color:'#000'}}/>
          <Button type='primary' onClick={(e)=>{setUpdateUser(record.email)
                                    return showUpdateUserVisible()}}>Edit</Button>
          </div>);
      })
      
    },
  ];
return(
<LayoutSection>
<div style={{margin:'auto 5rem'}}>
    <Table columns={columns} dataSource={user} size="middle" />
    <Modal title="update user details" visible={updateUserVisible} onOk={handleUserOk} onCancel={handleUserCancel}>
      <UserUpdate value={updateUser} />
    </Modal>
</div>
</LayoutSection>
)}
