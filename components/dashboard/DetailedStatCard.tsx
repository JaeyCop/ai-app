import type { IconType } from 'react-icons';

interface DetailedStatCardProps {
  label: string;
  value: string;
  icon: IconType;
  description: string;
}

export default function DetailedStatCard({ label, value, icon: Icon, description }: DetailedStatCardProps) {
  return (
    <div className="bg-ai-surface border border-ai-border rounded-xl p-6 hover:border-ai-green/50 transition-all duration-200">
      <div className="flex items-center mb-3">
        <Icon className="h-5 w-5 text-ai-green mr-3" />
        <h3 className="font-semibold text-white">{label}</h3>
      </div>
      <div className="text-2xl font-bold text-ai-orange mb-2 truncate">{value}</div>
      <p className="text-sm text-ai-gray">{description}</p>
    </div>
  );
}