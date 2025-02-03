import ApplicationInputs from '@/components/EnergyEstimator/EnergyEstimator'
import Hero from '@/components/EnergyEstimator/Hero'
import React from 'react'

const page = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      {/* <Navbar /> */}
      <Hero />
      {/* <LocationInputs /> */}
      <ApplicationInputs />
    </div>
  )
}

export default page
