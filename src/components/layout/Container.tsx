interface ContainerProps {
    children: React.ReactNode
    className?: string
  }
  
  export function Container({ children, className = '' }: ContainerProps) {
    return (
      <main className={`absolute inset-x-0 bottom-0 top-[48px] sm:top-[64px] overflow-y-auto ${className}`}>
        <div className="w-full h-full px-4">
          {children}
        </div>
      </main>
    )
  }