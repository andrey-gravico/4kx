'use client';

export default function GrainOverlay() {
  return (
    <>
      {/* SVG filter definition */}
      <svg className="grain-filter" aria-hidden="true">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      {/* Overlay element */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]"
        style={{
          filter: 'url(#grain)',
          width: '100%',
          height: '100%',
        }}
      />
    </>
  );
}
