import type { IconType } from 'react-icons';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: IconType;
  color: string;
  trend?: "up" | "down" | null;
}

export default function StatCard({ label, value, icon: Icon, color, trend }: StatCardProps) {
  const getColorClasses = (color: string) => {
    switch(color) {
      case 'ai-green': return 'text-ai-green border-ai-green/20 bg-ai-green/5';
      case 'ai-blue': return 'text-ai-blue border-ai-blue/20 bg-ai-blue/5';
      case 'ai-orange': return 'text-ai-orange border-ai-orange/20 bg-ai-orange/5';
      case 'ai-gold': return 'text-ai-gold border-ai-gold/20 bg-ai-gold/5';
      default: return 'text-ai-green border-ai-green/20 bg-ai-green/5';
    }
  };

  return (
    <div className="bg-ai-surface border border-ai-border rounded-xl p-6 hover:border-ai-green/50 transition-all duration-200 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <div className={`text-sm font-medium ${trend === 'up' ? 'text-ai-green' : 'text-ai-red'}`}>
            {trend === 'up' ? '↗' : '↘'}
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1 group-hover:text-ai-green transition-colors">{value}</div>
      <div className="text-ai-gray text-sm">{label}</div>
    </div>
  );
}