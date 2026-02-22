import React, { useEffect } from 'react'
import HeroSection from '../../components/home/Hero';
import FeaturedListingsSection from '../../components/home/FeathuredListing';
import Listings from './Listings';


const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <Listings/>
      <FeaturedListingsSection/>
      <HeroSection/>
     
   
    </div>
  )
}

export default Home
