// "use client";
// import React, { use, useEffect, useState } from 'react';

// const PetalRain = ({ duration = 8000 }) => {
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(false);
//     }, duration);

//     return () => clearTimeout(timer);
//   }, [duration]);

//   if (!isVisible) return null;

//   // Generate petals with random properties
//   const petals = Array.from({ length: 40 }, (_, i) => ({
//     id: i,
//     left: Math.random() * 100,
//     animationDuration: 3 + Math.random() * 4,
//     animationDelay: Math.random() * 2,
//     size: 15 + Math.random() * 15,
//     rotation: Math.random() * 360,
//     swayDistance: 30 + Math.random() * 40,
//     // Pink color variations matching your brand
//     color: [
//       '#FF69B4', // Hot pink
//       '#FF85C1', // Light pink
//       '#FF4D94', // Deep pink
//       '#FFA5C8', // Soft pink
//       '#E8518D', // Brand pink
//     ][Math.floor(Math.random() * 5)],
//   }));

//   return (
//     <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
//       {petals.map((petal) => (
//         <div
//           key={petal.id}
//           className="absolute animate-fall"
//           style={{
//             left: `${petal.left}%`,
//             animationDuration: `${petal.animationDuration}s`,
//             animationDelay: `${petal.animationDelay}s`,
//             ['--sway-distance' as any]: `${petal.swayDistance}px`,
//           }}
//         >
//           <svg
//             width={petal.size}
//             height={petal.size}
//             viewBox="0 0 24 24"
//             style={{
//               animation: `spin ${petal.animationDuration * 1.5}s linear infinite`,
//             }}
//           >
//             {/* Rose petal shape */}
//             <path
//               d="M12 2C12 2 8 4 6 8C4 12 4 16 6 18C8 20 12 22 12 22C12 22 16 20 18 18C20 16 20 12 18 8C16 4 12 2 12 2Z"
//               fill={petal.color}
//               opacity="0.8"
//             />
//             {/* Petal vein detail */}
//             <path
//               d="M12 4C12 4 10 6 10 10C10 14 12 20 12 20"
//               stroke={petal.color}
//               strokeWidth="0.5"
//               fill="none"
//               opacity="0.4"
//             />
//           </svg>
//         </div>
//       ))}

//       <style jsx>{`
//         @keyframes fall {
//           0% {
//             transform: translateY(-100px) translateX(0);
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.8;
//           }
//           100% {
//             transform: translateY(100vh) translateX(var(--sway-distance));
//             opacity: 0;
//           }
//         }

//         @keyframes spin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .animate-fall {
//           animation: fall linear forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PetalRain;

"use client";

import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  swayDistance: number;
  color: string;
};

const COLORS = [
  "#FF69B4",
  "#FF85C1",
  "#FF4D94",
  "#FFA5C8",
  "#E8518D",
];

interface PetalRainProps {
  duration?: number;
  count?: number;
}

export default function PetalRain({
  duration = 8000,
  count = 36,
}: PetalRainProps) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [visible, setVisible] = useState(false);

  // ✅ Client-only generation (hydration safe)
  useEffect(() => {
    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 4 + Math.random() * 3,
      animationDelay: Math.random() * 1.5,
      size: 14 + Math.random() * 12,
      swayDistance: 20 + Math.random() * 30,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    setPetals(generated);
    setVisible(true);

    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration, count]);

  if (!visible || petals.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[60] overflow-hidden"
      aria-hidden
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.animationDelay}s`,
            ["--sway" as any]: `${petal.swayDistance}px`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            className="animate-petal-spin"
          >
            <path
              d="M12 2C12 2 8 4 6 8C4 12 4 16 6 18C8 20 12 22 12 22C12 22 16 20 18 18C20 16 20 12 18 8C16 4 12 2 12 2Z"
              fill={petal.color}
              opacity="0.85"
            />
            <path
              d="M12 4C12 4 10 6 10 10C10 14 12 20 12 20"
              stroke={petal.color}
              strokeWidth="0.5"
              fill="none"
              opacity="0.35"
            />
          </svg>
        </div>
      ))}

      {/* Scoped styles (no global pollution) */}
      <style jsx>{`
        @keyframes petal-fall {
          0% {
            transform: translateY(-120px) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(var(--sway));
            opacity: 0;
          }
        }

        @keyframes petal-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-petal-fall {
          animation-name: petal-fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        .animate-petal-spin {
          animation: petal-spin 6s linear infinite;
        }
      `}</style>
    </div>
  );
}
