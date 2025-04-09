
import React from "react";
import { useLiveFeed } from "@/hooks/useLiveFeed";
import GameSelection from "@/components/GameSelection";
import GameHeader from "@/components/GameHeader";
import LiveFeed from "@/components/LiveFeed";
import StatsTrends from "@/components/StatsTrends";

const Index = () => {
  const { 
    games, 
    selectedGame, 
    selectedGameId, 
    selectGame, 
    commentary, 
    isLoading 
  } = useLiveFeed();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full sports-gradient flex items-center justify-center text-white font-bold text-xl mr-3">
                SC
              </div>
              <h1 className="text-2xl font-bold">Sports Commentary</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Live Coverage • {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <GameSelection 
          games={games} 
          selectedGameId={selectedGameId} 
          onSelectGame={selectGame} 
        />
        
        {selectedGame && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GameHeader game={selectedGame} />
              <StatsTrends game={selectedGame} />
            </div>
            <div className="lg:col-span-1">
              <LiveFeed 
                commentaryItems={commentary} 
                isLoading={isLoading} 
              />
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-card shadow-inner py-4 mt-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Sports Commentary Feed - Hackathon Project
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
