import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 text-center text-gray-400 text-sm">
      <p>
        © 2026{" "}
        <span style={{ fontFamily: '"Lora", Georgia, serif', fontWeight: 500, color: '#2d3a2e' }}>two</span>
        <span style={{ fontFamily: '"Lora", Georgia, serif', fontWeight: 500, color: '#7a9c72' }}>doors</span>. All
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
