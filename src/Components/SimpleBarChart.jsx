// src/Components/SimpleBarChart.jsx
import React from 'react';

const SimpleBarChart = ({ data, title, color = "gray", height = "h-32" }) => {
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

export default SimpleBarChart;
