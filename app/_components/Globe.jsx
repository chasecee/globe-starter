"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const GlobeComponent = () => {
  const N = 30;
  const [info, setInfo] = useState(null); // State to hold the clicked marker's data
  const globeEl = useRef(null); // Reference to the globe component

  const gData = useMemo(
    () =>
      Array.from({ length: N }, () => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: 15 + Math.random() * 30,
        color: ["pink", "purple", "blue", "green"][
          Math.floor(Math.random() * 4)
        ],
      })),
    []
  );

  const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

  // Focus on North America upon loading
  useEffect(() => {
    const currentGlobe = globeEl.current;
    if (currentGlobe && "pointOfView" in currentGlobe) {
      currentGlobe.pointOfView({ lat: 40, lng: -100, altitude: 2 }, 0); // Latitude and longitude roughly in the center of North America
    }
  }, []);

  return (
    <>
      <Globe
        ref={globeEl}
        globeImageUrl="/img/ts-bg.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        htmlElementsData={gData}
        htmlElement={(d) => {
          const el = document.createElement("div");
          el.innerHTML = markerSvg;
          el.style.color = d.color;
          el.style.width = `${d.size}px`;
          el.style.height = `${d.size}px`;
          el.style["pointer-events"] = "auto";
          el.style.cursor = "pointer";
          el.onclick = () => setInfo(d); // Update state to show the text box with this data
          return el;
        }}
      />
      {info && (
        <div className="absolute top-5 left-5 p-4 text-white bg-white/20 rounded">
          <div>Latitude: {info.lat}</div>
          <div>Longitude: {info.lng}</div>
          <div>Size: {info.size}</div>
          <div>Color: {info.color}</div>
          <button onClick={() => setInfo(null)}>Close</button>
        </div>
      )}
    </>
  );
};

export default GlobeComponent;
