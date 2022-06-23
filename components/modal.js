import { Button, Modal, Space } from 'antd';
import React from 'react';

const info = () => {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        
      </div>
    ),

    onOk() {},
  });
};

const success = () => {
  Modal.success({
    content: 'New User created Successfully',
  });
};

const error = () => {
  Modal.error({
    title: 'This is an error message',
    content: 'Please enter the registered email',
  });
};

const warning = () => {
  Modal.warning({
    title: 'This is a warning message',
    content: 'enter the correct email and password',
  });
};

const App = (props) => (
    
  <Space wrap>
    {/* <Button onClick={info}>Info</Button> */}
    {props=='success'&&<Button onClick={success}>Success</Button>}
    {props=='error'&&<Button onClick={error}>Error</Button>}
    {props=='Warning'&&<Button onClick={warning}>Warning</Button>}
    {console.log(78)}
  </Space>
);

export default App;