
import React, { useState,useEffect,useRef} from 'react';

import { useAuth, AuthContext } from '../context/Authcontext';
import firebase,{auth, db,storage} from './firebaseconfig'

import { useRouter } from 'next/router'

import UserUpdate from '../components/updateUser';


import { Button ,Modal,message, Popconfirm} from 'antd';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
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
          return doc.data();
        });
        // ********************must********************
        setUser(temp)
      });
    return events;
  }
  useEffect(()=>{
    getMarkers()
  },[temp1])

return(
<LayoutSection>
<div style={{margin:'auto 5rem'}}>
  <MDBTable striped>
    <MDBTableHead>
      <tr>
        <th scope='col'>CreatedBy</th>
        <th scope='col'>Name</th>
        <th scope='col'>Gender</th>
        <th scope='col'>Email</th>
        <th scope='col'>edit</th>
        <th scope='col'>delete</th>
      </tr>
    </MDBTableHead>
  <MDBTableBody>
    {user.map((users)=>{
      let email=users.email
      return(
        <>
        <tr key={users.createdAt}>
          <th scope='row'>{users.createdBy
          }</th>
          <td>{users.name}</td>
          <td>{users.gender}</td>
          <td  className='email'>{users.email} </td>
          <td>{<Button name={email} 
                      onClick={(e)=>{setUpdateUser(email)
                                    return showUpdateUserVisible()}}
                type="primary">Edit</Button>} </td>
          
          <td>{<Popconfirm placement="leftTop" title={text} onConfirm={confirm} okText="Yes" cancelText="No" >
            <Button name={email} onClick={(e)=>{
              let queryEmail = email
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
            }} type="primary" danger>Delete</Button>
          </Popconfirm >} </td>
        </tr>

        </>
        
      )
    })}
  <Modal title="update user details" visible={updateUserVisible} onOk={handleUserOk} onCancel={handleUserCancel}>
    <UserUpdate value={updateUser} />
  </Modal>
    {/* <Modal title="Edit User" visible={isModalVisible}   onOk={handleOk} onCancel={handleCancel}>
      <div>
        <Register />    
      </div>
    </Modal> */}
  </MDBTableBody>
  </MDBTable>
</div>

</LayoutSection>


)}
