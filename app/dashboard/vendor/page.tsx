'use client'
import { useAuth } from '@/hooks/useAuth';
import React, { useEffect } from 'react'


const Vendor = () => {
  const { user, fetchSession } = useAuth();
  useEffect(() => {
    fetchSession(); 
  },[fetchSession])

  if(user?.role !== "vendor") {
    return <div>Unauthorized</div>
  }
}

export default Vendor