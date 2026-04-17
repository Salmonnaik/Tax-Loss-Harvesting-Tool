import React from 'react';
import { CapitalGains } from '../services/mockData';

interface CapitalGainsCardProps {
  title: string;
  capitalGains: CapitalGains;
  isDark?: boolean;
  savings?: number;
}

const CapitalGainsCard: React.FC<CapitalGainsCardProps> = ({ 
  title, 
  capitalGains, 
  isDark = false,
  savings 
}) => {
  const netSTCG = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const netLTCG = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const realizedCapitalGains = netSTCG + netLTCG;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-blue-600 text-white'}`}>
      <h2 className="text-xl font-bold mb-6">{title}</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Short-term</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Profits:</span>
              <span className="font-medium">{formatCurrency(capitalGains.stcg.profits)}</span>
            </div>
            <div className="flex justify-between">
              <span>Losses:</span>
              <span className="font-medium">{formatCurrency(capitalGains.stcg.losses)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-600">
              <span className="font-semibold">Net Capital Gains:</span>
              <span className="font-bold">{formatCurrency(netSTCG)}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Long-term</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Profits:</span>
              <span className="font-medium">{formatCurrency(capitalGains.ltcg.profits)}</span>
            </div>
            <div className="flex justify-between">
              <span>Losses:</span>
              <span className="font-medium">{formatCurrency(capitalGains.ltcg.losses)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-600">
              <span className="font-semibold">Net Capital Gains:</span>
              <span className="font-bold">{formatCurrency(netLTCG)}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-600">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Realised Capital Gains:</span>
            <span className="text-xl font-bold">{formatCurrency(realizedCapitalGains)}</span>
          </div>
        </div>

        {savings !== undefined && savings > 0 && (
          <div className="mt-4 p-3 bg-green-500 rounded-lg">
            <p className="text-center font-semibold">
              You're going to save {formatCurrency(savings)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapitalGainsCard;
