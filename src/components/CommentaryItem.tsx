
import React from "react";
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowRight, 
  BarChart3,
  LucideIcon 
} from "lucide-react";
import { CommentaryItem as CommentaryItemType, Trend } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface CommentaryItemProps {
  item: CommentaryItemType;
}

const CommentaryItem: React.FC<CommentaryItemProps> = ({ item }) => {
  const { timestamp, text, type, trend, icon: ItemIcon, stats } = item;
  
  const getTrendIcon = (trend?: Trend) => {
    if (!trend) return null;
    
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <ArrowRight className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  const getTrendClass = (trend?: Trend) => {
    if (!trend) return "";
    
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };
  
  const getTypeClass = (type: string) => {
    switch (type) {
      case "score":
        return "bg-sports-blue/10 text-sports-blue";
      case "foul":
        return "bg-red-100 text-red-600";
      case "timeout":
        return "bg-amber-100 text-amber-600";
      case "start-period":
      case "end-period":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-secondary text-muted-foreground";
    }
  };
  
  const Icon: LucideIcon = ItemIcon || ArrowRight;

  return (
    <div className="bg-card shadow-sm rounded-lg p-4 mb-3 animate-slide-in">
      <div className="flex items-start space-x-3">
        <div className="mt-1">
          <Icon className="h-5 w-5 text-sports-blue" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium">{text}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">{timestamp}</span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                getTypeClass(type)
              )}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
            
            {trend && (
              <div className="flex items-center space-x-1">
                <span className={cn("text-xs", getTrendClass(trend))}>
                  Trend
                </span>
                {getTrendIcon(trend)}
              </div>
            )}
          </div>
          
          {stats && stats.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <div className="flex items-center space-x-1 mb-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium">STATS</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-muted rounded p-2">
                    <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{stat.value}</div>
                      {stat.trend && getTrendIcon(stat.trend)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentaryItem;
