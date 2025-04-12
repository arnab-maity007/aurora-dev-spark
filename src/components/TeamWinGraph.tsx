
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";

interface TeamData {
  id: string;
  name: string;
  logo: string;
  color: string;
  winPercentages: { date: string; value: number }[];
}

interface TeamWinGraphProps {
  teams: TeamData[];
}

const TeamWinGraph: React.FC<TeamWinGraphProps> = ({ teams }) => {
  // Process data for the chart
  const processDataForChart = () => {
    // Find all unique dates across all teams
    const allDates = new Set<string>();
    teams.forEach(team => {
      team.winPercentages.forEach(wp => {
        allDates.add(wp.date);
      });
    });

    // Sort dates chronologically
    const sortedDates = Array.from(allDates).sort();

    // Create data points for each date
    return sortedDates.map(date => {
      const dataPoint: any = { date };
      
      teams.forEach(team => {
        const winData = team.winPercentages.find(wp => wp.date === date);
        dataPoint[team.id] = winData ? winData.value : null;
      });
      
      return dataPoint;
    });
  };

  const chartData = processDataForChart();
  
  // Create chart config for tooltips and legends
  const chartConfig = teams.reduce((config, team) => {
    return {
      ...config,
      [team.id]: {
        label: team.name,
        color: team.color
      }
    };
  }, {});

  return (
    <div className="bg-card shadow-md rounded-lg p-4 mb-6">
      <h2 className="font-semibold text-lg mb-3">Team Win Percentages</h2>
      
      <div className="flex flex-wrap gap-3 mb-4">
        {teams.map(team => (
          <div key={team.id} className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {team.logo ? (
                <img src={team.logo} alt={team.name} className="h-6 w-6 object-contain" />
              ) : (
                <span className="text-xs font-bold">{team.name.substring(0, 2)}</span>
              )}
            </div>
            <span style={{ color: team.color }} className="font-medium">{team.name}</span>
          </div>
        ))}
      </div>
      
      <div className="h-[300px] w-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: "#6B7280" }}
                axisLine={{ stroke: "#374151" }}
              />
              <YAxis 
                tick={{ fill: "#6B7280" }}
                axisLine={{ stroke: "#374151" }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              
              {teams.map(team => (
                <Line
                  key={team.id}
                  type="monotone"
                  dataKey={team.id}
                  stroke={team.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default TeamWinGraph;
