"use client";

import {
  CTA,
  Footer,
  Hero,
  HowItWorks,
  PowerfulFeatures,
  SampleResult,
  SeeInAction,
  TechnicalHighlight,
  UseCases,
  VisualizationTypes,
} from "./components";

export default function Home() {
  return (
    <>
      <div className="container mx-auto flex flex-col gap-40 px-4 py-20">
        <Hero />
        <SampleResult />
        <SeeInAction />
        <HowItWorks />
        <PowerfulFeatures />
        <VisualizationTypes />
        <UseCases />
      </div>
      <TechnicalHighlight />
      <CTA />
      <Footer />
    </>
  );
}
