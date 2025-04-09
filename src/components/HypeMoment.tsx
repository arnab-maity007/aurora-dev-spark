
import React from "react";
import { Trophy } from "lucide-react";
import { CommentaryItem } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface HypeMomentProps {
  item: CommentaryItem;
}

const HypeMoment: React.FC<HypeMomentProps> = ({ item }) => {
  return (
    <div className="mb-4 animate-highlight-pulse">
      <div className="rounded-lg overflow-hidden shadow-lg border-2 border-sports-orange hype-gradient">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="h-6 w-6 text-white" />
            <h3 className="text-lg font-bold text-white">HYPE MOMENT!</h3>
            <span className="text-xs bg-white/30 text-white px-2 py-0.5 rounded-full">
              {item.timestamp}
            </span>
          </div>
          
          <p className="text-white text-lg font-medium mb-3">{item.text}</p>
          
          {item.stats && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {item.stats.map((stat, index) => (
                <div key={index} className="bg-white/20 rounded p-2">
                  <div className="text-xs text-white/80">{stat.label}</div>
                  <div className="text-sm font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HypeMoment;
