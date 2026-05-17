import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full py-12 text-center text-gray-400 text-sm">
      <div className="flex justify-center mb-4">
        <Logo size="text-2xl" />
      </div>
      <p>© 2026 twodoors. All rights reserved.</p>
      <p className="mt-3">
        <Link href="/agent/login" className="text-gray-400 hover:text-gray-600 transition-colors">
          Agent login
        </Link>
      </p>
    </footer>
  );
}
