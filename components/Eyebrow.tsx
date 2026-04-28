type EyebrowProps = {
  label: string
  light?: boolean
  className?: string
}

export default function Eyebrow({ label, light = false, className = '' }: EyebrowProps) {
  return (
    <div className={`flex items-center gap-2 mb-3 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-amber inline-block flex-shrink-0" />
      <span
        className="text-xs font-bold tracking-eyebrow uppercase"
        style={{ color: light ? '#84A98C' : '#52796F' }}
      >
        {label}
      </span>
    </div>
  )
}
