import { Button, Result } from 'antd';
import { useRouter } from 'next/router';

const App = () => {
    let router= useRouter();
    return(
        <Result
            status="404"
            title="404"
            subTitle="Sorry, DeadEnd 😶😑"
            extra={<Button type="primary" onClick={()=>{
                router.push('/')
            }}>Back Home</Button>}
        />
    )
};

export default App;