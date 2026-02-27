import React, { useEffect } from 'react'
import HeroSection from '../../components/home/Hero';
import Listings from './Listings';


const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <Listings/>
      <HeroSection/>
     
   
    </div>
  )
}

export default Home
