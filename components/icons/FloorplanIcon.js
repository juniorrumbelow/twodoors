export default function FloorplanIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M3 14h7" />
      <path d="M10 21V10" />
      <path d="M10 10h11" />
    </svg>
  );
}
