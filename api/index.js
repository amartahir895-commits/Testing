const PakistanSimScraper = require('../lib/scraper');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const COPYRIGHT_HANDLE = process.env.COPYRIGHT_HANDLE || '@Sychox2006';
  const scraper = new PakistanSimScraper();

  try {
    // Home page
    if (req.url === '/' && req.method === 'GET') {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pakistan SIM Database API | Professional Lookup Service</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
            <style>
                /* ===== CSS VARIABLES ===== */
                :root {
                    --primary: #2563eb;
                    --primary-dark: #1d4ed8;
                    --primary-light: #3b82f6;
                    --secondary: #f59e0b;
                    --accent: #8b5cf6;
                    --success: #10b981;
                    --warning: #f59e0b;
                    --error: #ef4444;
                    --dark: #0f172a;
                    --dark-2: #1e293b;
                    --dark-3: #334155;
                    --light: #f8fafc;
                    --light-2: #e2e8f0;
                    --light-3: #cbd5e1;
                    --gray: #64748b;
                    --gray-light: #94a3b8;
                    
                    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    
                    --border-radius: 12px;
                    --border-radius-lg: 16px;
                    --border-radius-xl: 20px;
                    
                    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    --transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* ===== RESET & BASE STYLES ===== */
                *,
                *::before,
                *::after {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                html {
                    scroll-behavior: smooth;
                    font-size: 16px;
                }

                body {
                    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                    line-height: 1.7;
                    color: var(--dark);
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    overflow-x: hidden;
                    position: relative;
                    font-weight: 400;
                }

                body::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: 
                        radial-gradient(circle at 15% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 85% 30%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 50% 80%, rgba(120, 219, 255, 0.15) 0%, transparent 50%);
                    z-index: -2;
                }

                /* ===== CONTAINER & LAYOUT ===== */
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem 1.5rem;
                }

                .grid {
                    display: grid;
                    gap: 2rem;
                }

                .grid-cols-1 { grid-template-columns: 1fr; }
                .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
                .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
                .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

                @media (max-width: 1024px) {
                    .grid-cols-4 { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 768px) {
                    .grid-cols-2,
                    .grid-cols-3,
                    .grid-cols-4 { grid-template-columns: 1fr; }
                    
                    .container {
                        padding: 1.5rem 1rem;
                    }
                }

                /* ===== TYPOGRAPHY ===== */
                h1, h2, h3, h4, h5, h6 {
                    font-weight: 700;
                    line-height: 1.2;
                    margin-bottom: 1rem;
                    color: var(--dark);
                }

                h1 {
                    font-size: 3.5rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, var(--primary), var(--accent));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                h2 {
                    font-size: 2.25rem;
                    position: relative;
                    display: inline-block;
                }

                h2::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    left: 0;
                    width: 60px;
                    height: 4px;
                    background: linear-gradient(90deg, var(--primary), var(--accent));
                    border-radius: 2px;
                }

                h3 {
                    font-size: 1.5rem;
                    color: var(--dark-2);
                }

                p {
                    margin-bottom: 1rem;
                    color: var(--gray);
                }

                .text-center { text-align: center; }
                .text-light { color: var(--light); }
                .text-gray { color: var(--gray); }
                .text-primary { color: var(--primary); }
                .text-accent { color: var(--accent); }

                /* ===== GLASS CARDS ===== */
                .glass-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: var(--border-radius-xl);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: var(--shadow-xl);
                    padding: 2.5rem;
                    transition: var(--transition);
                    position: relative;
                    overflow: hidden;
                }

                .glass-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, var(--primary), transparent);
                }

                .glass-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-xl), 0 30px 60px rgba(0, 0, 0, 0.15);
                }

                .glass-card-header {
                    padding-bottom: 1.5rem;
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }

                /* ===== HEADER SECTION ===== */
                .header-section {
                    text-align: center;
                    padding: 4rem 2rem !important;
                    position: relative;
                }

                .header-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                    animation: float 8s ease-in-out infinite;
                }

                .subtitle {
                    font-size: 1.25rem;
                    color: var(--gray);
                    margin-bottom: 2rem;
                    font-weight: 500;
                }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: linear-gradient(135deg, var(--success), #34d399);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 50px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    box-shadow: var(--shadow-lg);
                    position: relative;
                    z-index: 2;
                }

                /* ===== ENDPOINT STYLES ===== */
                .endpoint-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .endpoint {
                    background: linear-gradient(135deg, rgba(37, 99, 235, 0.03), rgba(139, 92, 246, 0.03));
                    border: 1px solid rgba(37, 99, 235, 0.1);
                    border-radius: var(--border-radius-lg);
                    padding: 1.75rem;
                    transition: var(--transition);
                    position: relative;
                }

                .endpoint::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 4px;
                    height: 100%;
                    background: linear-gradient(180deg, var(--primary), var(--accent));
                    border-radius: var(--border-radius) 0 0 var(--border-radius);
                }

                .endpoint:hover {
                    background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(139, 92, 246, 0.08));
                    border-color: rgba(37, 99, 235, 0.3);
                    transform: translateX(8px);
                }

                .endpoint h3 {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 1.1rem;
                    margin-bottom: 0.75rem;
                }

                .endpoint-icon {
                    width: 24px;
                    height: 24px;
                    background: var(--primary);
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 0.8rem;
                }

                .endpoint p {
                    color: var(--gray);
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                }

                .endpoint code {
                    background: var(--dark);
                    color: var(--light-2);
                    padding: 1rem 1.25rem;
                    border-radius: var(--border-radius);
                    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
                    font-size: 0.85rem;
                    display: block;
                    overflow-x: auto;
                    border: 1px solid var(--dark-3);
                    line-height: 1.4;
                }

                /* ===== FEATURE CARDS ===== */
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1rem;
                }

                .feature-card {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: var(--border-radius-lg);
                    padding: 2rem;
                    text-align: center;
                    transition: var(--transition);
                    position: relative;
                    overflow: hidden;
                }

                .feature-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, var(--primary), var(--accent));
                }

                .feature-card:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: var(--shadow-lg);
                }

                .feature-icon {
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, var(--primary), var(--accent));
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    font-size: 1.75rem;
                    color: white;
                    box-shadow: var(--shadow-md);
                }

                .feature-card h3 {
                    font-size: 1.2rem;
                    margin-bottom: 0.75rem;
                }

                .feature-card p {
                    font-size: 0.9rem;
                    color: var(--gray);
                    line-height: 1.6;
                }

                /* ===== CONTACT SECTION ===== */
                .contact-section {
                    background: linear-gradient(135deg, var(--primary-dark), var(--accent)) !important;
                    color: white;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }

                .contact-section::before {
                    content: '';
                    position: absolute;
                    top: -100%;
                    left: -100%;
                    width: 300%;
                    height: 300%;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
                    animation: rotate 15s linear infinite;
                }

                .contact-content {
                    position: relative;
                    z-index: 2;
                }

                .contact-section h2 {
                    color: white;
                }

                .contact-section h2::after {
                    background: linear-gradient(90deg, rgba(255,255,255,0.5), transparent);
                }

                .contact-section p {
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 2rem;
                    font-size: 1.1rem;
                }

                .telegram-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: rgba(255, 255, 255, 0.15);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: var(--transition);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    position: relative;
                    overflow: hidden;
                }

                .telegram-btn::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: var(--transition-slow);
                }

                .telegram-btn:hover {
                    background: rgba(255, 255, 255, 0.25);
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
                }

                .telegram-btn:hover::before {
                    left: 100%;
                }

                .btn-icon {
                    font-size: 1.25rem;
                }

                /* ===== FOOTER ===== */
                .developer-footer {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.9rem;
                    margin-top: 3rem;
                    padding: 2rem;
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: var(--border-radius-lg);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    position: relative;
                    z-index: 2;
                }

                .developer-footer strong {
                    color: white;
                    font-weight: 700;
                }

                /* ===== ANIMATIONS ===== */
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(120deg); }
                    66% { transform: translateY(10px) rotate(240deg); }
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .glass-card {
                    animation: fadeInUp 0.8s ease-out;
                }

                .glass-card:nth-child(2) { animation-delay: 0.2s; }
                .glass-card:nth-child(3) { animation-delay: 0.4s; }
                .glass-card:nth-child(4) { animation-delay: 0.6s; }

                /* ===== SCROLLBAR ===== */
                ::-webkit-scrollbar {
                    width: 12px;
                }

                ::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }

                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, var(--primary), var(--accent));
                    border-radius: 10px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, var(--primary-dark), #7c3aed);
                }

                /* ===== RESPONSIVE DESIGN ===== */
                @media (max-width: 768px) {
                    h1 {
                        font-size: 2.5rem;
                    }
                    
                    h2 {
                        font-size: 1.875rem;
                    }
                    
                    .header-section {
                        padding: 3rem 1.5rem !important;
                    }
                    
                    .glass-card {
                        padding: 2rem 1.5rem;
                    }
                    
                    .feature-card {
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    h1 {
                        font-size: 2rem;
                    }
                    
                    h2 {
                        font-size: 1.5rem;
                    }
                    
                    .container {
                        padding: 1rem 0.75rem;
                    }
                    
                    .header-section {
                        padding: 2rem 1rem !important;
                    }
                }

                /* ===== UTILITY CLASSES ===== */
                .mb-0 { margin-bottom: 0; }
                .mb-1 { margin-bottom: 0.5rem; }
                .mb-2 { margin-bottom: 1rem; }
                .mb-3 { margin-bottom: 1.5rem; }
                .mb-4 { margin-bottom: 2rem; }
                .mt-4 { margin-top: 2rem; }

                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-center { justify-content: center; }
                .gap-2 { gap: 0.5rem; }
                .gap-3 { gap: 0.75rem; }
                .gap-4 { gap: 1rem; }

                .w-full { width: 100%; }
                .h-full { height: 100%; }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header Section -->
                <div class="glass-card header-section">
                    <h1>Pakistan SIM Database API</h1>
                    <p class="subtitle">Enterprise-grade SIM Information Lookup Service</p>
                    <div class="status-badge">
                        <span>⚡</span>
                        SYSTEM OPERATIONAL • API ACTIVE
                    </div>
                </div>

                <!-- Main Content Grid -->
                <div class="grid grid-cols-2">
                    <!-- API Endpoints -->
                    <div class="glass-card">
                        <div class="glass-card-header">
                            <h2>🚀 API Endpoints</h2>
                            <p class="text-gray">Comprehensive REST API for SIM database queries</p>
                        </div>
                        <div class="endpoint-list">
                            <div class="endpoint">
                                <h3>
                                    <span class="endpoint-icon">GET</span>
                                    /api/lookup
                                </h3>
                                <p>Query parameter based lookup</p>
                                <code>GET https://${req.headers.host}/api/lookup?query=923001234567</code>
                            </div>
                            
                            <div class="endpoint">
                                <h3>
                                    <span class="endpoint-icon">GET</span>
                                    /api/lookup/&lt;number&gt;
                                </h3>
                                <p>Path parameter based lookup</p>
                                <code>GET https://${req.headers.host}/api/lookup/923001234567</code>
                            </div>
                            
                            <div class="endpoint">
                                <h3>
                                    <span class="endpoint-icon">POST</span>
                                    /api/lookup
                                </h3>
                                <p>JSON body based lookup</p>
                                <code>POST https://${req.headers.host}/api/lookup</code>
                                <code>Content-Type: application/json</code>
                                <code>{"query": "923001234567"}</code>
                            </div>
                            
                            <div class="endpoint">
                                <h3>
                                    <span class="endpoint-icon">GET</span>
                                    /health
                                </h3>
                                <p>System health monitoring</p>
                                <code>GET https://${req.headers.host}/health</code>
                            </div>
                        </div>
                    </div>

                    <!-- Features -->
                    <div class="glass-card">
                        <div class="glass-card-header">
                            <h2>💫 Core Features</h2>
                            <p class="text-gray">Advanced capabilities for enterprise use</p>
                        </div>
                        <div class="features-grid">
                            <div class="feature-card">
                                <div class="feature-icon">⚡</div>
                                <h3>Real-time Processing</h3>
                                <p>Instant database queries with sub-second response times</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🔒</div>
                                <h3>Bank-grade Security</h3>
                                <p>Military-grade encryption and secure API endpoints</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">📊</div>
                                <h3>Advanced Analytics</h3>
                                <p>Comprehensive data insights and reporting dashboard</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon">🌐</div>
                                <h3>Global CDN</h3>
                                <p>Worldwide content delivery for optimal performance</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Section -->
                <div class="glass-card contact-section">
                    <div class="contact-content">
                        <h2>📞 Enterprise Support</h2>
                        <p>Get professional support, custom API solutions, and enterprise integration services</p>
                        <a href="https://t.me/Sychox2006" class="telegram-btn" target="_blank">
                            <span class="btn-icon">💬</span>
                            Contact on Telegram
                        </a>
                    </div>
                </div>

                <!-- Footer -->
                <div class="developer-footer">
                    <strong>Developed by ${COPYRIGHT_HANDLE}</strong> • Enterprise API Solution • Production Ready Infrastructure
                </div>
            </div>
        </body>
        </html>
      `;
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    }

    // Health check
    if (req.url === '/health' && req.method === 'GET') {
      return res.json({
        status: "healthy",
        service: "Pakistan SIM Database API",
        developer: COPYRIGHT_HANDLE,
        timestamp: new Date().toISOString(),
        version: "5.0.0",
        features: ["enterprise_grade", "real_time", "advanced_analytics"],
        environment_configured: !!(process.env.TARGET_BASE && process.env.TARGET_PATH)
      });
    }

    // API lookup handlers
    if (req.url.startsWith('/api/lookup')) {
      return await handleLookup(req, res, scraper, COPYRIGHT_HANDLE);
    }

    // 404
    return res.status(404).json({
      error: "Route not found",
      available_routes: ["/", "/health", "/api/lookup"],
      developer: COPYRIGHT_HANDLE
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: "Internal server error",
      developer: COPYRIGHT_HANDLE,
      message: "Contact developer for support"
    });
  }
};

// Handle lookup requests
async function handleLookup(req, res, scraper, developer) {
  let query = '';

  // Extract query based on request type
  if (req.method === 'GET') {
    if (req.url.startsWith('/api/lookup/')) {
      query = req.url.split('/api/lookup/')[1];
    } else {
      const url = new URL(req.url, `https://${req.headers.host}`);
      query = url.searchParams.get('query') || '';
    }
  } else if (req.method === 'POST') {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    try {
      const data = JSON.parse(body);
      query = data.query || '';
    } catch {
      return res.status(400).json({
        error: "Invalid JSON body",
        developer: developer
      });
    }
  }

  query = query.trim();

  // Validate query
  if (!query) {
    return res.status(400).json({
      error: "Query parameter is required",
      example: "/api/lookup?query=923001234567",
      developer: developer
    });
  }

  const isMobile = /^92\d{9,12}$/.test(query);
  const isCnic = /^\d{13}$/.test(query);
  
  if (!isMobile && !isCnic) {
    return res.status(400).json({
      error: "Invalid query format",
      valid_formats: {
        mobile: "92XXXXXXXXX (11-14 digits)",
        cnic: "XXXXXXXXXXXXX (13 digits)"
      },
      your_query: query,
      developer: developer
    });
  }

  try {
    // REAL SEARCH - No mock data
    console.log(`Processing real search for: ${query}`);
    const results = await scraper.search(query);
    
    return res.json({
      success: true,
      query: query,
      type: isMobile ? "mobile" : "cnic",
      results_count: results.length,
      results: results,
      developer: developer,
      message: "Enterprise API Service - Created by @Sychox2006",
      timestamp: new Date().toISOString(),
      source: "live_database"
    });
    
  } catch (error) {
    console.error('Lookup error:', error);
    return res.status(500).json({
      error: "Search failed",
      details: error.message,
      developer: developer,
      your_query: query
    });
  }
                                           }
