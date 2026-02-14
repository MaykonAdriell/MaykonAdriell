/**
 * SVG Builder Class
 * Transforms raw simulation data into formatted SVG strings.
 */

class SVGBuilder {
    constructor(width = 800, height = 600) {
        this.width = width;
        this.height = height;
        this.pathData = "";
    }

    /**
     * Projects 3D points to 2D SVG coordinates.
     * Uses a simple isometric-like projection for depth.
     */
    project(points, scale = 11, angle = 0.1) {
        const offsetX = this.width / 2;
        const offsetY = this.height / 1.1;

        const projected = points.map(p => {
            // Rotation around Y axis for 3D effect
            const rotX = p.x * Math.cos(angle) - p.z * Math.sin(angle);
            
            // X-Z Projection (Standard Butterfly view) with shift
            const drawX = offsetX + (rotX * scale);
            const drawY = offsetY - (p.z * scale);

            return `${drawX.toFixed(1)},${drawY.toFixed(1)}`;
        });

        this.pathData = "M" + projected.join(" L");
        this.pathLength = points.length * 1.5; // Approx length estimate
    }

    /**
     * Generates the mathematical SVG string without styling.
     * The styling is expected to be handled by the consumer or injected CSS.
     */
    build(cssStyles) {
        return `<svg viewBox="0 0 ${this.width} ${this.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Cyan to Magenta Gradient -->
    <linearGradient id="neon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00ffff; stop-opacity:1" /> <!-- Cyan -->
      <stop offset="50%" style="stop-color:#0077ff; stop-opacity:1" /> <!-- Blue -->
      <stop offset="100%" style="stop-color:#ff00ff; stop-opacity:1" /> <!-- Magenta -->
    </linearGradient>
    
    <!-- Glow Filter -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <style>
      ${cssStyles || this._defaultStyles()}
    </style>
  </defs>

  <!-- Transparent Background Container -->
  <rect width="${this.width}" height="${this.height}" fill="transparent" />
  
  <path d="${this.pathData}" />
</svg>`;
    }

    _defaultStyles() {
        return `
      path {
        fill: none;
        stroke: url(#neon-grad);
        stroke-width: 1.0;
        stroke-linecap: round;
        stroke-linejoin: round;
        filter: url(#glow);
        opacity: 0.85;
        
        stroke-dasharray: ${this.pathLength};
        stroke-dashoffset: ${this.pathLength};
        animation: draw 12s linear infinite alternate; 
      }
      
      @media (prefers-color-scheme: dark) {
        path { stroke-width: 1.4; opacity: 1; }
      }
      
      @media (prefers-color-scheme: light) {
        /* Darker gradient for visibility on white */
        #neon-grad stop:nth-child(1) { stop-color: #008b8b; } 
        #neon-grad stop:nth-child(2) { stop-color: #00008b; } 
        #neon-grad stop:nth-child(3) { stop-color: #8b008b; }
        path { filter: none; opacity: 1; stroke-width: 1.2; }
      }

      @keyframes draw {
        to { stroke-dashoffset: 0; }
      }`;
    }
}

module.exports = { SVGBuilder };
