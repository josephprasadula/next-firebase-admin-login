import { useRouter } from "next/dist/client/router"
import { useAuth } from "./userAuth"
import React, { useState } from "react"

export default function PrivateRoute({ component: Component, ...rest }) {
    const router = useRouter()
  const [currentUser,setCurrentUser] = useState(useAuth())

  return (
    <React.Fragment
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : router.replace('/')
      }}
    ></React.Fragment>
  )
}