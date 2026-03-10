/* ═══════════════════════════════════════════════
   animations.js — Canvas Particle Background
═══════════════════════════════════════════════ */

'use strict';

(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  /* Resize */
  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize();

  /* Particle class */
  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.alpha = Math.random() * 0.5 + 0.1;
      this.life  = 0;
      this.maxLife = Math.random() * 300 + 200;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      const ratio = this.life / this.maxLife;
      this.currentAlpha = ratio < 0.1
        ? this.alpha * (ratio / 0.1)
        : ratio > 0.8
          ? this.alpha * ((1 - ratio) / 0.2)
          : this.alpha;
      if (this.life > this.maxLife) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.currentAlpha;
      ctx.fillStyle = '#c9a84c';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const initParticles = () => {
    particles = Array.from({ length: 80 }, () => new Particle());
  };
  initParticles();

  /* Grid lines */
  const drawGrid = () => {
    ctx.save();
    ctx.strokeStyle = 'rgba(201,168,76,0.04)';
    ctx.lineWidth = 1;
    const spacing = 60;
    for (let x = 0; x < W; x += spacing) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += spacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.restore();
  };

  /* Connections between nearby particles */
  const drawConnections = () => {
    const maxDist = 100;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / maxDist) * 0.1;
          ctx.strokeStyle = '#c9a84c';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  /* Animation loop */
  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  };
  animate();

  /* Pause when tab not visible */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else animate();
  });

})();
