import React from 'react';

const JobSkeleton = () => {
  return (
    <div className="p-5 m-5 rounded-md shadow-lg bg-white border border-gray-100 animate-pulse">
      {/* Company / Name Skeleton */}
      <div className="flex items-center gap-3 my-3">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-100 rounded w-1/4"></div>
        </div>
      </div>

      {/* Job Title & Description Skeleton */}
      <div className="mb-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded"></div>
          <div className="h-3 bg-gray-100 rounded"></div>
          <div className="h-3 bg-gray-100 rounded w-5/6"></div>
        </div>
      </div>

      {/* Badges Skeleton */}
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="h-6 bg-gray-100 rounded-full w-20"></div>
        <div className="h-6 bg-gray-100 rounded-full w-24"></div>
        <div className="h-6 bg-gray-100 rounded-full w-16"></div>
      </div>
    </div>
  );
};

export const JobDetailSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto my-10 px-4 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="space-y-4 w-2/3">
                    <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex gap-2">
                        <div className="h-6 bg-gray-100 rounded-full w-20"></div>
                        <div className="h-6 bg-gray-100 rounded-full w-24"></div>
                        <div className="h-6 bg-gray-100 rounded-full w-16"></div>
                    </div>
                </div>
                <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
            </div>

            <div className="my-10 space-y-6">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="border-b border-gray-200 pb-4"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex gap-4">
                            <div className="h-5 bg-gray-200 rounded w-32"></div>
                            <div className="h-5 bg-gray-100 rounded flex-1"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobSkeleton;
