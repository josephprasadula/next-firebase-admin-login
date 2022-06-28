import React from 'react'

export default function userdetailsForm() {
  return (
    <>
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
    </>
   
  )
}
