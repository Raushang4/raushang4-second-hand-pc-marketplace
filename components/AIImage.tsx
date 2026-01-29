
import React, { useState, useEffect } from 'react';
import { generateProductImage } from '../services/aiService';

interface AIImageProps {
  src?: string;
  alt: string;
  category: string;
  className?: string;
}

const AIImage: React.FC<AIImageProps> = ({ src, alt, category, className }) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [isGenerating, setIsGenerating] = useState<boolean>(!src);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const initImage = async () => {
      if (!src) {
        setIsGenerating(true);
        try {
          const generated = await generateProductImage(alt, category);
          if (isMounted) setCurrentSrc(generated);
        } catch (err) {
          console.error("AI Image component failed:", err);
          if (isMounted) setError(true);
        } finally {
          if (isMounted) setIsGenerating(false);
        }
      } else {
        if (isMounted) {
          setCurrentSrc(src);
          setIsGenerating(false);
        }
      }
    };

    initImage();

    return () => { isMounted = false; };
  }, [src, alt, category]);

  if (isGenerating) {
    return (
      <div className={`flex flex-col items-center justify-center bg-black/40 shimmer border border-white/5 ${className}`}>
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em] animate-pulse">
          Synthesizing Visuals...
        </span>
      </div>
    );
  }

  if (error && !currentSrc) {
    return (
      <div className={`flex flex-col items-center justify-center bg-red-500/5 border border-red-500/20 ${className}`}>
        <svg className="w-8 h-8 text-red-500/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-[8px] font-bold text-red-500/60 uppercase">Image Unavailable</span>
      </div>
    );
  }

  return (
    <img 
      src={currentSrc} 
      alt={alt} 
      className={`${className} transition-opacity duration-1000 ${isGenerating ? 'opacity-0' : 'opacity-100'}`} 
    />
  );
};

export default AIImage;
