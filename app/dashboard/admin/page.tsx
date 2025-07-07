'use client'
import { useAuth } from '@/hooks/useAuth';
import React, { useEffect } from 'react'


const Admin = () => {
  const { user, fetchSession } = useAuth();
  useEffect(() => {
    fetchSession(); 
  },[fetchSession])

  if(user?.role !== "admin") {
    return <div>Unauthorized</div>
  }

  return (
    <div>Admin</div>
  )
}

export default Admin