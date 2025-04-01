
import React from 'react';

type Budget = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

type BudgetSelectorProps = {
  selectedBudget: string;
  onBudgetSelect: (budgetId: string) => void;
};

const BudgetSelector: React.FC<BudgetSelectorProps> = ({ selectedBudget, onBudgetSelect }) => {
  const budgets: Budget[] = [
    { 
      id: 'budget', 
      name: 'Budget', 
      icon: '💳', 
      description: 'Economical options, hostels, street food, public transportation'
    },
    { 
      id: 'midrange', 
      name: 'Mid-range', 
      icon: '💵', 
      description: 'Good hotels, restaurants, occasional splurges'
    },
    { 
      id: 'luxury', 
      name: 'Luxury', 
      icon: '💎', 
      description: 'High-end accommodations, fine dining, premium experiences'
    },
  ];

  return (
    <div className="w-full my-8">
      <h3 className="text-xl font-semibold mb-4">Select your budget level</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {budgets.map((budget) => (
          <div
            key={budget.id}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedBudget === budget.id
                ? 'bg-blue-50 border-2 border-travel-blue'
                : 'bg-white border border-gray-200 hover:border-travel-blue/50'
            }`}
            onClick={() => onBudgetSelect(budget.id)}
          >
            <div className="flex items-center mb-2">
              <span className="text-3xl mr-2">{budget.icon}</span>
              <span className="font-medium">{budget.name}</span>
            </div>
            <p className="text-sm text-gray-600">{budget.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetSelector;
