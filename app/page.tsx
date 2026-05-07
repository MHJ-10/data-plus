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
    <div className="bg-background relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 z-5">
        <div className="from-accent/10 via-background to-accent/10 absolute inset-0 bg-linear-to-r" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#64748b0d_1px,transparent_1px),linear-gradient(to_bottom,#64748b0d_1px,transparent_1px)] bg-size-[48px_48px]" />

        <div className="bg-warning/5 absolute top-0 left-1/4 size-150 rounded-full blur-3xl" />
        <div className="bg-accent/10 absolute top-1/4 right-1/4 size-175 rounded-full blur-3xl" />
        <div className="bg-success/5 absolute bottom-1/4 left-1/3 size-125 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
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
      </div>
    </div>
  );
}
