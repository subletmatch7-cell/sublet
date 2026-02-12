import React, { useEffect } from 'react'
import AboutHero from '../../components/about/AHero'
import ProblemSection from '../../components/about/Problem'
import ApproachSection from '../../components/about/Approach'

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <AboutHero/>
      <ProblemSection/>
      <ApproachSection/>
    </div>
  )
}

export default About
