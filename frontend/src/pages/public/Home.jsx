import React, { useEffect } from 'react'
import HeroSection from '../../components/home/Hero';
import TrustSection from '../../components/home/Why';
import HowItWorksSection from '../../components/home/HowItWorks';
import FeaturedListingsSection from '../../components/home/FeathuredListing';
import CTASection from '../../components/home/CTASection';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div>
      <HeroSection/>
      <TrustSection/>
      <HowItWorksSection/>
      <FeaturedListingsSection/>
      <CTASection/>
    </div>
  )
}

export default Home
