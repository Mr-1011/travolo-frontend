import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const toggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      onMonthsChange(selectedMonths.filter(m => m !== month));
    } else {
      onMonthsChange([...selectedMonths, month]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="pr-4 pb-4">
          <h2 className="text-2xl font-bold mb-2">Travel Time</h2>
          <p className="text-gray-600 mb-6">When would you like to travel? Select all months that work for you.</p>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {months.map((month) => {
              const isSelected = selectedMonths.includes(month);
              return (
                <button
                  key={month}
                  onClick={() => toggleMonth(month)}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all duration-200
                    ${isSelected ? 'border-[#3c83f6] bg-blue-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}
                    ${isSelected ? 'shadow-sm' : ''}
                    flex items-center justify-center h-16
                  `}
                >
                  <span className={`font-medium ${isSelected ? 'text-[#3c83f6]' : 'text-gray-700'}`}>
                    {month}
                  </span>

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#3c83f6] rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Selected months:</span> {selectedMonths.length > 0 ? selectedMonths.join(', ') : 'None selected'}
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TravelMonthsStep;
