
import { CircleDot, Dumbbell, Award, Trophy } from "lucide-react";

// Define your sports types and corresponding icons
export const sportTypes = {
  cricket: {
    name: "Cricket",
    icon: CircleDot, // Using CircleDot as cricket icon placeholder
    color: "#1d9bf0"
  },
  football: {
    name: "Football",
    icon: Trophy, // Using Trophy as football icon placeholder
    color: "#ff5500"
  },
  hockey: {
    name: "Hockey",
    icon: Award, // Using Award as hockey icon placeholder
    color: "#00cc99"
  },
  basketball: {
    name: "Basketball",
    icon: Dumbbell, // Using Dumbbell as basketball icon placeholder
    color: "#ff2d55"
  }
};

// Win percentage sample data for the graph
export const teamWinData = [
  {
    id: "team1",
    name: "Lakers",
    logo: "",
    color: "#552583",
    winPercentages: [
      { date: "Jan", value: 65 },
      { date: "Feb", value: 70 },
      { date: "Mar", value: 60 },
      { date: "Apr", value: 75 }
    ]
  },
  {
    id: "team2",
    name: "Warriors",
    logo: "",
    color: "#1D428A",
    winPercentages: [
      { date: "Jan", value: 55 },
      { date: "Feb", value: 65 },
      { date: "Mar", value: 75 },
      { date: "Apr", value: 70 }
    ]
  },
  {
    id: "team3",
    name: "Heat",
    logo: "",
    color: "#98002E",
    winPercentages: [
      { date: "Jan", value: 50 },
      { date: "Feb", value: 45 },
      { date: "Mar", value: 65 },
      { date: "Apr", value: 60 }
    ]
  }
];

// Helper function to get a random team win percentage data
export const getRandomTeamData = () => {
  const randomIndex = Math.floor(Math.random() * teamWinData.length);
  return teamWinData[randomIndex];
};
