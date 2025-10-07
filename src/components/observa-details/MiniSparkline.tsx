import React, { useState } from 'react';

interface MiniSparklineProps {
  data: number[];
  color?: string;
  height?: string;
  showTooltip?: boolean;
  unit?: string;
}

const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data,
  color = 'currentColor',
  height = 'h-12',
  showTooltip = true,
  unit = 'ms',
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return { x, y, value, index };
  });

  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const xPercent = (x / rect.width) * 100;

    let closestIndex = 0;
    let closestDistance = Infinity;
    points.forEach((point, index) => {
      const distance = Math.abs(point.x - xPercent);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setHoveredIndex(closestIndex);
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="relative">
      <svg
        className={`w-full ${height} cursor-crosshair`}
        preserveAspectRatio="none"
        style={{ color }}
        viewBox="0 0 100 100"
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Background area */}
        <polygon fill="currentColor" opacity="0.1" points={`0,100 ${polylinePoints} 100,100`} />

        {/* Main line */}
        <polyline
          fill="none"
          points={polylinePoints}
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        {/* Hover point */}
        {hoveredIndex !== null && (
          <>
            <line
              opacity="0.3"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1={points[hoveredIndex].x}
              x2={points[hoveredIndex].x}
              y1="0"
              y2="100"
            />
            <circle
              cx={points[hoveredIndex].x}
              cy={points[hoveredIndex].y}
              fill="currentColor"
              r="3"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}
      </svg>

      {/* Tooltip */}
      {showTooltip && hoveredIndex !== null && (
        <div
          className="absolute z-10 bg-gray-900 text-white text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y - 30}px`,
            transform: 'translateX(-50%)',
          }}
        >
          {data[hoveredIndex]} {unit}
        </div>
      )}
    </div>
  );
};

export default MiniSparkline;
