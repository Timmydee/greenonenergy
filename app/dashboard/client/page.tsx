'use client'
import { useAuth } from '@/hooks/useAuth';
import React, { useEffect } from 'react'


const Client = () => {
  const { user, fetchSession } = useAuth();
  useEffect(() => {
    fetchSession(); 
  },[fetchSession])

  if(user?.role !== "client") {
    return <div>Unauthorized</div>
  }

  return (
    <div>client</div>
  )
}

export default Client