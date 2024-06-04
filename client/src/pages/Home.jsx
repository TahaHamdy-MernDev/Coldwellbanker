import React from 'react'
import {
  LatestProperties,
  Hero,
  WhyChooseUs,
  TopAreas,
  ForRent,
  TopTypes,
  ContactForm,
} from '../components'

export default function Home() {
  return (
    <>
      <Hero />

      <LatestProperties />
      <TopTypes />
      <TopAreas />
      <WhyChooseUs />
      <ForRent />
      <ContactForm/>
    </>
  )
}
