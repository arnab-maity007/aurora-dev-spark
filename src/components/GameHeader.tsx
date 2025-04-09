
import React from "react";
import { Game, getGameIcon } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface GameHeaderProps {
  game: Game;
}

const GameHeader: React.FC<GameHeaderProps> = ({ game }) => {
  const GameIcon = getGameIcon(game.type);
  
  const scoreClass = (team: "home" | "away") => {
    if (team === "home") {
      return game.homeTeam.score > game.awayTeam.score 
        ? "text-sports-blue font-bold" 
        : "text-foreground";
    } else {
      return game.awayTeam.score > game.homeTeam.score 
        ? "text-sports-blue font-bold" 
        : "text-foreground";
    }
  };

  return (
    <div className="bg-card shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <GameIcon className="h-5 w-5 text-sports-blue" />
          <h2 className="font-bold text-lg">
            {game.homeTeam.name} vs {game.awayTeam.name}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className={cn("text-sm px-2 py-1 rounded-full bg-sports-blue/10 text-sports-blue", 
            game.status === "live" && "animate-pulse")}>
            {game.status === "live" ? "LIVE" : game.status.toUpperCase()}
          </span>
          <span className="text-sm px-2 py-1 rounded-full bg-secondary">
            {game.period} • {game.clock}
          </span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
              {game.homeTeam.abbreviation}
            </div>
            <span className="text-sm mt-1">{game.homeTeam.name}</span>
          </div>
          
          <div className="text-3xl font-bold flex items-center space-x-4">
            <span className={scoreClass("home")}>{game.homeTeam.score}</span>
            <span className="text-muted-foreground">-</span>
            <span className={scoreClass("away")}>{game.awayTeam.score}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg font-bold">
              {game.awayTeam.abbreviation}
            </div>
            <span className="text-sm mt-1">{game.awayTeam.name}</span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {game.venue}
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
