
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type TravelMonthsStepProps = {
  selectedMonths: string[];
  onMonthsChange: (months: string[]) => void;
};

const TravelMonthsStep: React.FC<TravelMonthsStepProps> = ({ 
  selectedMonths, 
  onMonthsChange 
}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-2">Best Months to Travel</h2>
      <p className="text-gray-600 mb-6">When do you want to travel?</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {months.map((month) => (
          <div
            key={month}
            onClick={() => {
              if (selectedMonths.includes(month)) {
                onMonthsChange(selectedMonths.filter(m => m !== month));
              } else {
                onMonthsChange([...selectedMonths, month]);
              }
            }}
            className={`
              py-3 px-4 rounded-md text-center cursor-pointer transition-all border
              ${selectedMonths.includes(month) 
                ? 'bg-[#3c83f6] border-[#3c83f6] text-white' 
                : 'bg-white border-gray-200 hover:border-gray-300'
              }
            `}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelMonthsStep;
