
import React, { useRef, useEffect } from "react";
import { MessageSquare, RefreshCw } from "lucide-react";
import { CommentaryItem as CommentaryItemType } from "@/utils/mockData";
import CommentaryItem from "./CommentaryItem";
import HypeMoment from "./HypeMoment";
import { cn } from "@/lib/utils";

interface LiveFeedProps {
  commentaryItems: CommentaryItemType[];
  isLoading?: boolean;
}

const LiveFeed: React.FC<LiveFeedProps> = ({ 
  commentaryItems, 
  isLoading = false 
}) => {
  const feedRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new commentary is added
  useEffect(() => {
    if (feedRef.current && !isLoading) {
      feedRef.current.scrollTop = 0;
    }
  }, [commentaryItems, isLoading]);

  if (isLoading) {
    return (
      <div className="bg-card shadow-md rounded-lg p-4 h-[60vh] overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center space-y-3">
            <RefreshCw className="h-8 w-8 text-sports-blue animate-spin" />
            <p className="text-muted-foreground">Loading commentary feed...</p>
          </div>
        </div>
      </div>
    );
  }

  if (commentaryItems.length === 0) {
    return (
      <div className="bg-card shadow-md rounded-lg p-4 h-[60vh] overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center space-y-3">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground">No commentary available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card shadow-md rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-sports-blue" />
          <h2 className="font-bold text-lg">Live Commentary</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className={cn("flex items-center space-x-1 text-xs px-2 py-1 rounded-full bg-sports-blue/10 text-sports-blue")}>
            <span className="h-2 w-2 rounded-full bg-sports-blue animate-pulse"></span>
            <span>LIVE</span>
          </span>
        </div>
      </div>
      
      <div 
        ref={feedRef}
        className="h-[60vh] overflow-y-auto pr-2 custom-scrollbar"
      >
        {commentaryItems.map((item) => (
          item.isHype 
            ? <HypeMoment key={item.id} item={item} />
            : <CommentaryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;
