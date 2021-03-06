import { useState ,useEffect} from 'react';


import LayoutSection from '../components/layout'
import { useAuth,} from '../context/Authcontext';
import firebase,{auth, db,storage} from './firebaseconfig'

export default function App() {
  const [data, setData] = useState({})
  const {currentUser,setCurrentUser} = useAuth()
  
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
  
  return(
    <LayoutSection>
      <h2>share stories/shorts</h2>
      <form onSubmit={formHandler}>
      <input type='file'/>
      <input type='submit' />
      </form>
      <br />

      <button onClick={()=>{img()}}>View Your Last Uploads</button>
      <img id='myimg' src='#'/>
    </LayoutSection>
  )}