import React,{useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image';
import logoImg from '../pngtree.jpg'
import styles from '../styles/login.module.scss'
import { useAuth } from '../context/Authcontext';
import { useRouter } from 'next/router';

export default function Header({children}) {
  const {currentUser} = useAuth()
  const router = useRouter();
  return (
    <div>
        <Head>
        <title>Brexitlogin</title>
        <meta name='theme-color' content='#0d1a26' />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Brexit" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
      <header className={styles.header}>
          <div style={{cursor:'pointer'}}  onClick={()=>{if(currentUser)
                                                        {router.push('/dashboard')}
                                                        else{
                                                          router.push('/')
                                                        }
                                                        return null}}
          >
            <Image src={logoImg} width="100" height="100"></Image>
            <h1 style={{color:'#1890ff'}}>Brexit</h1>
          </div>
        <div>
        {children}
        </div>
      </header>
    </div>
  )
}
