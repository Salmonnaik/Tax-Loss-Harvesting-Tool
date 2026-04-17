import React, { useState } from 'react';
import { Holding } from '../services/mockData';

interface HoldingsTableProps {
  holdings: Holding[];
  selectedHoldings: string[];
  onSelectionChange: (selected: string[]) => void;
  showAll?: boolean;
  onToggleShowAll?: () => void;
}

const HoldingsTable: React.FC<HoldingsTableProps> = ({ 
  holdings, 
  selectedHoldings, 
  onSelectionChange,
  showAll = false,
  onToggleShowAll
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [hoveredHolding, setHoveredHolding] = useState<Holding | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<'stcg' | 'ltcg' | 'holdings' | 'avgBuyPrice' | 'currentPrice' | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const displayedHoldings = showAll ? holdings : holdings.slice(0, 4);
  
  const sortedHoldings = React.useMemo(() => {
    if (!sortOrder) return displayedHoldings;
    
    return [...displayedHoldings].sort((a, b) => {
      const comparison = a.stcg.gain - b.stcg.gain;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [displayedHoldings, sortOrder]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(holdings.map(h => h.coin));
    } else {
      onSelectionChange([]);
    }
  };

  const handleRowSelect = (coin: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedHoldings, coin]);
    } else {
      onSelectionChange(selectedHoldings.filter(h => h !== coin));
    }
  };

  const handleSortClick = () => {
    if (sortOrder === null) {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder(null);
    }
  };

  const isAllSelected = selectedHoldings.length === holdings.length;
  const isIndeterminate = selectedHoldings.length > 0 && selectedHoldings.length < holdings.length;

  const formatCurrency = (value: number) => {
    // Custom formatting to prevent abbreviation
    const absValue = Math.abs(value);
    const sign = value >= 0 ? '' : '-';
    
    // Format with proper thousand separators but no abbreviation
    const formatted = absValue.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    });
    
    return `₹${sign}${formatted}`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Holdings</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Asset</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Holdings</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Buy Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Current Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  <button
                    onClick={handleSortClick}
                    className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                    title="Click to sort by Short-Term Gain"
                  >
                    <span>Short-Term Gain</span>
                    <span className="text-xs">
                      {sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : '↕'}
                    </span>
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Long-Term Gain</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount to Sell</th>
              </tr>
            </thead>
            <tbody>
              {sortedHoldings.map((holding) => (
                <tr 
                  key={holding.coin} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedHoldings.includes(holding.coin)}
                      onChange={(e) => handleRowSelect(holding.coin, e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={holding.logo} 
                        alt={holding.coinName}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{holding.coin}</div>
                        <div className="text-sm text-gray-500">{holding.coinName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900 cursor-pointer hover:bg-gray-50"
                     title={`Holdings: ${formatNumber(holding.totalHolding)} | Avg Buy: ${formatCurrency(holding.averageBuyPrice)}`}
                     onMouseEnter={(e) => {
                       setHoveredHolding(holding);
                       setHoveredColumn('holdings');
                       setMousePosition({ x: e.clientX, y: e.clientY });
                     }}
                     onMouseMove={(e) => {
                       setMousePosition({ x: e.clientX, y: e.clientY });
                     }}
                     onMouseLeave={() => {
                       setHoveredHolding(null);
                       setHoveredColumn(null);
                     }}
                   >
                    <div className="text-sm">
                      Holdings: {formatNumber(holding.totalHolding)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Avg Buy Price: {formatCurrency(holding.averageBuyPrice)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900 cursor-pointer hover:bg-gray-50"
                     title={`Average Buy Price: ${formatCurrency(holding.averageBuyPrice)}`}
                     onMouseEnter={(e) => {
                       setHoveredHolding(holding);
                       setHoveredColumn('avgBuyPrice');
                       setMousePosition({ x: e.clientX, y: e.clientY });
                     }}
                     onMouseMove={(e) => {
                       setMousePosition({ x: e.clientX, y: e.clientY });
                     }}
                     onMouseLeave={() => {
                       setHoveredHolding(null);
                       setHoveredColumn(null);
                     }}
                   >
                    {formatCurrency(holding.averageBuyPrice)}
                  </td>
                  <td className="py-3 px-4 text-gray-900 cursor-pointer hover:bg-gray-50"
                     title={`Current Price: ${formatCurrency(holding.currentPrice)}`}
                     onMouseEnter={(e) => {
                       setHoveredHolding(holding);
                       setHoveredColumn('currentPrice');
                       setMousePosition({ x: e.clientX, y: e.clientY });
                     }}
                     onMouseMove={(e) => {
                       setMousePosition({ x: e.clientX, y: e.clientY });
                     }}
                     onMouseLeave={() => {
                       setHoveredHolding(null);
                       setHoveredColumn(null);
                     }}
                   >
                    {formatCurrency(holding.currentPrice)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-600">
                      Balance: {formatNumber(holding.stcg.balance)}
                    </div>
                    <div 
                      className={`font-medium cursor-pointer hover:opacity-80 transition-opacity ${
                        holding.stcg.gain >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                      title={`Short-Term Gain: ${formatCurrency(holding.stcg.gain)} | Balance: ${formatNumber(holding.stcg.balance)}`}
                      onMouseEnter={(e) => {
                        setHoveredHolding(holding);
                        setHoveredColumn('stcg');
                        setMousePosition({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseMove={(e) => {
                        setMousePosition({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => {
                        setHoveredHolding(null);
                        setHoveredColumn(null);
                      }}
                    >
                      {formatCurrency(holding.stcg.gain)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-600">
                      Balance: {formatNumber(holding.ltcg.balance)}
                    </div>
                    <div 
                      className={`font-medium cursor-pointer hover:opacity-80 transition-opacity ${
                        holding.ltcg.gain >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                      title={`Long-Term Gain: ${formatCurrency(holding.ltcg.gain)} | Balance: ${formatNumber(holding.ltcg.balance)}`}
                      onMouseEnter={(e) => {
                        setHoveredHolding(holding);
                        setHoveredColumn('ltcg');
                        setMousePosition({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseMove={(e) => {
                        setMousePosition({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => {
                        setHoveredHolding(null);
                        setHoveredColumn(null);
                      }}
                    >
                      {formatCurrency(holding.ltcg.gain)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {selectedHoldings.includes(holding.coin) ? formatNumber(holding.totalHolding) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!showAll && holdings.length > 4 && (
          <div className="mt-4 text-center">
            <button
              onClick={onToggleShowAll}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
            >
              View All ({holdings.length} total)
            </button>
          </div>
        )}
        
        {showAll && holdings.length > 4 && (
          <div className="mt-4 text-center">
            <button
              onClick={onToggleShowAll}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
            >
              Show Less (First 4)
            </button>
          </div>
        )}
      </div>
      
      {/* Popup for gain details */}
      {hoveredHolding && hoveredColumn && (
        <div 
          className="fixed z-50 bg-gray-900 text-white rounded-lg shadow-xl p-3 pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 40,
            minWidth: '200px'
          }}
        >
          <div className="text-xs font-semibold mb-1">
            {hoveredColumn === 'stcg' ? 'Short-Term Gain' : 
             hoveredColumn === 'ltcg' ? 'Long-Term Gain' : 
             hoveredColumn === 'holdings' ? 'Holdings' : 
             hoveredColumn === 'avgBuyPrice' ? 'Average Buy Price' : 
             hoveredColumn === 'currentPrice' ? 'Current Price' : 'Details'}
          </div>
          <div className="text-sm">
            {hoveredColumn === 'holdings' ? (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Total Holdings:</span>
                  <span>{formatNumber(hoveredHolding.totalHolding)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Asset:</span>
                  <span>{hoveredHolding.coin} ({hoveredHolding.coinName})</span>
                </div>
              </div>
            ) : hoveredColumn === 'avgBuyPrice' ? (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Average Buy Price:</span>
                  <span>{formatCurrency(hoveredHolding.averageBuyPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Current Price:</span>
                  <span>{formatCurrency(hoveredHolding.currentPrice)}</span>
                </div>
              </div>
            ) : hoveredColumn === 'currentPrice' ? (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Average Buy Price:</span>
                  <span>{formatCurrency(hoveredHolding.averageBuyPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Current Price:</span>
                  <span>{formatCurrency(hoveredHolding.currentPrice)}</span>
                </div>
              </div>
            ) : (hoveredColumn === 'stcg' || hoveredColumn === 'ltcg') ? (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Balance:</span>
                  <span>{formatNumber(hoveredColumn === 'stcg' ? hoveredHolding.stcg.balance : hoveredHolding.ltcg.balance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Gain/Loss:</span>
                  <span className={`font-bold ${
                    hoveredColumn === 'stcg' 
                      ? (hoveredHolding.stcg.gain >= 0 ? 'text-green-400' : 'text-red-400')
                      : (hoveredHolding.ltcg.gain >= 0 ? 'text-green-400' : 'text-red-400')
                  }`}>
                    {hoveredColumn === 'stcg' 
                      ? (hoveredHolding.stcg.gain >= 0 ? '+' : '') + formatCurrency(hoveredHolding.stcg.gain)
                      : (hoveredHolding.ltcg.gain >= 0 ? '+' : '') + formatCurrency(hoveredHolding.ltcg.gain)
                    }
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
