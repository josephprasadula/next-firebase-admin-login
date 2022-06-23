import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

const App = () => {
    let router= useRouter();
    return(
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong 🙃😕"
            extra={<Button type="primary" onClick={()=>{
                router.push('/')
            }}>Back Home</Button>}
        />
    )
};

export default App;     
