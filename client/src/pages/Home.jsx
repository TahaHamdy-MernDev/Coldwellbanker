import React from 'react'
import {
  LatestProperties,
  Hero,
  WhyChooseUs,
  TopAreas,
  ForRent,
  TopTypes,
  ContactForm,
  HomeLunch,
} from '../components'

export default function Home() {
  return (
    <>
      <Hero />
<HomeLunch/>
      <LatestProperties />
      <TopTypes />
      <TopAreas />
      <WhyChooseUs />
      <ForRent />
      <ContactForm/>
    </>
  )
}
