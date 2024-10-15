import React, { useEffect, useRef, useState } from 'react';

const HeavyRainThunderstorm = () => {
  const rainContainerRef = useRef(null);
  const [isLightning, setIsLightning] = useState(false);

  useEffect(() => {
    const rainContainer = rainContainerRef.current;
    if (!rainContainer) return;

    const createRaindrop = () => {
      const raindrop = document.createElement('div');
      raindrop.className = 'raindrop absolute bg-gradient-to-b from-white to-transparent opacity-70';
      raindrop.style.left = `${Math.random() * 100}vw`;
      raindrop.style.animationDuration = `${Math.random() * 0.2 + 0.4}s`;
      
      rainContainer.appendChild(raindrop);

      setTimeout(() => {
        createSplatter(raindrop.style.left);
        raindrop.remove();
      }, 500);
    };

    const createSplatter = (positionX) => {
      const splatter = document.createElement('div');
      splatter.className = 'splatter absolute bg-white rounded-full opacity-40';
      splatter.style.left = positionX;
      splatter.style.bottom = '-8px';

      rainContainer.appendChild(splatter);

      setTimeout(() => {
        splatter.remove();
      }, 400);
    };

    const rainInterval = setInterval(createRaindrop, 5);

    return () => clearInterval(rainInterval);
  }, []);

  useEffect(() => {
    const triggerLightning = () => {
      setIsLightning(true);
      const flashDuration = Math.random() * 4000 + 1000;
      setTimeout(() => setIsLightning(false), flashDuration);

      const nextFlashInterval = Math.random() * 2000 + 5000;
      setTimeout(triggerLightning, nextFlashInterval);
    };

    triggerLightning();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d0d0d]">
      <div ref={rainContainerRef} className="absolute inset-0 overflow-hidden">
        <style>
          {`
            .raindrop {
              width: 3px;
              height: 50px;
              animation: fall 0.5s linear infinite;
            }
            .splatter {
              width: 15px;
              height: 15px;
              animation: splatter 0.4s ease-out forwards;
            }
            @keyframes fall {
              to {
                transform: translateY(100vh);
              }
            }
            @keyframes splatter {
              0% {
                transform: scale(0);
                opacity: 0.6;
              }
              100% {
                transform: scale(2);
                opacity: 0;
              }
            }
          `}
        </style>
      </div>
      <div 
        className={`absolute inset-0 bg-white transition-opacity duration-1000 ease-in-out ${
          isLightning ? 'opacity-20' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default HeavyRainThunderstorm;