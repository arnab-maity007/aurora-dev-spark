
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLiveFeed } from "@/hooks/useLiveFeed";
import { useAuth } from "@/components/AuthProvider";
import GameSelection from "@/components/GameSelection";
import GameHeader from "@/components/GameHeader";
import LiveFeed from "@/components/LiveFeed";
import StatsTrends from "@/components/StatsTrends";
import TeamWinGraph from "@/components/TeamWinGraph";
import VoiceCommentary from "@/components/VoiceCommentary";
import { Button } from "@/components/ui/button";
import { LogOut, History } from "lucide-react";
import { teamWinData } from "@/utils/sportData";

const Index = () => {
  const { 
    games, 
    selectedGame, 
    selectedGameId, 
    selectGame, 
    commentary, 
    isLoading 
  } = useLiveFeed();
  
  const { user, signOut } = useAuth();
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Toggle voice commentary
  const toggleVoice = () => {
    setVoiceEnabled(prev => !prev);
  };

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
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <Link to="/history">
                  <History className="h-4 w-4 mr-1" />
                  History
                </Link>
              </Button>
              {user && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              )}
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
        
        <TeamWinGraph teams={teamWinData} />
        
        {selectedGame && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GameHeader game={selectedGame} />
              <StatsTrends game={selectedGame} />
            </div>
            <div className="lg:col-span-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">Live Coverage</h2>
                <VoiceCommentary 
                  commentary={commentary}
                  isEnabled={voiceEnabled}
                  onToggle={toggleVoice}
                />
              </div>
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
            © 2025 Sports Commentary Feed - Real-time sports updates
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
