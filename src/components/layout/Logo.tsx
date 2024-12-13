interface LogoProps extends React.SVGProps<SVGSVGElement> {
    className?: string
  }
  
  export function Logo({ className, ...props }: LogoProps) {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={className} 
        {...props}
      >
        <defs>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb"/>
            <stop offset="100%" stopColor="#1d4ed8"/>
          </linearGradient>
        </defs>
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="url(#blue-gradient)" 
          stroke="#2563eb" 
          strokeWidth="2"
        />
        <path
          d="M50 20 L54 40 L74 40 L58 52 L64 72 L50 60 L36 72 L42 52 L26 40 L46 40 Z"
          fill="#fff"
        />
        <path
          d="M46 40 L50 20 L54 40 L48 35 Q50 25 52 35 Z"
          fill="#dc2626"
        />
        <path
          d="M46 40 L54 40"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle 
          cx="50" 
          cy="20" 
          r="3" 
          fill="#fff"
        />
        <path
          d="M50 20 Q 80 50 50 80 Q 20 50 50 20"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
      </svg>
    )
  }