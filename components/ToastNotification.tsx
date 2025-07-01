import React from 'react';

interface ToastNotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function ToastNotification({ message, type, onClose }: ToastNotificationProps) {
  let bgColorClass = 'bg-gray-700';
  let borderColorClass = 'border-gray-500';

  switch (type) {
    case 'success':
      bgColorClass = 'bg-ai-green';
      borderColorClass = 'border-green-600';
      break;
    case 'error':
      bgColorClass = 'bg-ai-red';
      borderColorClass = 'border-red-600';
      break;
    case 'info':
      bgColorClass = 'bg-ai-orange';
      borderColorClass = 'border-orange-600';
      break;
  }

  return (
    <div className={`p-4 rounded-lg shadow-lg text-white border-l-4 ${bgColorClass} ${borderColorClass} flex items-center justify-between animate-fade-in-up`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200 focus:outline-none">×</button>
    </div>
  );
}