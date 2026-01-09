"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserDetailContext } from '@/context/UserDetailContext'
import Header from './_components/Header'

const Provider = ({children}:{children: React.ReactNode}) => {

    const [userDetail ,setUserDetail]=useState(null);

    useEffect(()=>{
        CreateNewUser();
    },[])

    const CreateNewUser=async ()=>{
        // user AOI endpoint call to create a new user in DB
        const result = await axios.post('/api/user',{});
        console.log(result.data); // log the created or existing user data
        setUserDetail(result?.data);
    }
  return (
    <div>
      
        <UserDetailContext.Provider value={{userDetail ,setUserDetail}}>
        <div className='max-w-7xl mx-auto'>
           <Header />
      {children}
      </div>

      </UserDetailContext.Provider>
    </div>
  )
}

export default Provider
