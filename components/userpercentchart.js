import React, { useState ,useContext,useEffect} from 'react';
import {auth} from '../pages/firebaseconfig'
import { RingProgress } from '@ant-design/plots'


const DemoRingProgress = () => {
    const [progress,setProgress] = useState()
    const user = auth.currentUser
    // console.log(user)
    // let nameProgress = ((user.displayName!==null)?0.2:0)
    // let verifyProgress=((user.emailVerified!==null)?0.2:0)
    // console.log(nameProgress+verifyProgress)
    
    useEffect(()=>{
        if(user){
            setProgress((user.displayName!==null?0.2:0)+(user.emailVerified!==null?0.2:0)+(user.photoURL!==null?0.2:0)+(user.email!==null?0.2:0)+(user.phoneNumber!==null?0.2:0))
          }
    },[])
  
    const config = {
      height: 100,
      width: 100,
      autoFit: false,
      percent: progress,
      color: ['#5B8FF9', '#E8EDF3'],
    //   tooltip:
    };
    return <RingProgress {...config} />;
};

export default DemoRingProgress