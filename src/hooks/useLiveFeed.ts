
import { useState, useEffect, useCallback } from "react";
import { 
  Game, 
  CommentaryItem, 
  mockGames, 
  generateRandomCommentary, 
  generateInitialCommentary,
  GameType
} from "@/utils/mockData";
import { toast } from "sonner";
import { sportTypes } from "@/utils/sportData";

const COMMENTARY_UPDATE_INTERVAL = 3000; // 3 seconds
const SCORE_UPDATE_INTERVAL = 15000; // 15 seconds

export function useLiveFeed() {
  // Update sport types in mockGames
  const updatedGames = mockGames.map(game => {
    // Randomly assign one of our supported sports to each game
    const sportKeys = Object.keys(sportTypes);
    const randomSportKey = sportKeys[Math.floor(Math.random() * sportKeys.length)];
    // Ensure we're assigning a valid GameType
    const randomSport = randomSportKey as GameType;
    return {
      ...game,
      type: randomSport
    };
  });

  const [games, setGames] = useState<Game[]>(updatedGames);
  const [selectedGameId, setSelectedGameId] = useState<string>(updatedGames[0]?.id || "");
  const [commentary, setCommentary] = useState<CommentaryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with mock data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API loading
    const timer = setTimeout(() => {
      const initialCommentary = generateInitialCommentary(games);
      setCommentary(initialCommentary);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time commentary updates
  useEffect(() => {
    if (isLoading) return;

    const commentaryInterval = setInterval(() => {
      // Add commentary to a random game or the selected game
      const gameToUpdate = selectedGameId 
        ? games.find(g => g.id === selectedGameId)
        : games[Math.floor(Math.random() * games.length)];
        
      if (gameToUpdate) {
        const newCommentary = generateRandomCommentary(gameToUpdate);
        
        setCommentary(prev => [newCommentary, ...prev]);
        
        // Show toast notification for hype moments
        if (newCommentary.isHype) {
          toast(`🔥 HYPE MOMENT: ${gameToUpdate.homeTeam.name} vs ${gameToUpdate.awayTeam.name}`, {
            description: newCommentary.text,
            duration: 5000,
          });
        }
      }
    }, COMMENTARY_UPDATE_INTERVAL);

    return () => clearInterval(commentaryInterval);
  }, [games, selectedGameId, isLoading]);

  // Simulate score updates
  useEffect(() => {
    if (isLoading) return;

    const scoreInterval = setInterval(() => {
      setGames(prev => prev.map(game => {
        if (game.status !== "live") return game;
        
        // 30% chance to update the score
        if (Math.random() < 0.3) {
          const homeScoreChange = Math.random() < 0.5 ? Math.floor(Math.random() * 3) + 1 : 0;
          const awayScoreChange = Math.random() < 0.5 ? Math.floor(Math.random() * 3) + 1 : 0;
          
          // Only create a new commentary for score changes
          if (homeScoreChange > 0 || awayScoreChange > 0) {
            const scoringTeam = homeScoreChange > 0 ? game.homeTeam : game.awayTeam;
            const scoreText = `${scoringTeam.name} scores! The score is now ${game.homeTeam.name} ${game.homeTeam.score + homeScoreChange} - ${game.awayTeam.score + awayScoreChange} ${game.awayTeam.name}`;
            
            const scoreCommentary: CommentaryItem = {
              id: `score-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              gameId: game.id,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              type: "score",
              text: scoreText,
              teamId: homeScoreChange > 0 ? game.homeTeam.id : game.awayTeam.id,
              icon: homeScoreChange > 0 ? game.homeTeam.name.charAt(0) : game.awayTeam.name.charAt(0),
              trend: "up",
              stats: [
                {
                  label: "Score",
                  value: `${game.homeTeam.score + homeScoreChange} - ${game.awayTeam.score + awayScoreChange}`,
                  trend: "up"
                }
              ]
            };
            
            setCommentary(prev => [scoreCommentary, ...prev]);
          }
          
          return {
            ...game,
            homeTeam: {
              ...game.homeTeam,
              score: game.homeTeam.score + homeScoreChange
            },
            awayTeam: {
              ...game.awayTeam,
              score: game.awayTeam.score + awayScoreChange
            }
          };
        }
        
        return game;
      }));
    }, SCORE_UPDATE_INTERVAL);

    return () => clearInterval(scoreInterval);
  }, [isLoading]);

  // Filter commentary by selected game
  const filteredCommentary = selectedGameId
    ? commentary.filter(item => item.gameId === selectedGameId)
    : commentary;

  const selectGame = useCallback((gameId: string) => {
    setSelectedGameId(gameId);
  }, []);

  const selectedGame = games.find(game => game.id === selectedGameId);

  return {
    games,
    selectedGame,
    selectedGameId,
    selectGame,
    commentary: filteredCommentary,
    isLoading
  };
}
