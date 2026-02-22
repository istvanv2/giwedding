export function FloralDividerSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Center stem */}
      <line x1="120" y1="20" x2="280" y2="20" stroke="#c4a882" strokeWidth="0.6" opacity="0.3" />

      {/* Left branches */}
      <path d="M120 20 Q 100 14 80 18" stroke="#c4a882" strokeWidth="0.6" opacity="0.25" fill="none" />
      <path d="M100 20 Q 85 26 70 22" stroke="#c4a882" strokeWidth="0.6" opacity="0.25" fill="none" />

      {/* Right branches */}
      <path d="M280 20 Q 300 14 320 18" stroke="#c4a882" strokeWidth="0.6" opacity="0.25" fill="none" />
      <path d="M300 20 Q 315 26 330 22" stroke="#c4a882" strokeWidth="0.6" opacity="0.25" fill="none" />

      {/* Leaves left */}
      <ellipse cx="90" cy="16" rx="8" ry="3" transform="rotate(-15 90 16)" fill="#8b7355" opacity="0.1" />
      <ellipse cx="78" cy="21" rx="7" ry="2.5" transform="rotate(10 78 21)" fill="#c4a882" opacity="0.08" />
      <ellipse cx="110" cy="17" rx="7" ry="2.5" transform="rotate(-10 110 17)" fill="#8b7355" opacity="0.09" />
      <ellipse cx="105" cy="24" rx="6" ry="2" transform="rotate(15 105 24)" fill="#c4a882" opacity="0.08" />

      {/* Leaves right */}
      <ellipse cx="310" cy="16" rx="8" ry="3" transform="rotate(15 310 16)" fill="#8b7355" opacity="0.1" />
      <ellipse cx="322" cy="21" rx="7" ry="2.5" transform="rotate(-10 322 21)" fill="#c4a882" opacity="0.08" />
      <ellipse cx="290" cy="17" rx="7" ry="2.5" transform="rotate(10 290 17)" fill="#8b7355" opacity="0.09" />
      <ellipse cx="295" cy="24" rx="6" ry="2" transform="rotate(-15 295 24)" fill="#c4a882" opacity="0.08" />

      {/* Center flower */}
      <circle cx="200" cy="20" r="4" fill="#c4a882" opacity="0.2" />
      <circle cx="200" cy="20" r="2" fill="#8b7355" opacity="0.15" />

      {/* Small dots */}
      <circle cx="160" cy="19" r="1.2" fill="#8b7355" opacity="0.15" />
      <circle cx="240" cy="19" r="1.2" fill="#8b7355" opacity="0.15" />
      <circle cx="140" cy="21" r="1" fill="#c4a882" opacity="0.12" />
      <circle cx="260" cy="21" r="1" fill="#c4a882" opacity="0.12" />
    </svg>
  )
}
