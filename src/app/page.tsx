import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">

      <div className="flex items-center gap-5">
        <Link className="bg-[#273AF4] text-white px-4 py-2 rounded-full" href="/dj">Go to DJ page</Link>
        <Link className="bg-orange-500 text-white px-4 py-2 rounded-full" href="/producer">Go to Producer page</Link>
      </div>
    </div>
  );
}
