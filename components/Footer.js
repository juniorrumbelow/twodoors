import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 text-center text-gray-400 text-sm">
      <p>
        © 2026 <span className="text-gray-900 font-semibold">two</span>
        <span className="text-[#f13053] font-semibold">doors</span>. All
        rights reserved.
      </p>
      <p className="mt-3">
        <Link href="/agent/login" className="text-gray-400 hover:text-gray-600 transition-colors">
          Agent login
        </Link>
      </p>
    </footer>
  );
}
