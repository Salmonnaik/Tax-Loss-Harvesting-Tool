import React from 'react';

const HoldingsTableSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Holdings</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(4)].map((_, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HoldingsTableSkeleton;
