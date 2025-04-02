
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {months.map((month) => (
          <Card
            key={month}
            className={`
              overflow-hidden rounded-2xl cursor-pointer transition-all duration-200 border-0
              ${selectedMonths.includes(month) 
                ? 'ring-2 ring-[#3c83f6] shadow-md' 
                : 'hover:shadow-md'
              }
            `}
            onClick={() => {
              if (selectedMonths.includes(month)) {
                onMonthsChange(selectedMonths.filter(m => m !== month));
              } else {
                onMonthsChange([...selectedMonths, month]);
              }
            }}
          >
            <div className="relative">
              <div 
                className={`
                  p-6 flex justify-center items-center bg-gradient-to-b from-sky-50 to-blue-100
                  ${selectedMonths.includes(month) ? 'bg-gradient-to-b from-blue-100 to-[#3c83f6]/20' : ''}
                `}
              >
                <span className={`text-lg font-medium ${selectedMonths.includes(month) ? 'text-[#3c83f6]' : 'text-gray-800'}`}>
                  {month}
                </span>
              </div>
              
              {selectedMonths.includes(month) && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-[#3c83f6] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TravelMonthsStep;
