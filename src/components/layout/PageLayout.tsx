interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export function PageLayout({
  children,
  className = '',
  fullWidth = false,
}: PageLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 ${className}`}
    >
      <div className={`h-full ${fullWidth ? '' : 'max-w-7xl mx-auto px-4'}`}>
        {children}
      </div>
    </div>
  );
}
