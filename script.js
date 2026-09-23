:root {
    --bg-dark: #0d1117;
    --bg-light: #f5f5f5;
    --card-dark: #161b22;
    --card-light: #ffffff;
    --accent: #00c6ff;
    --accent2: #ff6b6b;
    --text-dark: #ffffff;
    --text-light: #111827;
}

body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "IRANSans", sans-serif;
    background: var(--bg-dark);
    color: var(--text-dark);
    direction: rtl;
}

body.light {
    background: var(--bg-light);
    color: var(--text-light);
}

.app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* هدر */

.hero {
    background: radial-gradient(circle at top left, #00c6ff, #0072ff 40%, #0d1117 80%);
    padding: 32px 16px;
    color: #fff;
}

.hero-content {
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.hero h1 {
    font-size: 2.4rem;
    margin: 0;
}

.hero p {
    margin: 0;
    opacity: 0.9;
}

#themeToggle {
    align-self: flex-start;
    margin-top: 12px;
    padding: 8px 16px;
    border-radius: 999px;
    border: none;
    background: #fff;
    color: #0072ff;
    cursor: pointer;
    font-weight: 600;
}

/* ناوبری بالا */

.top-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px;
    max-width: 960px;
    margin: 0 auto;
}

.nav-btn {
    flex: 1 1 120px;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid #30363d;
    background: #161b22;
    color: #fff;
    cursor: pointer;
    font-size: 0.9rem;
}

body.light .nav-btn {
    background: #ffffff;
    border-color: #e5e7eb;
    color: #111827;
}

.nav-btn:hover {
    border-color: var(--accent);
}

/* پنل‌ها */

main {
    flex: 1;
    max-width: 960px;
    margin: 0 auto;
    padding: 8px 16px 24px;
}

.panel {
    display: none;
    margin-top: 16px;
}

.panel.active {
    display: block;
}

.panel h2 {
    margin: 0 0 8px;
    color: var(--accent);
}

.toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;
}

.toolbar input[type="text"] {
    flex: 1;
    padding: 8px 10px;
    border-radius: 999px;
    border: 1px solid #30363d;
    background: #0d1117;
    color: #fff;
}

body.light .toolbar input[type="text"] {
    background: #ffffff;
    border-color: #d1d5db;
    color: #111827;
}

.status {
    font-size: 0.8rem;
    opacity: 0.8;
}

/* کارت‌ها */

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 12px;
}

.card {
    background: var(--card-dark);
    border-radius: 12px;
    padding: 12px;
    border: 1px solid #30363d;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

body.light .card {
    background: var(--card-light);
    border-color: #e5e7eb;
}

.card-title {
    font-weight: 600;
}

.card-meta {
    font-size: 0.8rem;
    opacity: 0.8;
}

.card-tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.75rem;
    background: rgba(0, 198, 255, 0.12);
    color: var(--accent);
}

/* هوش مصنوعی و دستیار */

.ai-box {
    margin-top: 12px;
    padding: 12px;
    border-radius: 12px;
    background: #161b22;
    border: 1px solid #30363d;
    min-height: 60px;
}

body.light .ai-box {
    background: #ffffff;
    border-color: #e5e7eb;
}

.ai-text, .assistant-text {
    font-size: 0.9rem;
    opacity: 0.9;
}

#assistantInput {
    width: 100%;
    min-height: 80px;
    margin-top: 8px;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid #30363d;
    background: #0d1117;
    color: #fff;
}

body.light #assistantInput {
    background: #ffffff;
    border-color: #d1d5db;
    color: #111827;
}

#assistantAsk {
    margin-top: 8px;
    padding: 8px 16px;
    border-radius: 999px;
    border: none;
    background: var(--accent);
    color: #0d1117;
    cursor: pointer;
    font-weight: 600;
}

/* فوتر */

.footer {
    padding: 12px 16px;
    font-size: 0.8rem;
    opacity: 0.8;
    display: flex;
    justify-content: space-between;
    max-width: 960px;
    margin: 0 auto;
}

/* واکنش‌گرا */

@media (max-width: 640px) {
    .hero-content {
        align-items: flex-start;
    }
    .footer {
        flex-direction: column;
        gap: 4px;
    }
}
