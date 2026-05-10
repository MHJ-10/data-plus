import {
  CTA,
  Footer,
  Header,
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
      <div className="container mx-auto mb-40 flex flex-col gap-40 px-4">
        <Header />
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
