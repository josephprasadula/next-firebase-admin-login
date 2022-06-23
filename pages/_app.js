import '../styles/globals.css'
import 'antd/dist/antd.css';
import {AuthProvider} from '../context/Authcontext'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

function MyApp({ Component, pageProps }) {
  return <AuthProvider><Component {...pageProps} />
  </AuthProvider>
}

export default MyApp
