// src/Components/SimpleChart.jsx
import React from 'react';

// Existing Bar Chart
export const SimpleBarChart = ({ data, title, color = "gray", height = "h-32" }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  const colorClasses = {
    gray: "bg-gray-600",
    black: "bg-black",
    white: "bg-white border border-gray-300"
  };

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-16 text-sm font-medium text-gray-700 truncate">
            {item.label}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${colorClasses[color]}`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                {item.value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Line Chart Component
export const SimpleLineChart = ({ data, color = "gray" }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue || 1;

  const colorClasses = {
    gray: { stroke: "#4B5563", fill: "#F3F4F6" },
    black: { stroke: "#000000", fill: "#E5E7EB" },
    white: { stroke: "#FFFFFF", fill: "#F9FAFB" }
  };

  return (
    <div className="w-full h-50">
      <svg viewBox="0 0 300 120" className="w-full h-full">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorClasses[color].fill} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={colorClasses[color].fill} stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 30, 60, 90, 120].map(y => (
          <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#e5e7eb" strokeWidth="0.5"/>
        ))}
        
        {/* Area fill */}
        <polygon
          fill={`url(#gradient-${color})`}
          points={`0,120 ${data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300;
            const y = 120 - ((item.value - minValue) / range) * 100;
            return `${x},${y}`;
          }).join(' ')} 300,120`}
        />
        
        {/* Data line */}
        <polyline
          fill="none"
          stroke={colorClasses[color].stroke}
          strokeWidth="2"
          points={data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300;
            const y = 120 - ((item.value - minValue) / range) * 100;
            return `${x},${y}`;
          }).join(' ')}
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 300;
          const y = 120 - ((item.value - minValue) / range) * 100;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill={colorClasses[color].stroke}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      
      {/* Labels */}
      <div className="flex justify-between my-2 text-xs text-gray-500">
        {data.map((item, index) => (
          <span key={index}>{item.label}</span>
        ))}
      </div>
    </div>
  );
};

// Pie Chart Component
export const SimplePieChart = ({ data, size = 140 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  // Monochrome color palette - different shades of gray and black
  const colors = [
    "#000000", // black
    "#374151", // gray-700
    "#6B7280", // gray-500
    "#9CA3AF", // gray-400
    "#D1D5DB", // gray-300
    "#E5E7EB", // gray-200
  ];

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <svg width={size} height={size} viewBox="0 0 42 42">
          <circle
            cx="21"
            cy="21"
            r="15.915494309189533"
            fill="transparent"
            stroke="#f3f4f6"
            strokeWidth="3"
          />
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${percentage} ${100 - percentage}`;
            const strokeDashoffset = -cumulativePercentage;
            cumulativePercentage += percentage;

            return (
              <circle
                key={index}
                cx="21"
                cy="21"
                r="15.915494309189533"
                fill="transparent"
                stroke={colors[index % colors.length]}
                strokeWidth="3"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 21 21)"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-900">{total}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <span className="text-sm text-gray-700">{item.label}</span>
            <span className="text-sm font-semibold text-gray-900">({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Area Chart Component
export const SimpleAreaChart = ({ data, color = "gray" }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue || 1;

  const colorClasses = {
    gray: { stroke: "#4B5563", fill: "#9CA3AF" },
    black: { stroke: "#000000", fill: "#6B7280" },
  };

  return (
    <div className="w-full h-32">
      <svg viewBox="0 0 300 100" className="w-full h-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#e5e7eb" strokeWidth="0.5"/>
        ))}
        
        {/* Area fill */}
        <polygon
          fill={colorClasses[color].fill}
          fillOpacity="0.3"
          points={`0,100 ${data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300;
            const y = 100 - ((item.value - minValue) / range) * 80;
            return `${x},${y}`;
          }).join(' ')} 300,100`}
        />
        
        {/* Data line */}
        <polyline
          fill="none"
          stroke={colorClasses[color].stroke}
          strokeWidth="2"
          points={data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300;
            const y = 100 - ((item.value - minValue) / range) * 80;
            return `${x},${y}`;
          }).join(' ')}
        />
      </svg>
      
      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {data.map((item, index) => (
          <span key={index}>{item.label}</span>
        ))}
      </div>
    </div>
  );
};

export default SimpleBarChart;
