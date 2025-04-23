import { useState, useCallback, useEffect } from 'react';

interface TextScrambleOptions {
  initialText: string;
  finalText: string;
  speed?: number; // milliseconds per character
  charSet?: string;
}

export default function useTextScramble({
  initialText,
  finalText,
  speed = 50,
  charSet = '@#$%^&*()_+{}:"<>?~'
}: TextScrambleOptions) {
  const [scrambledText, setScrambledText] = useState(initialText);
  const [isScrambling, setIsScrambling] = useState(false);

  const getRandomChar = () => {
    return charSet[Math.floor(Math.random() * charSet.length)];
  };

  const startScramble = useCallback(() => {
    setIsScrambling(true);
  }, []);

  useEffect(() => {
    if (!isScrambling) return;

    let iteration = 0;
    const maxIterations = 10; // How many iterations for each character
    const finalLength = finalText.length;
    let timeout: NodeJS.Timeout;

    const updateText = () => {
      // Build the new text
      let newText = '';
      
      for (let i = 0; i < finalLength; i++) {
        // The further along in iterations we are, the more likely we'll show the final character
        const finalChar = finalText[i] || '';
        
        // If we've passed the threshold for this char, show the final char, otherwise random
        if (i < iteration / maxIterations) {
          newText += finalChar;
        } else {
          newText += getRandomChar();
        }
      }
      
      setScrambledText(newText);
      
      // Keep updating until we've gone through all iterations for all chars
      if (iteration < maxIterations * finalLength) {
        iteration++;
        timeout = setTimeout(updateText, speed);
      } else {
        setIsScrambling(false);
        setScrambledText(finalText);
      }
    };

    // Start the scrambling
    timeout = setTimeout(updateText, speed);

    // Cleanup
    return () => clearTimeout(timeout);
  }, [isScrambling, finalText, speed]);

  return {
    scrambledText,
    isScrambling,
    startScramble
  };
}
