import Hero from '@/components/home/Hero'
import FeaturedGear from '@/components/home/FeaturedGear'
import WhyRent from '@/components/home/WhyRent'
import Bundles from '@/components/home/Bundles'
import Testimonials from '@/components/home/Testimonials'
import HomeCTA from '@/components/home/HomeCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedGear />
      <WhyRent />
      <Bundles />
      <Testimonials />
      <HomeCTA />
    </>
  )
}
