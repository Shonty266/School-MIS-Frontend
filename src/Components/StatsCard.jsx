// components/StatsCard.jsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, color = "gray", trend = null }) => {
  // Monochrome color system with white backgrounds
  const colorClasses = {
    black: {
      bg: "bg-white",
      icon: "bg-black text-white",
      text: "text-gray-900",
      title: "text-gray-600"
    },
    gray: {
      bg: "bg-white",
      icon: "bg-gray-600 text-white",
      text: "text-gray-900",
      title: "text-gray-600"
    },
    darkGray: {
      bg: "bg-white",
      icon: "bg-gray-700 text-white",
      text: "text-gray-900",
      title: "text-gray-600"
    },
    white: {
      bg: "bg-white",
      icon: "bg-gray-900 text-white",
      text: "text-gray-900",
      title: "text-gray-600"
    }
  };

  const currentColor = colorClasses[color] || colorClasses.gray;

  // Format value with proper handling
  const formatValue = (val) => {
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return val.toLocaleString();
    return val;
  };

  return (
    <div className={`relative overflow-hidden rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${currentColor.bg}`}>
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
        <Icon className="w-full h-full transform rotate-12" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          {/* Title and Value */}
          <div className="flex-1">
            <p className={`text-sm font-medium mb-2 ${currentColor.title}`}>
              {title}
            </p>
            <p className={`text-3xl font-bold leading-none ${currentColor.text}`}>
              {formatValue(value)}
            </p>
          </div>
          
          {/* Icon */}
          <div className={`flex-shrink-0 p-3 rounded-xl ${currentColor.icon}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        
        {/* Trend Indicator */}
        {trend && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-900">
              {trend.direction === 'up' ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{trend.percentage}%</span>
            </div>
            <span className={`text-xs ${currentColor.title}`}>
              vs last period
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
