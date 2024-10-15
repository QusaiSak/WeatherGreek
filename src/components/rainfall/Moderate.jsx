import React, { useEffect, useRef } from 'react';

const ModerateRain = () => {
  const rainContainerRef = useRef(null);

  useEffect(() => {
    const rainContainer = rainContainerRef.current;
    if (!rainContainer) return;

    const createRaindrop = () => {
      const raindrop = document.createElement('div');
      raindrop.className = 'raindrop absolute bg-gradient-to-b from-white to-transparent opacity-50';
      raindrop.style.left = `${Math.random() * 100}vw`;
      raindrop.style.animationDuration = `${Math.random() * 0.5 + 0.7}s`;
      
      rainContainer.appendChild(raindrop);

      setTimeout(() => {
        createSplatter(raindrop.style.left);
        raindrop.remove();
      }, 700);
    };

    const createSplatter = (positionX) => {
      const splatter = document.createElement('div');
      splatter.className = 'splatter absolute bg-white rounded-full opacity-30';
      splatter.style.left = positionX;
      splatter.style.bottom = '-8px';

      rainContainer.appendChild(splatter);

      setTimeout(() => {
        splatter.remove();
      }, 400);
    };

    const rainInterval = setInterval(createRaindrop, 50); // Moderate frequency

    return () => clearInterval(rainInterval);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d0d0d]">
      <div ref={rainContainerRef} className="absolute inset-0 overflow-hidden">
        <style>
          {`
            .raindrop {
              width: 2px;
              height: 40px;
              animation: fall 1.2s linear infinite;
            }
            .splatter {
              width: 12px;
              height: 12px;
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
                opacity: 0.5;
              }
              100% {
                transform: scale(1.5);
                opacity: 0;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ModerateRain;