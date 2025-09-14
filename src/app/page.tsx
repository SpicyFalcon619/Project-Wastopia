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
    
    // Injecting the original, working JavaScript from wastopia.html
    script.innerHTML = `
      // THEME TOGGLE
      const themeBtn = document.getElementById('themeToggle');
      if (themeBtn) {
        themeBtn.onclick = () => {
          document.documentElement.classList.toggle('light');
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
          (el).style.transform = \`translate(\${x * 0.1}px, \${y * 0.1}px)\`;
        });
        el.addEventListener('mouseleave', () => {
          (el).style.transform = 'translate(0, 0)';
        });
      });
      
      // Add floating animation to H1
      const title = document.querySelector('h1');
      if (title) {
        title.style.animation = 'float 8s ease-in-out infinite';
      }
    `;

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.getElementById('wastopia-interactive-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <>
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
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginLeft: 'auto' }}>
          {/* This now links to the local dev URL of your main portfolio */}
          <a href="https://spicyfalcon-portfolio.vercel.app/" className="pill magnetic">← Back to Portfolio</a>
          <button className="theme-btn magnetic" id="themeToggle" title="Toggle theme">🌓</button>
        </div>
      </header>
      
      <main>
        <section className="card reveal">
          <h1>Wastopia</h1>
          <p>A blockchain and IoT platform for transparent, incentive-driven waste management.</p>
          <div style={{ marginTop: '12px' }}>
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
          <a href="/assets/Team Se7en_Whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="pill magnetic">View Whitepaper</a>
          <a href="https://github.com/SpicyFalcon619" target="_blank" rel="noopener noreferrer" className="pill magnetic">GitHub</a>
        </section>
      </main>
      
      <footer>
        © 2025 Ahmad Maruf Hossain - Wastopia Project
      </footer>
    </>
  );
}