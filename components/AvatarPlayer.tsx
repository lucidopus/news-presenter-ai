import { useEffect, useRef, useState, useCallback } from 'react';
import { createClient, AnamClient, AnamEvent } from '@anam-ai/js-sdk';
import { Loader2, VideoOff, Power, RotateCcw } from 'lucide-react';

interface AvatarPlayerProps {
  script: string;
}

export function AvatarPlayer({ script }: AvatarPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoIdRef = useRef<string>('anam-video-player');
  const clientRef = useRef<AnamClient | null>(null);
  
  const [status, setStatus] = useState<'initializing' | 'ready' | 'speaking' | 'error' | 'stopped'>('initializing');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const init = useCallback(async () => {
    setStatus('initializing');
    setErrorMsg(null);
    let isMounted = true;
    let anamClient: AnamClient | null = null;

    try {
      const response = await fetch('/api/anam/session');
      if (!response.ok) throw new Error('Failed to get avatar session');
      const { sessionToken } = await response.json();

      if (!isMounted) return;

      anamClient = createClient(sessionToken, {
          disableInputAudio: true, 
      });
      
      clientRef.current = anamClient;

      // Wait for connection event BEFORE marking as ready
      anamClient.addListener(AnamEvent.CONNECTION_ESTABLISHED, () => {
           console.log("Anam connection established!");
           if (isMounted) setStatus('ready');
      });

      if (videoRef.current) {
           videoRef.current.id = videoIdRef.current;
           await anamClient.streamToVideoElement(videoIdRef.current);
      }

    } catch (err: unknown) {
      if (isMounted) {
        console.error("Avatar Init Error:", err);
        setStatus('error');
        const msg = err instanceof Error ? err.message : "Failed to connect to avatar";
        setErrorMsg(msg);
      }
    }
  }, []); // Empty dependency array for init as it depends on nothing dynamic

  useEffect(() => {
    init();

    return () => {
      if (clientRef.current) {
        console.log("Cleaning up avatar session...");
        clientRef.current.stopStreaming();
        clientRef.current = null;
      }
    };
  }, [init]);

  const endSession = useCallback(() => {
    if (clientRef.current) {
        clientRef.current.stopStreaming();
        setStatus('stopped');
    }
  }, []);

  // Speak when script changes
  useEffect(() => {
    if (status === 'ready' && script && clientRef.current) {
      const client = clientRef.current;
      
      const speak = async () => {
        try {
            console.log("Status is ready. Sending talk command...");
            setStatus('speaking');
            await client.talk(script);
        } catch (err) {
            console.error("Speech Error:", err);
        }
      };
      
      setTimeout(speak, 100); 
    }
  }, [status, script]);


  return (
    <div className="relative w-full h-full min-h-[400px] bg-black rounded-3xl overflow-hidden flex items-center justify-center group">
      {/* Video Element */}
      <video 
        ref={videoRef} 
        id={videoIdRef.current}
        autoPlay 
        playsInline 
        className="w-full h-full object-cover"
      />
      
      {/* Controls Overlay (Visible on Hover when active) */}
      {(status === 'ready' || status === 'speaking') && (
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
                onClick={endSession}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full text-sm font-medium backdrop-blur-sm transition-colors"
            >
                <Power className="w-4 h-4" />
                End Session
            </button>
        </div>
      )}

      {/* Overlays */}
      {status === 'initializing' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white z-10">
          <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
          <p>Connecting to AI Presenter...</p>
        </div>
      )}

      {status === 'stopped' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white z-10 backdrop-blur-sm">
          <p className="text-lg font-medium mb-6">Session Ended</p>
          <button 
            onClick={init}
            className="flex items-center gap-2 px-6 py-2 bg-white text-black hover:bg-gray-100 rounded-full font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Session
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white z-10 p-6 text-center">
           <VideoOff className="h-12 w-12 mb-4 text-destructive" />
           <p className="text-lg font-semibold">Avatar Unavailable</p>
           <p className="text-sm text-gray-400 mt-2 mb-6">{errorMsg}</p>
           <button 
             onClick={init}
             className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-colors"
           >
             Retry Connection
           </button>
        </div>
      )}
    </div>
  );
}
