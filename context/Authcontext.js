import React ,{useContext , useState , useEffect} from 'react'
import { auth } from '../pages/firebaseconfig'
import { useRouter } from 'next/router'
export const AuthContext = React.createContext()
export function useAuth () {
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState(null)
    const router = useRouter();

    function signup(email,password){
       return auth.createUserWithEmailAndPassword(email,password)
    }
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout(){
        return auth.signOut()
        // .then(()=>{setCurrentUser(null)}).catch((err)=>{errorMessage})
    }
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
        setCurrentUser(user)})
        return unsubscribe
    },[])
    // useEffect(()=>{if(router.pathname=='/'||router.pathname=='/register'||router.pathname=='/404'||router.pathname=='/_error'){
    //   console.log('can access pages with out logining in')  
    // }else{
    //   if(!currentUser)
    //   router.push('/')
    // }
    // },[router.pathname])
    const value= {
        currentUser,
        signup,
        login,
        logout
    }
  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  )
}
