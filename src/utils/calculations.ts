import { CapitalGains, Holding } from '../services/mockData';

export const calculateHarvestedGains = (
  originalGains: CapitalGains,
  holdings: Holding[],
  selectedCoins: string[]
): CapitalGains => {
  if (!originalGains) {
    return {
      stcg: { profits: 0, losses: 0 },
      ltcg: { profits: 0, losses: 0 }
    };
  }

  const selectedHoldings = holdings.filter(h => selectedCoins.includes(h.coin));
  
  const newGains: CapitalGains = {
    stcg: {
      profits: originalGains.stcg.profits,
      losses: originalGains.stcg.losses,
    },
    ltcg: {
      profits: originalGains.ltcg.profits,
      losses: originalGains.ltcg.losses,
    },
  };

  selectedHoldings.forEach(holding => {
    if (holding.stcg.gain > 0) {
      newGains.stcg.profits += holding.stcg.gain;
    } else if (holding.stcg.gain < 0) {
      newGains.stcg.losses += Math.abs(holding.stcg.gain);
    }

    if (holding.ltcg.gain > 0) {
      newGains.ltcg.profits += holding.ltcg.gain;
    } else if (holding.ltcg.gain < 0) {
      newGains.ltcg.losses += Math.abs(holding.ltcg.gain);
    }
  });

  return newGains;
};

export const calculateSavings = (originalGains: CapitalGains | null, harvestedGains: CapitalGains): number => {
  if (!originalGains) return 0;
  
  const originalNet = (originalGains.stcg.profits - originalGains.stcg.losses) + 
                     (originalGains.ltcg.profits - originalGains.ltcg.losses);
  const harvestedNet = (harvestedGains.stcg.profits - harvestedGains.stcg.losses) + 
                       (harvestedGains.ltcg.profits - harvestedGains.ltcg.losses);
  
  return originalNet - harvestedNet;
};
