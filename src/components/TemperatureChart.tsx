import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { MonthlyTemperature } from '@/types';
import { Card, CardContent } from "@/components/ui/card";

type TemperatureChartProps = {
  data: Record<string, MonthlyTemperature> | null;
};

const monthNames: { [key: string]: string } = {
  '1': 'Jan', '2': 'Feb', '3': 'Mar', '4': 'Apr', '5': 'May', '6': 'Jun',
  '7': 'Jul', '8': 'Aug', '9': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
};

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  if (!data) {
    return <p className="text-gray-500 text-sm">Temperature data not available.</p>;
  }

  const chartData = Object.entries(data)
    .map(([month, temps]) => ({
      month: monthNames[month] || month,
      avg: temps.avg,
      max: temps.max,
      min: temps.min,
    }))
    .sort((a, b) => {
      const monthA = Object.keys(monthNames).find(key => monthNames[key] === a.month) || '0';
      const monthB = Object.keys(monthNames).find(key => monthNames[key] === b.month) || '0';
      return parseInt(monthA, 10) - parseInt(monthB, 10);
    });

  const hasNullData = chartData.some(d => d.avg === null || d.min === null || d.max === null);

  if (hasNullData) {
    return <p className="text-gray-500 text-sm">Some temperature data is missing or invalid.</p>;
  }

  // Calculate nice domain boundaries
  const allTemps = chartData.flatMap(d => [d.min, d.avg, d.max]).filter(t => t !== null) as number[];
  const actualMin = Math.min(...allTemps);
  const actualMax = Math.max(...allTemps);

  const domainMin = Math.floor((actualMin - 2) / 5) * 5;
  const domainMax = Math.ceil((actualMax + 2) / 5) * 5;
  const tickCount = Math.max(3, Math.min(8, Math.round((domainMax - domainMin) / 5) + 1)); // Aim for ticks every ~5 degrees, min 3, max 8 ticks

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{
              top: 5, right: 20, left: -10, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              unit="°C"
              domain={[domainMin, domainMax]}
              tickCount={tickCount}
              allowDataOverflow={true} // Ensures lines aren't clipped if they slightly exceed calculated domain
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
              formatter={(value: number | string, name: string) => {
                // value might be string if data is missing/null - handle appropriately if needed
                const formattedValue = typeof value === 'number' ? `${value.toFixed(1)} °C` : `${value}`;
                // Return the formatted value and the original name from the Line component
                return [formattedValue, name];
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="avg"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3, fill: '#3b82f6' }}
              activeDot={{ r: 5 }}
              name="Avg Temp"
            />
            <Line
              type="monotone"
              dataKey="max"
              stroke="#ef4444"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: '#ef4444' }}
              name="Max Temp"
            />
            <Line
              type="monotone"
              dataKey="min"
              stroke="#22c55e"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: '#22c55e' }}
              name="Min Temp"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TemperatureChart; 