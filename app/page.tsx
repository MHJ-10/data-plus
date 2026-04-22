import Link from "next/link";

export default function Home() {
  return (
    <div className="0 flex flex-col items-center justify-center">
      <h1 className="text-center text-3xl text-cyan-900"> Data Plus</h1>
      <Link href="/dashboard">
        <p>Navigate to dashboard</p>
      </Link>
    </div>
  );
}
