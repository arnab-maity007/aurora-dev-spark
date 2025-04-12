import React, { useState, useEffect } from "react";
import { Calendar, CalendarClock, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Game, GameType, GameStatus, getGameIcon } from "@/utils/mockData";
import { Input } from "@/components/ui/input";

interface GameHistoryProps {}

const GameHistory: React.FC<GameHistoryProps> = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameHistory = async () => {
      setIsLoading(true);
      try {
        // Fetch from Supabase
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .order('game_date', { ascending: false });
          
        if (error) throw error;
        
        // If we have data from Supabase, format it
        if (data && data.length > 0) {
          // Format data to match the Game interface
          const formattedGames = data.map(game => ({
            id: game.id,
            type: game.sport_type as GameType,
            homeTeam: {
              id: `home-${game.id}`,
              name: game.home_team,
              abbreviation: game.home_team.substring(0, 3).toUpperCase(),
              score: game.home_score,
              logoUrl: "" // Add empty logoUrl
            },
            awayTeam: {
              id: `away-${game.id}`,
              name: game.away_team,
              abbreviation: game.away_team.substring(0, 3).toUpperCase(),
              score: game.away_score,
              logoUrl: "" // Add empty logoUrl
            },
            status: "finished" as GameStatus,
            period: "Final",
            clock: "",
            venue: "Stadium",
            date: new Date(game.game_date).toLocaleDateString(),
            summary: game.summary || "Game completed"
          }));
          
          setGames(formattedGames);
        } else {
          // Use mock data if no real data exists
          // In a real app, we'd use an API call here
          setGames([
            {
              id: "history-1",
              type: "basketball" as GameType,
              homeTeam: {
                id: "lakers",
                name: "Lakers",
                abbreviation: "LAL",
                score: 108,
                logoUrl: "" // Add empty logoUrl
              },
              awayTeam: {
                id: "warriors",
                name: "Warriors",
                abbreviation: "GSW",
                score: 104,
                logoUrl: "" // Add empty logoUrl
              },
              status: "finished" as GameStatus,
              period: "Final",
              clock: "",
              venue: "Staples Center",
              date: "2025-04-05",
              summary: "Lakers won in a close game"
            },
            {
              id: "history-2",
              type: "cricket" as GameType,
              homeTeam: {
                id: "india",
                name: "India",
                abbreviation: "IND",
                score: 320,
                logoUrl: "" // Add empty logoUrl
              },
              awayTeam: {
                id: "australia",
                name: "Australia",
                abbreviation: "AUS",
                score: 283,
                logoUrl: "" // Add empty logoUrl
              },
              status: "finished" as GameStatus,
              period: "Final",
              clock: "",
              venue: "Melbourne Cricket Ground",
              date: "2025-04-02",
              summary: "India won by 37 runs"
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching game history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameHistory();
  }, []);

  // Filter games based on search term
  const filteredGames = games.filter(game => 
    game.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full sports-gradient flex items-center justify-center text-white font-bold text-xl mr-3">
                SC
              </div>
              <h1 className="text-2xl font-bold">Game History</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-sports-blue" />
            <h2 className="text-xl font-semibold">Past Games</h2>
          </div>
          
          <div className="w-full md:w-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              className="pl-10 w-full md:w-60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-10 w-10 border-4 border-sports-blue border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {filteredGames.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No games found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try a different search term" : "Game history will appear here"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredGames.map(game => {
                  const GameIcon = getGameIcon(game.type);
                  return (
                    <div 
                      key={game.id} 
                      className="bg-card shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow"
                      onClick={() => navigate(`/game-details/${game.id}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GameIcon className="h-5 w-5 text-sports-blue" />
                          <span className="uppercase text-xs font-medium bg-secondary px-2 py-0.5 rounded">
                            {game.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {game.date}
                          </span>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded bg-secondary">
                          {game.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                              {game.homeTeam.abbreviation}
                            </div>
                            <span className="text-xs mt-1 block">{game.homeTeam.name}</span>
                          </div>
                          
                          <div className="text-2xl font-bold">
                            {game.homeTeam.score} - {game.awayTeam.score}
                          </div>
                          
                          <div className="text-center">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                              {game.awayTeam.abbreviation}
                            </div>
                            <span className="text-xs mt-1 block">{game.awayTeam.name}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          {game.venue}
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm">
                        {game.summary}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default GameHistory;
