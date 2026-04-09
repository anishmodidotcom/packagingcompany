"use client";

import { useState } from "react";
import Nav from "@/components/nav/Nav";
import Hero from "@/components/sections/Hero";
import ProofMarquee from "@/components/sections/ProofMarquee";
import StatsBand from "@/components/sections/StatsBand";
import BentoProducts from "@/components/sections/BentoProducts";
import IndustriesSplit from "@/components/sections/IndustriesSplit";
import AltpacMap from "@/components/sections/AltpacMap";
import Certifications from "@/components/sections/Certifications";
import Infrastructure from "@/components/sections/Infrastructure";
import Capabilities from "@/components/sections/Capabilities";
import ImpactStats from "@/components/sections/ImpactStats";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import StickySampleCTA from "@/components/interactive/StickySampleCTA";
import SampleModal from "@/components/interactive/SampleModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Nav onSampleClick={openModal} />
      <main>
        <Hero onSampleClick={openModal} />
        <ProofMarquee />
        <StatsBand />
        <BentoProducts />
        <IndustriesSplit />
        <AltpacMap />
        <Certifications />
        <Infrastructure />
        <Capabilities />
        <ImpactStats />
        <FinalCTA onSampleClick={openModal} />
      </main>
      <Footer />
      <StickySampleCTA onClick={openModal} />
      <SampleModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
}
