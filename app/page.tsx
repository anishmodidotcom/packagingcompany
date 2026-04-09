"use client";

import { useState } from "react";
import Nav from "@/components/nav/Nav";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ProofMarquee from "@/components/sections/ProofMarquee";
import StatsBand from "@/components/sections/StatsBand";
import BoxAssemblyScroll from "@/components/sections/BoxAssemblyScroll";
import BentoProducts from "@/components/sections/BentoProducts";
import IndustriesSplit from "@/components/sections/IndustriesSplit";
import Process from "@/components/sections/Process";
import AltpacMap from "@/components/sections/AltpacMap";
import Certifications from "@/components/sections/Certifications";
import Infrastructure from "@/components/sections/Infrastructure";
import Capabilities from "@/components/sections/Capabilities";
import WhyAltpac from "@/components/sections/WhyAltpac";
import ImpactStats from "@/components/sections/ImpactStats";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import StickySampleCTA from "@/components/interactive/StickySampleCTA";
import SampleModal from "@/components/interactive/SampleModal";
import InlineCTA from "@/components/ui/InlineCTA";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Nav onSampleClick={openModal} />
      <main>
        <Hero onSampleClick={openModal} />
        <TrustBar />
        <ProofMarquee />
        <StatsBand />
        <BoxAssemblyScroll />
        <BentoProducts />
        <IndustriesSplit />
        <Process />
        <InlineCTA
          headline="Ready to skip the sales gauntlet?"
          subhead="Tell us your volumes and specs — we'll send a real quote within 24 hours. No obligations, no endless discovery calls."
          primaryLabel="Get a Quote in 24 Hours"
          secondaryLabel="Talk to a Strategist"
          onPrimaryClick={openModal}
        />
        <AltpacMap />
        <Certifications />
        <Infrastructure />
        <Capabilities />
        <WhyAltpac />
        <InlineCTA
          headline="Still comparing suppliers?"
          subhead="Order a free sample pack and see the difference in person. Free shipping across India, no minimums, no sales calls required."
          primaryLabel="Request a Sample Pack"
          secondaryLabel="Download Capability Deck"
          variant="forest"
          onPrimaryClick={openModal}
        />
        <ImpactStats />
        <FinalCTA onSampleClick={openModal} />
      </main>
      <Footer />
      <StickySampleCTA onClick={openModal} />
      <SampleModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}
