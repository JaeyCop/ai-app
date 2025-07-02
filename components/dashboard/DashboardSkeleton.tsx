import { FaCalendarAlt } from "react-icons/fa";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`bg-ai-surface rounded-lg animate-pulse ${className}`} />
);

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-ai-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <SkeletonBox className="h-10 w-64 mb-2" />
              <SkeletonBox className="h-6 w-80" />
            </div>
            <div className="bg-ai-surface border border-ai-border rounded-xl p-4 text-center">
              <SkeletonBox className="h-8 w-12 mx-auto mb-1" />
              <SkeletonBox className="h-4 w-20 mx-auto" />
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-ai-surface border border-ai-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <SkeletonBox className="h-12 w-12 rounded-lg" />
              </div>
              <SkeletonBox className="h-8 w-20 mb-1" />
              <SkeletonBox className="h-4 w-32" />
            </div>
          ))}
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-ai-surface border border-ai-border rounded-xl p-6">
              <div className="flex items-center mb-3">
                <SkeletonBox className="h-5 w-5 rounded-full mr-3" />
                <SkeletonBox className="h-5 w-32" />
              </div>
              <SkeletonBox className="h-7 w-40 mb-2" />
              <SkeletonBox className="h-4 w-48" />
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-ai-surface border border-ai-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <FaCalendarAlt className="mr-3 text-ai-green" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-ai-black bg-opacity-50 rounded-lg">
                <div className="flex-1">
                  <SkeletonBox className="h-5 w-48 mb-2" />
                  <SkeletonBox className="h-4 w-20" />
                </div>
                <SkeletonBox className="h-4 w-24 ml-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}