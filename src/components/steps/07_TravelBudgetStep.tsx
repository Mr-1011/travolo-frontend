import React from 'react';

type BudgetOption = {
  id: string;
  name: string;
  description: string;
  icon?: string;
  imageSrc?: string;
};

type TravelBudgetStepProps = {
  selectedBudget: string[];
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
      imageSrc: '/icons/budget.png'
    },
    {
      id: 'mid-range',
      name: 'Mid-range',
      description: '3-star hotels, restaurants, taxis',
      imageSrc: '/icons/mid-range.png'
    },
    {
      id: 'luxury',
      name: 'Luxury',
      description: 'High-end stays, fine dining, private tours',
      imageSrc: '/icons/luxury.png'
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Travel Budget</h2>
      <p className="text-gray-600 mb-6">What kind of budget are you planning for this trip?</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {budgetOptions.map((option) => (
          <div
            key={option.id}
            className={`
              relative flex flex-col items-center p-5 rounded-lg border-2 transition-all duration-200 cursor-pointer h-full
              ${selectedBudget.includes(option.id)
                ? 'border-[#3c83f6] bg-blue-50 shadow-sm'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }
            `}
            onClick={() => onBudgetSelect(option.id)}
          >
            {option.imageSrc ? (
              <img
                src={option.imageSrc}
                alt={option.name}
                className="w-16 h-16 mb-3"
                style={{ filter: 'drop-shadow(0 2px 3px rgba(0, 21, 255, 0.10))' }}
              />
            ) : (
              <span className="text-4xl mb-3">{option.icon}</span>
            )}
            <div className="text-center">
              <h3 className={`text-lg font-medium mb-1 ${selectedBudget.includes(option.id) ? 'text-[#3c83f6]' : 'text-gray-700'}`}>{option.name}</h3>
              <p className={`text-sm ${selectedBudget.includes(option.id) ? 'text-gray-700' : 'text-gray-500'}`}>
                {option.description}
              </p>
            </div>
            {selectedBudget.includes(option.id) && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-[#3c83f6] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelBudgetStep;
