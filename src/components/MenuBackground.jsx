import React, { useEffect, useRef } from 'react';

export default function MenuBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const trailHistory = useRef([]); // Stores last mouse positions

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
      
      // Save trail history
      trailHistory.current.push({
        x: e.clientX,
        y: e.clientY
      });
      if (trailHistory.current.length > 20) {
        trailHistory.current.shift();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Drifting constellation nodes
    const nodes = [];
    const nodeCount = 30;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 0.8 + Math.random() * 1.2,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        baseAlpha: 0.05 + Math.random() * 0.12,
        alpha: 0,
        twinkleSpeed: 0.003 + Math.random() * 0.007,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Static decorative background scenery objects (extremely low opacity 2%-3%)
    const bgObjects = [
      // 1. Highly Detailed Planet Left
      {
        type: 'planet',
        x: window.innerWidth * 0.15,
        y: window.innerHeight * 0.25,
        radius: 50,
        vx: 0.015,
        vy: -0.008
      },
      // 2. Space Station (Solar Arrays / Trusses) Right
      {
        type: 'station',
        x: window.innerWidth * 0.82,
        y: window.innerHeight * 0.3,
        size: 90,
        vx: -0.01,
        vy: 0.01
      },
      // 3. Cratered Asteroid belt cluster top right
      {
        type: 'asteroid',
        x: window.innerWidth * 0.72,
        y: window.innerHeight * 0.15,
        radius: 22,
        offsets: [8, -4, 10, 3, -6, 12, -9, -1],
        vx: 0.02,
        vy: 0.015
      },
      // 4. Broken Ship Wreckage bottom left (exposed frames, cables)
      {
        type: 'wreckage',
        x: window.innerWidth * 0.22,
        y: window.innerHeight * 0.72,
        size: 70,
        vx: -0.012,
        vy: -0.012
      },
      // 5. Sun with Orbiting Planets
      {
        type: 'solar',
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.8,
        sunRadius: 16,
        orbitRadius: 60,
        orbitAngle: 0,
        orbitSpeed: 0.0008,
        vx: 0.008,
        vy: -0.008
      }
    ];

    // Grid warping calculations
    const getWarpedPoint = (x, y, mx, my, mActive) => {
      if (!mActive) return { x, y };
      const dx = x - mx;
      const dy = y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const warpRadius = 200;
      
      if (dist < warpRadius) {
        const force = Math.pow((warpRadius - dist) / warpRadius, 2) * 12;
        const angle = Math.atan2(dy, dx);
        return {
          x: x + Math.cos(angle) * force,
          y: y + Math.sin(angle) * force
        };
      }
      return { x, y };
    };

    let animId;
    const render = () => {
      // Pure black canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // Draw Warped Minimal Grid (1.2% transparency - extremely subtle)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.009)';
      ctx.lineWidth = 0.8;
      const gridSize = 120;
      
      // Draw vertical grid lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < canvas.height; y += 20) {
          const pt = getWarpedPoint(x, y, mouse.x, mouse.y, mouse.active);
          if (y === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }
      
      // Draw horizontal grid lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 20) {
          const pt = getWarpedPoint(x, y, mouse.x, mouse.y, mouse.active);
          if (x === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Draw background scenery objects (extremely low opacity 2%-3% for elegant look)
      bgObjects.forEach(obj => {
        obj.x += obj.vx;
        obj.y += obj.vy;

        // Reset if drifted too far off screen
        if (obj.x < -150) obj.x = canvas.width + 150;
        if (obj.x > canvas.width + 150) obj.x = -150;
        if (obj.y < -150) obj.y = canvas.height + 150;
        if (obj.y > canvas.height + 150) obj.y = -150;

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.lineWidth = 1.0;

        if (obj.type === 'planet') {
          // Planet circle
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
          ctx.stroke();
          
          // Layered diagonal rings
          ctx.beginPath();
          ctx.ellipse(obj.x, obj.y, obj.radius * 1.6, obj.radius * 0.3, Math.PI / 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(obj.x, obj.y, obj.radius * 1.45, obj.radius * 0.25, Math.PI / 6, 0, Math.PI * 2);
          ctx.stroke();

          // Internal Craters (circles with shadow offsets)
          ctx.beginPath();
          ctx.arc(obj.x - 15, obj.y - 10, 6, 0, Math.PI * 2);
          ctx.arc(obj.x + 10, obj.y + 15, 8, 0, Math.PI * 2);
          ctx.arc(obj.x - 5, obj.y + 20, 4, 0, Math.PI * 2);
          ctx.stroke();
          
          // Planet surface crescent shadow curve
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.radius - 2, -Math.PI / 3, Math.PI / 2);
          ctx.stroke();
        } else if (obj.type === 'station') {
          // Central cylinder module core
          ctx.beginPath();
          ctx.rect(obj.x - 10, obj.y - obj.size / 3, 20, (obj.size / 3) * 2);
          ctx.stroke();

          // Horizontal truss beams
          ctx.beginPath();
          ctx.moveTo(obj.x - obj.size / 2, obj.y);
          ctx.lineTo(obj.x + obj.size / 2, obj.y);
          ctx.stroke();

          // Left Wing Solar Array Panels (detailed grid)
          ctx.beginPath();
          ctx.rect(obj.x - obj.size / 2, obj.y - 20, 20, 40);
          ctx.stroke();
          for (let py = obj.y - 16; py < obj.y + 20; py += 8) {
            ctx.beginPath();
            ctx.moveTo(obj.x - obj.size / 2, py);
            ctx.lineTo(obj.x - obj.size / 2 + 20, py);
            ctx.stroke();
          }

          // Right Wing Solar Array Panels
          ctx.beginPath();
          ctx.rect(obj.x + obj.size / 2 - 20, obj.y - 20, 20, 40);
          ctx.stroke();
          for (let py = obj.y - 16; py < obj.y + 20; py += 8) {
            ctx.beginPath();
            ctx.moveTo(obj.x + obj.size / 2 - 20, py);
            ctx.lineTo(obj.x + obj.size / 2, py);
            ctx.stroke();
          }

          // Communication dishes
          ctx.beginPath();
          ctx.arc(obj.x, obj.y - obj.size / 3 - 6, 6, 0, Math.PI, true);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(obj.x, obj.y - obj.size / 3 - 6);
          ctx.lineTo(obj.x, obj.y - obj.size / 3 - 14);
          ctx.stroke();
        } else if (obj.type === 'asteroid') {
          // Irregular rock silhouette
          ctx.beginPath();
          obj.offsets.forEach((off, idx) => {
            const angle = (idx / obj.offsets.length) * Math.PI * 2;
            const r = obj.radius + off;
            const rx = obj.x + Math.cos(angle) * r;
            const ry = obj.y + Math.sin(angle) * r;
            if (idx === 0) ctx.moveTo(rx, ry);
            else ctx.lineTo(rx, ry);
          });
          ctx.closePath();
          ctx.stroke();

          // Surface cracks & internal shading contours
          ctx.beginPath();
          ctx.moveTo(obj.x - 8, obj.y - 8);
          ctx.lineTo(obj.x, obj.y - 2);
          ctx.lineTo(obj.x + 6, obj.y - 10);
          ctx.moveTo(obj.x - 12, obj.y + 2);
          ctx.lineTo(obj.x - 5, obj.y + 6);
          ctx.stroke();
          
          // Internal crater lines
          ctx.beginPath();
          ctx.arc(obj.x + 5, obj.y + 4, 3, 0, Math.PI * 2);
          ctx.stroke();
        } else if (obj.type === 'wreckage') {
          // Swept vector wing outlines (broken frame)
          ctx.beginPath();
          ctx.moveTo(obj.x - obj.size / 2, obj.y - obj.size / 4);
          ctx.lineTo(obj.x - obj.size / 8, obj.y - obj.size / 4);
          ctx.moveTo(obj.x + obj.size / 8, obj.y - obj.size / 4);
          ctx.lineTo(obj.x + obj.size / 2, obj.y - obj.size / 4);
          ctx.lineTo(obj.x + obj.size / 3, obj.y + obj.size / 8);
          ctx.moveTo(obj.x - obj.size / 3, obj.y + obj.size / 8);
          ctx.closePath();
          ctx.stroke();

          // Exposed structural ribs (ribbing grid)
          ctx.beginPath();
          for (let rx = obj.x - obj.size / 2 + 10; rx < obj.x - 10; rx += 8) {
            ctx.moveTo(rx, obj.y - obj.size / 4);
            ctx.lineTo(rx + 2, obj.y - obj.size / 12);
          }
          ctx.stroke();

          // Thruster cylindrical engine nozzles
          ctx.beginPath();
          ctx.rect(obj.x - 12, obj.y - obj.size / 4 - 8, 8, 8);
          ctx.rect(obj.x + 4, obj.y - obj.size / 4 - 8, 8, 8);
          ctx.stroke();

          // Loose bezier cables hanging
          ctx.beginPath();
          ctx.moveTo(obj.x - 8, obj.y - obj.size / 4);
          ctx.bezierCurveTo(obj.x - 12, obj.y, obj.x - 20, obj.y + 5, obj.x - 18, obj.y + 20);
          ctx.moveTo(obj.x + 8, obj.y - obj.size / 4);
          ctx.bezierCurveTo(obj.x + 12, obj.y - 5, obj.x + 5, obj.y + 15, obj.x + 10, obj.y + 18);
          ctx.stroke();
        } else if (obj.type === 'solar') {
          // Center sun
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.sunRadius, 0, Math.PI * 2);
          ctx.stroke();
          // Radiating solar flares
          for (let f = 0; f < 8; f++) {
            const angle = (f / 8) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(obj.x + Math.cos(angle) * obj.sunRadius, obj.y + Math.sin(angle) * obj.sunRadius);
            ctx.lineTo(obj.x + Math.cos(angle) * (obj.sunRadius + 4), obj.y + Math.sin(angle) * (obj.sunRadius + 4));
            ctx.stroke();
          }

          // Orbit line
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.orbitRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.007)';
          ctx.stroke();

          // Orbiting planet node with crater details
          obj.orbitAngle += obj.orbitSpeed;
          const px = obj.x + Math.cos(obj.orbitAngle) * obj.orbitRadius;
          const py = obj.y + Math.sin(obj.orbitAngle) * obj.orbitRadius;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
          ctx.stroke();
        }

        ctx.restore();
      });

      // Draw Constellation Nodes and connections
      nodes.forEach((node, idx) => {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap edges
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        node.phase += node.twinkleSpeed;
        node.alpha = node.baseAlpha + Math.sin(node.phase) * 0.08;

        // Draw connections to nearby nodes
        for (let j = idx + 1; j < nodes.length; j++) {
          const target = nodes[j];
          const dx = node.x - target.x;
          const dy = node.y - target.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 140) {
            const connAlpha = (1 - dist / 140) * 0.03;
            ctx.strokeStyle = `rgba(255, 255, 255, ${connAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.01, node.alpha)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw vector ribbon mouse trail (extremely low transparency 8%, tapered width)
      const history = trailHistory.current;
      if (mouse.active && history.length > 1) {
        for (let i = 1; i < history.length; i++) {
          const ptStart = history[i - 1];
          const ptEnd = history[i];
          
          // Width decreases towards the beginning of the history array (the tail)
          const taperWidth = 0.2 + (i / history.length) * 2.5; 
          // Opacity increases towards the current mouse position (the head)
          const stepAlpha = (i / history.length) * 0.08; 
          
          ctx.beginPath();
          ctx.moveTo(ptStart.x, ptStart.y);
          ctx.lineTo(ptEnd.x, ptEnd.y);
          ctx.strokeStyle = `rgba(74, 144, 226, ${stepAlpha})`;
          ctx.lineWidth = taperWidth;
          ctx.stroke();
        }

        // Draw modern crosshair concentric ring around cursor (6% transparency)
        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(74, 144, 226, 0.06)';
        ctx.lineWidth = 1.0;
        // Inner circle
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.stroke();
        
        // Faint outer cursor cross lines
        ctx.beginPath();
        ctx.moveTo(-20, 0); ctx.lineTo(-12, 0);
        ctx.moveTo(12, 0); ctx.lineTo(20, 0);
        ctx.moveTo(0, -20); ctx.lineTo(0, -12);
        ctx.moveTo(0, 12); ctx.lineTo(0, 20);
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}
