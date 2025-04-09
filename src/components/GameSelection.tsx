
import React from "react";
import { Game, getGameIcon } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface GameSelectionProps {
  games: Game[];
  selectedGameId: string;
  onSelectGame: (gameId: string) => void;
}

const GameSelection: React.FC<GameSelectionProps> = ({
  games,
  selectedGameId,
  onSelectGame,
}) => {
  return (
    <div className="bg-card shadow-md rounded-lg p-4 mb-6">
      <h2 className="font-semibold text-lg mb-3">Live Games</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {games.map((game) => {
          const GameIcon = getGameIcon(game.type);
          const isSelected = game.id === selectedGameId;
          
          return (
            <button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg transition-all",
                isSelected 
                  ? "bg-sports-blue text-white shadow-md" 
                  : "bg-secondary hover:bg-sports-blue/10 hover:shadow-sm"
              )}
            >
              <GameIcon className={cn("h-5 w-5", isSelected ? "text-white" : "text-sports-blue")} />
              <div className={cn("flex flex-col items-start", isSelected ? "text-white" : "text-foreground")}>
                <span className="font-medium text-sm">
                  {game.homeTeam.abbreviation} vs {game.awayTeam.abbreviation}
                </span>
                <div className="flex items-center text-xs space-x-1">
                  <span className={cn(
                    "px-1 rounded", 
                    isSelected ? "bg-white/20" : "bg-sports-blue/20",
                    game.status === "live" && "animate-pulse"
                  )}>
                    {game.status.toUpperCase()}
                  </span>
                  <span>•</span>
                  <span>{game.period}</span>
                </div>
              </div>
              <div className={cn(
                "font-bold", 
                isSelected ? "text-white" : "text-foreground"
              )}>
                {game.homeTeam.score}-{game.awayTeam.score}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameSelection;
