import React from 'react';

/**
 * Hero graphic: distributed contributors feeding one delivery point.
 *
 * The motif is the logo's own geometry, scaled up: satellite nodes send
 * signals along connectors to a hub, which pulses outward. It reads as the
 * operating model the page is describing rather than as decoration, which is
 * the only reason it earns a place on an otherwise restrained page.
 *
 * Pure SVG and CSS. No animation library, no canvas, no layout thrash: the
 * animated properties are transform, opacity and stroke-dashoffset, all of
 * which the compositor handles without repainting.
 *
 * Motion is disabled wholesale under prefers-reduced-motion (see index.css),
 * where it degrades to a legible static diagram.
 */

const HUB = { x: 296, y: 210 };

const NODES = [
  { x: 64, y: 96, r: 5, delay: 0 },
  { x: 150, y: 54, r: 4, delay: 1.6 },
  { x: 92, y: 214, r: 6, delay: 0.7 },
  { x: 176, y: 158, r: 4, delay: 2.4 },
  { x: 118, y: 318, r: 5, delay: 1.1 },
  { x: 206, y: 342, r: 4, delay: 3.1 },
];

const RINGS = [0, 1.4, 2.8];

const HeroSignal = () => (
  <svg
    viewBox="0 0 420 420"
    className="hero-signal w-full h-auto max-w-[420px]"
    role="img"
    aria-label="Diagram: distributed contributors feeding a single delivery point"
  >
    {/* Connectors */}
    <g stroke="var(--color-accent-600)" fill="none" strokeLinecap="round">
      {NODES.map((node, i) => (
        <line
          key={`line-${i}`}
          x1={node.x}
          y1={node.y}
          x2={HUB.x}
          y2={HUB.y}
          strokeWidth="1"
          opacity="0.18"
        />
      ))}

      {/* Signals travelling toward the hub */}
      {NODES.map((node, i) => (
        <line
          key={`signal-${i}`}
          className="hero-signal__pulse"
          x1={node.x}
          y1={node.y}
          x2={HUB.x}
          y2={HUB.y}
          strokeWidth="2"
          opacity="0.75"
          style={{ animationDelay: `${node.delay}s` }}
        />
      ))}
    </g>

    {/* Contributor nodes */}
    {NODES.map((node, i) => (
      <circle
        key={`node-${i}`}
        className="hero-signal__node"
        cx={node.x}
        cy={node.y}
        r={node.r}
        fill="var(--color-accent-600)"
        opacity="0.55"
        style={{ animationDelay: `${node.delay}s` }}
      />
    ))}

    {/* Hub pulses */}
    {RINGS.map((delay, i) => (
      <circle
        key={`ring-${i}`}
        className="hero-signal__ring"
        cx={HUB.x}
        cy={HUB.y}
        r="26"
        fill="none"
        stroke="var(--color-accent-600)"
        strokeWidth="1.5"
        style={{ animationDelay: `${delay}s` }}
      />
    ))}

    {/* Hub */}
    <circle cx={HUB.x} cy={HUB.y} r="26" fill="none" stroke="var(--color-accent-600)" strokeWidth="2" opacity="0.28" />
    <circle cx={HUB.x} cy={HUB.y} r="11" fill="var(--color-accent-600)" />
  </svg>
);

export default HeroSignal;
