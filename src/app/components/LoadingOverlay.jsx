"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext(null);

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({});

  const showLoading = useCallback((opts = {}) => {
    setOptions(opts);
    setLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(false);
    setOptions({});
  }, []);

  return (
    <LoadingContext.Provider
      value={{ loading, showLoading, hideLoading, options }}
    >
      {children}
      {loading && <LoadingOverlay {...options} />}
    </LoadingContext.Provider>
  );
};

const LoadingOverlay = ({
  size = 220,
  accentColor = "#f59e0b",
  logoColor = "#0f172a",
  logoPath = null,
}) => {
  // size controls the svg width/height
  const svgStyle = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
    "--accent-color": accentColor,
    "--logo-color": logoColor,
  };

  return (
    <div
      aria-hidden={false}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-white/90 dark:bg-black/70"
      role="status"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        role="img"
        aria-label="Loading"
        preserveAspectRatio="xMidYMid meet"
        style={svgStyle}
      >
        <title>Loading</title>
        <style>{`
          :root{ --accent-color: ${accentColor}; --logo-color: ${logoColor}; }
          .center { transform-origin: 100px 100px; }
          .arc { fill: none; stroke: var(--accent-color); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 28 460; stroke-dashoffset: 0; transform-origin: 100px 100px; pointer-events: none; filter: drop-shadow(0 2px 4px rgba(15,17,26,0.12)); }
          .mark { fill: var(--logo-color); transition: transform 300ms ease; }
          @keyframes arcMotion { 0% { transform: rotate(0deg); stroke-dasharray: 28 460; } 40% { transform: rotate(140deg); stroke-dasharray: 180 308; } 60% { transform: rotate(220deg); stroke-dasharray: 140 348; } 100% { transform: rotate(360deg); stroke-dasharray: 28 460; } }
          .arc-container { animation: arcMotion 1.85s cubic-bezier(.22,.9,.32,.96) infinite; will-change: transform, stroke-dasharray; }
          @keyframes logoPulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.01); opacity: 0.98; } 100% { transform: scale(1); opacity: 1; } }
          .logo-wrap { animation: logoPulse 2.6s ease-in-out infinite; will-change: transform, opacity; }
          @media (prefers-reduced-motion: reduce) { .arc-container { animation: none; transform: rotate(0deg); } .logo-wrap { animation: none; } }
        `}</style>

        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke="rgba(15,17,26,0.04)"
          strokeWidth="6"
        />

        <g className="center arc-container" transform="translate(0,0)">
          <circle className="arc" cx="100" cy="100" r="78" />
        </g>

        <g
          className="center logo-wrap"
          transform="translate(0,0)"
          aria-hidden="true"
        >
          {logoPath ? (
            <g dangerouslySetInnerHTML={{ __html: logoPath }} />
          ) : (
            // default simple glasses-like mark
            <>
              <rect
                className="mark"
                x="50"
                y="78"
                width="36"
                height="26"
                rx="6"
                ry="6"
              />
              <rect
                className="mark"
                x="114"
                y="78"
                width="36"
                height="26"
                rx="6"
                ry="6"
              />
              <rect
                className="mark"
                x="94"
                y="88"
                width="12"
                height="6"
                rx="3"
                ry="3"
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

export default LoadingOverlay;
