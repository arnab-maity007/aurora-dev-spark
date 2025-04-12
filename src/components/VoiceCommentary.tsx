
import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentaryItem } from "@/utils/mockData";

interface VoiceCommentaryProps {
  commentary: CommentaryItem[];
  isEnabled: boolean;
  onToggle: () => void;
}

const VoiceCommentary: React.FC<VoiceCommentaryProps> = ({ 
  commentary, 
  isEnabled, 
  onToggle 
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const lastSpokenTextRef = useRef("");
  const synth = window.speechSynthesis;
  
  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (synth) {
        synth.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (!isEnabled || commentary.length === 0) {
      if (synth) {
        synth.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    // Get latest commentary
    const latestCommentary = commentary[0];
    
    // Avoid repeating the same text
    if (latestCommentary.text === lastSpokenTextRef.current) {
      return;
    }
    
    // Update last spoken text
    lastSpokenTextRef.current = latestCommentary.text;
    
    // Speak the text
    const utterance = new SpeechSynthesisUtterance(latestCommentary.text);
    
    // Configure voice settings
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Get available voices and try to set a good one
    const voices = synth.getVoices();
    if (voices.length > 0) {
      // Try to find a good English voice
      const englishVoice = voices.find(voice => 
        voice.lang.includes('en') && voice.name.includes('Male')
      );
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }
    
    // Events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // If there's already speech in progress, cancel it
    synth.cancel();
    
    // Start speaking
    synth.speak(utterance);
  }, [commentary, isEnabled]);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className={`${isEnabled ? 'bg-sports-blue/10 text-sports-blue' : ''}`}
        onClick={onToggle}
      >
        {isEnabled ? (
          <>
            <Volume2 className={`h-4 w-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
            <span className="ml-1">Voice On</span>
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4" />
            <span className="ml-1">Voice Off</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default VoiceCommentary;
