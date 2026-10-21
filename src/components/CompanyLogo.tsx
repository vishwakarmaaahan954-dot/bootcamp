import React, { useState } from 'react';

interface CompanyLogoProps {
  name: string;
  logoUrl?: string | null;
  domain?: string | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  name,
  logoUrl,
  domain,
  className = '',
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);
  const logoKey = import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY;

  const getInitials = (str: string) => {
    if (!str) return 'C';
    const words = str.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const getResolvedSrc = () => {
    // If Logo.dev publishable key is present and domain/name available
    if (logoKey && domain) {
      return `https://img.logo.dev/${domain}?token=${logoKey}`;
    }
    if (logoUrl && !hasError) {
      return logoUrl;
    }
    return null;
  };

  const src = getResolvedSrc();

  if (src && !hasError) {
    return (
      <div
        className={`relative flex items-center justify-center shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm ${sizeClasses[size]} ${className}`}
      >
        <img
          src={src}
          alt={`${name} logo`}
          className="w-full h-full object-contain"
          onError={() => setHasError(true)}
          loading="lazy"
        />
      </div>
    );
  }

  // Initial letter circle fallback
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 rounded-lg border border-blue-200 bg-blue-50 font-semibold text-blue-700 shadow-sm ${sizeClasses[size]} ${className}`}
      aria-label={`${name} avatar`}
    >
      <span>{getInitials(name)}</span>
    </div>
  );
};

