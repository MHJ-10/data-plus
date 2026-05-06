"use client";

import { Hero, HowItWorks, SampleResult, SeeInAction } from "./components";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col gap-20 px-4 py-20">
      <Hero />
      <SampleResult />
      <SeeInAction />
      <HowItWorks />
    </div>
  );
}
