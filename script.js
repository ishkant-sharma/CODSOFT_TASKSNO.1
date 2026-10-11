const phrases = ["RESPONSIVE WEBSITES.", "INTERACTIVE EXPERIENCES.", "IDEAS THAT SOLVE."];
const typeTarget = document.getElementById("typewriter");
let phraseIndex = 0, charIndex = 0, deleting = false;
function typeLoop() {
  const phrase = phrases[phraseIndex];
  typeTarget.textContent = phrase.slice(0, charIndex);
  let delay = deleting ? 42 : 75;
  if (!deleting && charIndex < phrase.length) { charIndex++; }
  else if (!deleting) { deleting = true; delay = 1150; }
  else if (charIndex > 0) { charIndex--; }
  else { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; delay = 320; }
  setTimeout(typeLoop, delay);
}
typeLoop();

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false"); menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      entry.target.querySelectorAll?.(".progress span").forEach(bar => bar.style.width = bar.dataset.progress + "%");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .14 });
document.querySelectorAll(".reveal,.reveal-text").forEach(el => observer.observe(el));
document.querySelectorAll(".skill-card").forEach(el => observer.observe(el));

// Lightweight animated particle field; automatically resizes and respects reduced-motion.
const canvas = document.getElementById("particles"), ctx = canvas.getContext("2d");
let particles = [], width = 0, height = 0, raf = 0;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function resize() {
  width = canvas.width = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
  height = canvas.height = window.innerHeight * Math.min(window.devicePixelRatio || 1, 2);
  canvas.style.width = window.innerWidth + "px"; canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(Math.min(window.devicePixelRatio || 1, 2), 0, 0, Math.min(window.devicePixelRatio || 1, 2), 0, 0);
  particles = Array.from({ length: Math.min(65, Math.floor(window.innerWidth / 18)) }, () => ({
    x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + .4, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
    alpha: Math.random() * .45 + .12
  }));
}
function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  particles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
    if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(198,255,77,${p.alpha})`; ctx.fill();
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
      if (d < 105) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(198,255,77,${.065 * (1 - d / 105)})`; ctx.stroke(); }
    }
  });
  if (!reducedMotion) raf = requestAnimationFrame(draw);
}
window.addEventListener("resize", resize); resize(); draw();
