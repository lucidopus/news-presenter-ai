import { useEffect, useRef, useState, useCallback } from 'react';
import { createClient, AnamClient, AnamEvent } from '@anam-ai/js-sdk';
import { Loader2, VideoOff } from 'lucide-react';

interface AvatarPlayerProps {
  script: string;
}

export function AvatarPlayer({ script }: AvatarPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoIdRef = useRef<string>('anam-video-player');
  const clientRef = useRef<AnamClient | null>(null);
  
  const [status, setStatus] = useState<'initializing' | 'ready' | 'speaking' | 'error'>('initializing');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let anamClient: AnamClient | null = null;

    const init = async () => {
      setStatus('initializing');
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
    };

    init();

    return () => {
      isMounted = false;
      if (clientRef.current) {
        console.log("Cleaning up avatar session...");
        clientRef.current.stopStreaming();
        clientRef.current = null;
      }
    };
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
            // If peer connection is null here, it means the event fired prematurely or state drifted
            // But with the event listener, this should be safe.
        }
      };
      
      // Still keep a tiny safety buffer or just call it directly
      // execution stack clear to ensures even if event fires synchronously (?)
      setTimeout(speak, 100); 
    }
  }, [status, script]);


  return (
    <div className="relative w-full h-full min-h-[400px] bg-black rounded-3xl overflow-hidden flex items-center justify-center">
      {/* Video Element */}
      <video 
        ref={videoRef} 
        id={videoIdRef.current}
        autoPlay 
        playsInline 
        className="w-full h-full object-cover"
      />

      {/* Overlays */}
      {status === 'initializing' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white z-10">
          <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
          <p>Connecting to AI Presenter...</p>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white z-10 p-6 text-center">
           <VideoOff className="h-12 w-12 mb-4 text-destructive" />
           <p className="text-lg font-semibold">Avatar Unavailable</p>
           <p className="text-sm text-gray-400 mt-2 mb-6">{errorMsg}</p>
           <button 
             onClick={() => window.location.reload()}
             className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-colors"
           >
             Retry Connection
           </button>
        </div>
      )}
    </div>
  );
}
