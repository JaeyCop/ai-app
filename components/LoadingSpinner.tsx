
import React from 'react';

export default function LoadingSpinner({ size = 8, color = 'ai-green' }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-b-2 transition-colors duration-300`}
        style={{ height: `${size}rem`, width: `${size}rem`, borderColor: `var(--color-${color})` }}
      />
    </div>
  );
}
