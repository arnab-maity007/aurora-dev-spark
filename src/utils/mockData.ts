
import { 
  Basketball, 
  Football, 
  Swords, 
  GolfClub, 
  Trophy, 
  Timer, 
  Star, 
  Flag, 
  ArrowDown, 
  ArrowUp, 
  ArrowRight, 
  X, 
  BarChart3 
} from "lucide-react";

export type Team = {
  id: string;
  name: string;
  abbreviation: string;
  score: number;
  logoUrl: string; // In a real app, this would be an actual logo
};

export type GameType = "basketball" | "football" | "hockey" | "soccer";

export type GameStatus = "live" | "scheduled" | "finished";

export type Game = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  status: GameStatus;
  period: string;
  clock: string;
  type: GameType;
  venue: string;
};

export type CommentaryType = 
  | "play" // Regular play
  | "score" // Score change
  | "foul" // Foul
  | "timeout" // Timeout
  | "substitution" // Player substitution
  | "start-period" // Period start
  | "end-period" // Period end
  | "hype"; // Significant/exciting moment

export type Trend = "up" | "down" | "neutral";

export type CommentaryItem = {
  id: string;
  gameId: string;
  timestamp: string;
  type: CommentaryType;
  text: string;
  teamId?: string;
  icon?: any;
  trend?: Trend;
  stats?: {
    label: string;
    value: string | number;
    trend?: Trend;
  }[];
  isHype?: boolean;
};

// Simulated game data
export const mockGames: Game[] = [
  {
    id: "game1",
    homeTeam: {
      id: "team1",
      name: "Rockets",
      abbreviation: "HOU",
      score: 87,
      logoUrl: "https://placeholder.com/rockets.png",
    },
    awayTeam: {
      id: "team2",
      name: "Lakers",
      abbreviation: "LAL",
      score: 92,
      logoUrl: "https://placeholder.com/lakers.png",
    },
    status: "live",
    period: "4th",
    clock: "3:24",
    type: "basketball",
    venue: "Toyota Center",
  },
  {
    id: "game2",
    homeTeam: {
      id: "team3",
      name: "Patriots",
      abbreviation: "NE",
      score: 14,
      logoUrl: "https://placeholder.com/patriots.png",
    },
    awayTeam: {
      id: "team4",
      name: "Chiefs",
      abbreviation: "KC",
      score: 21,
      logoUrl: "https://placeholder.com/chiefs.png",
    },
    status: "live",
    period: "3rd",
    clock: "8:45",
    type: "football",
    venue: "Gillette Stadium",
  },
  {
    id: "game3",
    homeTeam: {
      id: "team5",
      name: "Sharks",
      abbreviation: "SJ",
      score: 2,
      logoUrl: "https://placeholder.com/sharks.png",
    },
    awayTeam: {
      id: "team6",
      name: "Penguins",
      abbreviation: "PIT",
      score: 2,
      logoUrl: "https://placeholder.com/penguins.png",
    },
    status: "live",
    period: "2nd",
    clock: "14:22",
    type: "hockey",
    venue: "SAP Center",
  },
  {
    id: "game4",
    homeTeam: {
      id: "team7",
      name: "Manchester City",
      abbreviation: "MCI",
      score: 1,
      logoUrl: "https://placeholder.com/mancity.png",
    },
    awayTeam: {
      id: "team8",
      name: "Liverpool",
      abbreviation: "LIV",
      score: 0,
      logoUrl: "https://placeholder.com/liverpool.png",
    },
    status: "live",
    period: "1st",
    clock: "32:15",
    type: "soccer",
    venue: "Etihad Stadium",
  },
];

// Mock commentary data generators
const basketballCommentaries: string[] = [
  "{player} drives to the basket for a layup!",
  "{player} hits a three-pointer from deep!",
  "{player} with the slam dunk!",
  "{player} draws the foul and will shoot free throws",
  "{player} with a beautiful assist to {player2}",
  "Shot clock violation on {team}",
  "{player} steals the ball!",
  "{player} blocks the shot!",
  "{player} gets the offensive rebound",
  "{team} calls a timeout",
  "{player} checks into the game for {player2}",
];

const footballCommentaries: string[] = [
  "{player} completes a pass to {player2} for {yards} yards",
  "{player} rushes for {yards} yards",
  "{player} sacked for a loss of {yards} yards",
  "{player} intercepts the pass!",
  "{player} recovers the fumble!",
  "{team} calls a timeout",
  "{player} punts for {yards} yards",
  "{player} catches the ball for a touchdown!",
  "Incomplete pass intended for {player}",
  "Penalty on {team}, {penalty}, {yards} yards",
];

const hypeCommentaries: string[] = [
  "INCREDIBLE PLAY by {player}! The crowd is going wild!",
  "WHAT A MOMENT! {player} with an unbelievable {action}!",
  "GAME-CHANGING PLAY! {player} just turned this game around!",
  "SPECTACULAR EFFORT by {player}! That's one for the highlight reel!",
  "CLUTCH PERFORMANCE! {player} delivers when it matters most!",
];

// Helper functions for generating mock data
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomPlayer = (): string => {
  const players = [
    "James", "Davis", "Curry", "Durant", "Antetokounmpo", 
    "Doncic", "Jokic", "Embiid", "Harden", "Williamson",
    "Mahomes", "Brady", "Rodgers", "Kelce", "Donald",
    "Watt", "Jackson", "Wilson", "McCaffrey", "Bosa"
  ];
  return getRandomElement(players);
};

const replaceTemplates = (text: string): string => {
  let result = text;
  if (result.includes("{player}")) {
    result = result.replace("{player}", getRandomPlayer());
  }
  if (result.includes("{player2}")) {
    result = result.replace("{player2}", getRandomPlayer());
  }
  if (result.includes("{team}")) {
    const teams = ["Rockets", "Lakers", "Patriots", "Chiefs", "Sharks", "Penguins"];
    result = result.replace("{team}", getRandomElement(teams));
  }
  if (result.includes("{yards}")) {
    result = result.replace("{yards}", String(Math.floor(Math.random() * 30) + 1));
  }
  if (result.includes("{penalty}")) {
    const penalties = ["Holding", "Pass Interference", "False Start", "Offsides", "Illegal Formation"];
    result = result.replace("{penalty}", getRandomElement(penalties));
  }
  if (result.includes("{action}")) {
    const actions = ["dunk", "three-pointer", "pass", "interception", "block", "tackle", "save"];
    result = result.replace("{action}", getRandomElement(actions));
  }
  return result;
};

const generateCommentaryText = (game: Game, type: CommentaryType): string => {
  if (type === "hype") {
    return replaceTemplates(getRandomElement(hypeCommentaries));
  }
  
  if (game.type === "basketball") {
    return replaceTemplates(getRandomElement(basketballCommentaries));
  } else if (game.type === "football") {
    return replaceTemplates(getRandomElement(footballCommentaries));
  }
  
  // Default generic commentary
  return replaceTemplates("{player} makes a great play for {team}");
};

const getCommentaryIcon = (type: CommentaryType): any => {
  switch (type) {
    case "play": return ArrowRight;
    case "score": return Star;
    case "foul": return X;
    case "timeout": return Timer;
    case "substitution": return ArrowRight;
    case "start-period": return Flag;
    case "end-period": return Flag;
    case "hype": return Trophy;
    default: return ArrowRight;
  }
};

const getTrendIcon = (trend: Trend): any => {
  switch (trend) {
    case "up": return ArrowUp;
    case "down": return ArrowDown;
    case "neutral": return ArrowRight;
    default: return ArrowRight;
  }
};

export const generateRandomCommentary = (game: Game): CommentaryItem => {
  const now = new Date();
  const types: CommentaryType[] = ["play", "score", "foul", "timeout", "substitution", "hype"];
  const isHype = Math.random() < 0.15; // 15% chance for a hype moment
  
  const type = isHype ? "hype" : getRandomElement(types);
  const trend = getRandomElement<Trend>(["up", "down", "neutral"]);
  
  const stats = type === "score" || isHype ? [
    {
      label: "Possession",
      value: Math.random() > 0.5 ? game.homeTeam.name : game.awayTeam.name,
      trend: getRandomElement<Trend>(["up", "down", "neutral"])
    },
    {
      label: "Shooting %",
      value: `${Math.floor(Math.random() * 20) + 40}%`,
      trend: getRandomElement<Trend>(["up", "down", "neutral"])
    },
    {
      label: isHype ? "Excitement Level" : "Momentum",
      value: isHype ? "HIGH" : Math.random() > 0.5 ? "Increasing" : "Steady",
      trend: isHype ? "up" : getRandomElement<Trend>(["up", "neutral"])
    }
  ] : undefined;

  return {
    id: `comment-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    gameId: game.id,
    timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type,
    text: generateCommentaryText(game, type),
    teamId: Math.random() > 0.5 ? game.homeTeam.id : game.awayTeam.id,
    icon: getCommentaryIcon(type),
    trend,
    stats,
    isHype
  };
};

export const getGameIcon = (type: GameType) => {
  switch (type) {
    case "basketball": return Basketball;
    case "football": return Football;
    case "hockey": return Swords;
    case "soccer": return GolfClub;
    default: return Basketball;
  }
};

// Generate initial commentary items for each game
export const generateInitialCommentary = (games: Game[]): CommentaryItem[] => {
  const commentary: CommentaryItem[] = [];
  
  games.forEach(game => {
    // Add period start commentary
    commentary.push({
      id: `comment-start-${game.id}`,
      gameId: game.id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "start-period",
      text: `${game.period} period begins at ${game.venue}`,
      icon: Flag
    });
    
    // Add 5-10 random commentary items per game
    const numItems = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < numItems; i++) {
      commentary.push(generateRandomCommentary(game));
    }
  });
  
  // Sort by most recent first (in a real app this would be timestamp-based)
  return commentary.sort(() => Math.random() - 0.5);
};
