/**
 * Monogramme : une tranche de panneau MDF vue de profil — deux faces sombres
 * et un cœur clair — enfermée dans un carré.
 */
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="8" y="9" width="24" height="5" fill="currentColor" opacity="0.9" />
      <rect x="8" y="16" width="24" height="8" fill="currentColor" opacity="0.35" />
      <rect x="8" y="26" width="24" height="5" fill="currentColor" opacity="0.9" />
    </svg>
  )
}
