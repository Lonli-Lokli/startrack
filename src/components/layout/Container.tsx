interface ContainerProps {
    children: React.ReactNode
    className?: string
  }
  
  export function Container({ children, className = '' }: ContainerProps) {
    return (
      <main className={`w-full h-[calc(100vh-4rem)] px-4 py-8 ${className}`}>
        <div className="w-full h-full">
          {children}
        </div>
      </main>
    )
  }