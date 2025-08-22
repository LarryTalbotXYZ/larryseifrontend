'use client';

import { useState, useRef, useCallback } from 'react';

interface VideoLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function VideoLogo({ size = 'medium', className = '' }: VideoLogoProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const handleClick = useCallback(() => {
    if (!showVideo) {
      setShowVideo(true);
    } else {
      // If video is already showing, open in new tab
      window.open('https://youtu.be/DVOqgsEgGEI?t=140', '_blank');
    }
  }, [showVideo]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    if (!showVideo) {
      setShowVideo(true);
    }
  }, [showVideo]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleIframeLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  // Create the wolf SVG as a better fallback
  const WolfIcon = () => (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-300"
    >
      {/* Wolf ears - pointed */}
      <path d="M8 6 L12 4 L14 10 L10 12 Z" fill="currentColor"/>
      <path d="M24 6 L20 4 L18 10 L22 12 Z" fill="currentColor"/>
      
      {/* Inner ears */}
      <path d="M9 7 L11 6 L12 9 L10 10 Z" fill="#4B5563"/>
      <path d="M23 7 L21 6 L20 9 L22 10 Z" fill="#4B5563"/>
      
      {/* Wolf head - more angular */}
      <ellipse cx="16" cy="16" rx="9" ry="8" fill="currentColor"/>
      
      {/* Snout - elongated */}
      <ellipse cx="16" cy="20" rx="4" ry="3" fill="currentColor"/>
      
      {/* Eyes - more intense */}
      <circle cx="12" cy="14" r="1.5" fill="#FCD34D"/>
      <circle cx="20" cy="14" r="1.5" fill="#FCD34D"/>
      
      {/* Eye pupils */}
      <circle cx="12" cy="14" r="0.8" fill="#000000"/>
      <circle cx="20" cy="14" r="0.8" fill="#000000"/>
      
      {/* Eye highlights */}
      <circle cx="12.3" cy="13.7" r="0.3" fill="#FFFFFF"/>
      <circle cx="20.3" cy="13.7" r="0.3" fill="#FFFFFF"/>
      
      {/* Nose */}
      <ellipse cx="16" cy="19" rx="1" ry="0.8" fill="#000000"/>
      
      {/* Mouth line */}
      <path d="M16 20 L14 22 M16 20 L18 22" stroke="#000000" strokeWidth="1" strokeLinecap="round"/>
      
      {/* Wolf markings */}
      <path d="M12 18 Q16 16 20 18" stroke="#374151" strokeWidth="0.5" fill="none"/>
      <path d="M10 15 Q16 13 22 15" stroke="#374151" strokeWidth="0.5" fill="none"/>
    </svg>
  );

  return (
    <div 
      className={`${sizeClasses[size]} rounded-lg flex items-center justify-center relative overflow-hidden border border-red-500/30 cursor-pointer group ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title="Click to watch the wolf video"
    >
      {showVideo ? (
        <>
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/DVOqgsEgGEI?start=140&autoplay=1&mute=1&controls=0&loop=1&playlist=DVOqgsEgGEI&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&enablejsapi=1&origin=window.location.origin"
            title="Wolf Logo Video"
            className={`w-full h-full rounded-lg transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={handleIframeLoad}
            style={{
              border: 'none',
              transform: 'scale(2.5)',
              transformOrigin: 'center center'
            }}
          />
          {/* Show fallback while video is loading */}
          {!videoLoaded && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6">
                <WolfIcon />
              </div>
            </div>
          )}
        </>
      ) : (
        // Static wolf logo when video is not loaded
        <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="w-6 h-6 text-white">
            <WolfIcon />
          </div>
          {/* Play button indicator on hover */}
          {isHovering && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-4 h-4 bg-white/90 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[3px] border-l-black border-y-[2px] border-y-transparent ml-0.5"></div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
    </div>
  );
}