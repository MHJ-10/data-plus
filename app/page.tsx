"use client";

import { Hero, SampleResult } from "./components";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col gap-20 py-20">
      <Hero />
      <SampleResult />
    </div>
  );
}
