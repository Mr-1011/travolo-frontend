
import React from 'react';

type BudgetOption = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

type TravelBudgetStepProps = {
  selectedBudget: string;
  onBudgetSelect: (budgetId: string) => void;
};

const TravelBudgetStep: React.FC<TravelBudgetStepProps> = ({ 
  selectedBudget, 
  onBudgetSelect 
}) => {
  const budgetOptions: BudgetOption[] = [
    { 
      id: 'budget', 
      name: 'Budget', 
      description: 'Hostels, public transport, low-cost meals', 
      icon: '💸' 
    },
    { 
      id: 'mid-range', 
      name: 'Mid-range', 
      description: '3-star hotels, restaurants, taxis', 
      icon: '💵' 
    },
    { 
      id: 'luxury', 
      name: 'Luxury', 
      description: 'High-end stays, fine dining, private tours', 
      icon: '💎' 
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Travel Budget</h2>
      <p className="text-gray-600 mb-6">What kind of budget are you planning for this trip?</p>
      
      <div className="flex flex-col space-y-4">
        {budgetOptions.map((option) => (
          <div
            key={option.id}
            className={`
              flex items-center p-5 rounded-lg cursor-pointer transition-all
              ${selectedBudget === option.id
                ? 'bg-[#3c83f6] text-white shadow-md'
                : 'bg-white border border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => onBudgetSelect(option.id)}
          >
            <span className="text-3xl mr-4">{option.icon}</span>
            <div>
              <h3 className="text-lg font-medium">{option.name}</h3>
              <p className={`text-sm ${selectedBudget === option.id ? 'text-white/90' : 'text-gray-500'}`}>
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelBudgetStep;
