'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function WastopiaPage() {

  useEffect(() => {
    // Prevent script injection duplicates during development
    if (document.getElementById('wastopia-interactive-script')) return;

    const script = document.createElement('script');
    script.id = 'wastopia-interactive-script';
    
    script.innerHTML = `
      // THEME PERSISTENCE - Load saved theme or default to dark
      function initializeTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
        if (isDark) {
          document.documentElement.classList.remove('light');
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }

      function setTheme(isDark) {
        if (isDark) {
          document.documentElement.classList.remove('light');
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('portfolio-theme', 'dark');
        } else {
          document.documentElement.classList.add('light');
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('portfolio-theme', 'light');
        }
      }

      initializeTheme();

      // THEME TOGGLE
      const themeBtn = document.getElementById('themeToggle');
      if (themeBtn) {
        themeBtn.onclick = () => {
          const isCurrentlyLight = document.documentElement.classList.contains('light');
          setTheme(isCurrentlyLight);
          document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
          setTimeout(() => { document.body.style.transition = 'background .45s ease, color .35s ease'; }, 500);
        };
      }

      // REVEAL ON SCROLL
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      
      // MAGNETIC EFFECT
      document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          el.style.transform = \`translate(\${x * 0.1}px, \${y * 0.1}px)\`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0, 0)'; });
      });

      // CURSOR TRAIL
      const cursorTrail = document.getElementById('cursorTrail');
      let mouseX = 0, mouseY = 0;
      let trailX = 0, trailY = 0;
      if (cursorTrail) {
        cursorTrail.style.opacity = '0';
        document.addEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          cursorTrail.style.opacity = '0.6';
        });
        function animateTrail() {
          trailX += (mouseX - trailX) * 0.3;
          trailY += (mouseY - trailY) * 0.3;
          cursorTrail.style.transform = \`translate(\${trailX - 10}px, \${trailY - 10}px)\`;
          requestAnimationFrame(animateTrail);
        }
        document.addEventListener('mouseleave', () => { cursorTrail.style.opacity = '0'; });
        animateTrail();
      }

      // BACKGROUND PARALLAX (subtle)
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.body;
        const speed = scrolled * 0.25;
        parallax.style.backgroundPosition = \`center \${-speed}px\`;
      });

      // PARTICLE BACKGROUND
      (function createParticles(){
        const container = document.getElementById('particle-background');
        if (!container) return;
        const particleCount = Math.min(Math.floor(window.innerWidth / 40), 50);
        for (let i = 0; i < particleCount; i++) {
          const el = document.createElement('div');
          el.className = 'particle';
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const mvX = (Math.random() * 100 - 50) + 'px';
          const mvY = (Math.random() * 100 - 50) + 'px';
          el.style.width = size + 'px';
          el.style.height = size + 'px';
          el.style.left = left + '%';
          el.style.top = top + '%';
          el.style.setProperty('--particle-move-x', mvX);
          el.style.setProperty('--particle-move-y', mvY);
          container.appendChild(el);
        }
      })();
      
    `;

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.getElementById('wastopia-interactive-script');
      if (existingScript) existingScript.remove();
      const particleBg = document.getElementById('particle-background');
      if (particleBg) particleBg.innerHTML = '';
    };
  }, []);

  return (
    <>
      <div className="particle-background" id="particle-background"></div>
      <div className="cursor-trail" id="cursorTrail"></div>

      <header>
        <Link className="brand" href="/" aria-label="home">
          <div className="logo magnetic">
            <Image src="/assets/my-logo.png" alt="Ahmad Maruf Hossain Logo" width={52} height={52} style={{objectFit:'contain'}} />
          </div>
          <div>
            <div style={{ fontWeight: 800 }}>Ahmad Maruf Hossain</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>CSE • United International University</div>
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: 'auto' }}>
          <a href="https://spicyfalcon-portfolio.vercel.app/" className="pill magnetic">← Back to Portfolio</a>
          <button className="theme-btn magnetic" id="themeToggle" title="Toggle theme" aria-label="Toggle dark/light theme">
            <svg className="theme-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g className="sun-icon">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </g>
              <g className="moon-icon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
              </g>
            </svg>
          </button>
        </div>
      </header>
      
      <main>
        <section className="card reveal">
          <h1>Wastopia</h1>
          <p>A blockchain and IoT platform for transparent, incentive-driven waste management.</p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="pill magnetic">Blockchain</span>
            <span className="pill magnetic">IoT</span>
            <span className="pill magnetic">Research</span>
            <span className="pill magnetic">Sustainability</span>
          </div>
        </section>

        <section className="card reveal slide-left">
          <h2>Overview</h2>
          <p>
            Wastopia is a blockchain and IoT platform that tracks all types of waste; organic, recyclable, and hazardous,
            ensuring every step is transparent and fraud-proof. Using a hybrid Hyperledger Fabric + Besu architecture, the
            system combines security with public trust. Smart contracts issue <strong>WastoCoin</strong> tokens to reward
            proper waste disposal, motivating eco-friendly habits and empowering communities.
          </p>
        </section>

        <section className="card reveal slide-right">
          <h2>Why Wastopia?</h2>
          <ul>
            <li><strong>Global Impact:</strong> Tackles 2.24B tonnes of waste annually, projected 3.88B by 2050.</li>
            <li><strong>Transparency:</strong> Hybrid blockchain ensures trust, traceability, and accountability.</li>
            <li><strong>Incentives:</strong> WastoCoin rewards eco-friendly behavior and responsible disposal.</li>
            <li><strong>E-Waste Tracking:</strong> End-to-end accountability for electronic waste.</li>
            <li><strong>Education First:</strong> Starts in schools & universities to build sustainable habits.</li>
          </ul>
        </section>

        <section className="card reveal slide-left">
          <h2>Key Features</h2>
          <ul>
            <li>Immutable waste tracking ledger</li>
            <li>IoT-enabled SmartBin network</li>
            <li>Smart contract rewards in real time</li>
            <li>Blockchain-verified e-waste management</li>
            <li>Decentralized community governance (DAO)</li>
          </ul>
        </section>

        <section className="card reveal">
          <h2>Recognition</h2>
          <p>
            <strong>Best Emerging Team - Blockchain Category</strong><br />
            UIU CSE FEST 2025
          </p>
        </section>

        <section className="card reveal slide-right">
          <h2>Learn More</h2>
          <p>Check out the whitepaper for full technical details and impact assessment.</p>
          <div style={{ marginTop: '14px', display: 'flex', gap: '10px' }}>
            <a href="/assets/Team Se7en_Whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="pill magnetic">View Whitepaper</a>
            <a href="https://github.com/SpicyFalcon619" target="_blank" rel="noopener noreferrer" className="pill magnetic">GitHub</a>
          </div>
        </section>
      </main>
      
      <footer>
        © 2025 Ahmad Maruf Hossain - Wastopia Project
      </footer>
    </>
  );
}