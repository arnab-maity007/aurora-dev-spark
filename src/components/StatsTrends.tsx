
import React from "react";
import { BarChart3, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { Game } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface StatsTrendsProps {
  game: Game;
}

const StatsTrends: React.FC<StatsTrendsProps> = ({ game }) => {
  // In a real app, these would be calculated from actual game stats
  const homeStats = {
    possession: Math.round(Math.random() * 20 + 40),
    fieldGoalPct: Math.round(Math.random() * 20 + 40),
    rebounding: Math.round(Math.random() * 20 + 40),
    trend: Math.random() > 0.5 ? "up" : "down"
  };
  
  const awayStats = {
    possession: 100 - homeStats.possession,
    fieldGoalPct: Math.round(Math.random() * 20 + 40),
    rebounding: Math.round(Math.random() * 20 + 40),
    trend: homeStats.trend === "up" ? "down" : "up"
  };
  
  const renderTrendIcon = (trend: string) => {
    if (trend === "up") return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (trend === "down") return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <ArrowRight className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="bg-card shadow-md rounded-lg p-4 mb-4 clip-stats-path">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-sports-blue" />
          <h2 className="font-bold text-lg">Stats & Trends</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs px-2 py-1 rounded-full bg-secondary">
            LIVE UPDATES
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Possession */}
        <div className="bg-muted rounded-lg p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Possession</span>
            <div className="flex items-center space-x-1">
              {renderTrendIcon(homeStats.trend)}
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full sports-gradient" 
              style={{ width: `${homeStats.possession}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs">
            <span className="font-medium">{game.homeTeam.abbreviation}: {homeStats.possession}%</span>
            <span className="text-muted-foreground">{game.awayTeam.abbreviation}: {awayStats.possession}%</span>
          </div>
        </div>
        
        {/* FG% */}
        <div className="bg-muted rounded-lg p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">FG%</span>
            <div className="flex items-center space-x-1">
              {renderTrendIcon(Math.random() > 0.5 ? "up" : "down")}
            </div>
          </div>
          <div className="flex items-end h-16 space-x-2">
            <div className="flex flex-col items-center flex-1">
              <div className="text-sm font-semibold">{homeStats.fieldGoalPct}%</div>
              <div className="w-full bg-sports-blue rounded-t-sm" style={{ height: `${homeStats.fieldGoalPct}%` }}></div>
              <div className="text-xs mt-1">{game.homeTeam.abbreviation}</div>
            </div>
            <div className="flex flex-col items-center flex-1">
              <div className="text-sm font-semibold">{awayStats.fieldGoalPct}%</div>
              <div className="w-full bg-sports-purple rounded-t-sm" style={{ height: `${awayStats.fieldGoalPct}%` }}></div>
              <div className="text-xs mt-1">{game.awayTeam.abbreviation}</div>
            </div>
          </div>
        </div>
        
        {/* Team Momentum */}
        <div className="bg-muted rounded-lg p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Momentum</span>
            <div className="flex items-center space-x-1">
              {renderTrendIcon(homeStats.trend)}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-16 relative">
            <div className={cn(
              "text-lg font-bold",
              homeStats.trend === "up" ? "text-sports-blue" : "text-sports-purple"
            )}>
              {homeStats.trend === "up" ? game.homeTeam.name : game.awayTeam.name}
            </div>
            <div className="text-xs text-muted-foreground">has momentum</div>
            
            <div className={cn(
              "absolute top-0 right-0 h-3 w-3 rounded-full",
              homeStats.trend === "up" ? "bg-green-500" : "bg-red-500",
              "animate-pulse"
            )}></div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-muted-foreground text-right">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default StatsTrends;
