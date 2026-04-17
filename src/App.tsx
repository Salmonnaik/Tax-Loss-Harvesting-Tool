import React, { useState, useEffect } from 'react';
import CapitalGainsCard from './components/CapitalGainsCard';
import HoldingsTable from './components/HoldingsTable';
import HoldingsTableSkeleton from './components/HoldingsTableSkeleton';
import Loader from './components/Loader';
import { fetchHoldings, fetchCapitalGains } from './services/api';
import { CapitalGains, Holding } from './services/mockData';
import { calculateHarvestedGains, calculateSavings } from './utils/calculations';

const App: React.FC = () => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [originalGains, setOriginalGains] = useState<CapitalGains | null>(null);
  const [selectedHoldings, setSelectedHoldings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ]);
        setHoldings(holdingsData);
        setOriginalGains(gainsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    loadData();
  }, []);

  const handleSelectionChange = (selected: string[]) => {
    setSelectedHoldings(selected);
  };

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const getHarvestedGains = (): CapitalGains => {
    if (!originalGains) return {
      stcg: { profits: 0, losses: 0 },
      ltcg: { profits: 0, losses: 0 }
    };
    
    return calculateHarvestedGains(originalGains, holdings, selectedHoldings);
  };

  const getSavings = (): number => {
    if (!originalGains) return 0;
    const harvestedGains = getHarvestedGains();
    return calculateSavings(originalGains, harvestedGains);
  };

  if (initialLoad) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader size="large" message="Loading Tax Loss Harvesting Data..." />
      </div>
    );
  }

  if (!originalGains) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg font-semibold text-red-600">Error loading data</div>
      </div>
    );
  }

  const harvestedGains: CapitalGains = getHarvestedGains();
  const savings: number = getSavings();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Tax Loss Harvesting Tool
        </h1>
        
        {/* How It Works Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Review Your Holdings</h3>
              <p className="text-gray-600 text-sm">
                View all your cryptocurrency holdings with their current gains and losses. See short-term and long-term positions at a glance.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Select Losses</h3>
              <p className="text-gray-600 text-sm">
                Choose holdings with losses to harvest. These losses can offset your gains and reduce your overall tax liability.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">See Your Savings</h3>
              <p className="text-gray-600 text-sm">
                Watch your tax savings calculate in real-time as you select different holdings. The tool shows exactly how much you'll save.
              </p>
            </div>
          </div>
        </div>

        {/* Important Notes Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-3 text-gray-900">Important Notes</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Tax loss harvesting only offsets gains, it doesn't eliminate them entirely. Consult a tax professional for personalized advice.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Wash sale rules may apply. You typically cannot claim losses on securities you repurchase within 30 days.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>This tool provides estimates based on current data. Actual tax implications may vary based on your specific situation.</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 mr-2">•</span>
              <span>Keep detailed records of all transactions for accurate tax reporting and compliance purposes.</span>
            </li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CapitalGainsCard
            title="Before Harvesting"
            capitalGains={originalGains!}
            isDark={true}
          />
          <CapitalGainsCard
            title="After Harvesting"
            capitalGains={harvestedGains}
            isDark={false}
            savings={savings > 0 ? savings : undefined}
          />
        </div>

        {loading && !initialLoad ? (
          <HoldingsTableSkeleton />
        ) : (
          <HoldingsTable
            holdings={holdings}
            selectedHoldings={selectedHoldings}
            onSelectionChange={handleSelectionChange}
            showAll={showAll}
            onToggleShowAll={handleToggleShowAll}
          />
        )}
      </div>
    </div>
  );
};

export default App;
