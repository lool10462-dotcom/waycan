import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedAds from '@/components/FeaturedAds'
import HowItWorks from '@/components/HowItWorks'
import PremiumPacks from '@/components/PremiumPacks'
import Testimonials from '@/components/Testimonials'
import MobileApp from '@/components/MobileApp'

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedAds />
      <HowItWorks />
      <PremiumPacks />
      <Testimonials />
      <MobileApp />
    </>
  )
}