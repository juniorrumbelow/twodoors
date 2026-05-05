import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className="w-full py-12 text-center text-gray-400 text-sm">
        <p>
          © 2026 <span className="text-gray-900 font-semibold">two</span>
          <span className="text-[#f13053] font-semibold">doors</span>. All
          rights reserved.
        </p>
      </footer>
    </>
  );
}
