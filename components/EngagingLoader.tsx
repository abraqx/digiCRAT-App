import React, { useState, useEffect } from 'react';
import { legalTrivia } from '../constants';

const EngagingLoader: React.FC = () => {
  const [triviaIndex, setTriviaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTriviaIndex((prevIndex) => (prevIndex + 1) % legalTrivia.length);
    }, 4000); // Change trivia every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-10 text-center">
      <style>
        {`
          @keyframes sway {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
          }
          .animate-sway {
            animation: sway 2s ease-in-out infinite;
          }
        `}
      </style>
      <svg className="w-16 h-16 text-blue-500 mb-6 animate-sway" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
        <line x1="12" y1="22" x2="12" y2="12"></line>
        <path d="M5.5 10L2 12l3.5 2"></path>
        <path d="M18.5 10l3.5 2-3.5 2"></path>
      </svg>
      <h3 className="text-xl font-semibold text-slate-700 mb-2">Finding the right advocate for you...</h3>
      <p className="text-slate-500 max-w-md transition-opacity duration-500">
        <strong>Did you know?</strong> {legalTrivia[triviaIndex]}
      </p>
    </div>
  );
};

export default EngagingLoader;