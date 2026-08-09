import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyCarex } from "@/components/sections/WhyCarex";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { StructuredData } from "@/components/StructuredData";

export default function HomePage() {
  return (
    <main id="main">
      <StructuredData />
      <Hero />
      <TrustStrip />
      <Services />
      <HowItWorks />
      <WhyCarex />
      <ServiceArea />
      <WhoWeHelp />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
