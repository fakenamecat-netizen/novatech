// داده‌های نمونهٔ داخلی (پایدار و بدون وابستگی به API بیرونی)

const sampleNews = [
    { title: "رشد سریع مدل‌های هوش مصنوعی در صنعت نرم‌افزار", source: "NovaTech تحلیل", time: "امروز" },
    { title: "سرمایه‌گذاری سنگین روی مراکز دادهٔ مخصوص AI", source: "NovaTech گزارش", time: "دیروز" },
    { title: "رقابت شدید بین غول‌های تکنولوژی در حوزهٔ کلود", source: "NovaTech بازار", time: "این هفته" },
    { title: "تمرکز جدید روی امنیت سایبری در زیرساخت‌های ابری", source: "NovaTech امنیت", time: "این هفته" },
];

const sampleCrypto = [
    { name: "Bitcoin", symbol: "BTC", price: 65000, change24h: 2.5 },
    { name: "Ethereum", symbol: "ETH", price: 3200, change24h: -1.2 },
    { name: "Solana", symbol: "SOL", price: 150, change24h: 4.1 },
    { name: "Cardano", symbol: "ADA", price: 0.45, change24h: 0.8 },
];

const sampleStocks = [
    { name: "Apple", symbol: "AAPL", price: 190, change24h: 1.1 },
    { name: "Microsoft", symbol: "MSFT", price: 340, change24h: 0.6 },
    { name: "NVIDIA", symbol: "NVDA", price: 900, change24h: 3.8 },
];

const sampleFx = [
    { pair: "EUR/USD", rate: 1.08 },
    { pair: "USD/JPY", rate: 155.2 },
    { pair: "GBP/USD", rate: 1.26 },
];

// انتخاب پنل‌ها و ناوبری

const panels = document.querySelectorAll(".panel");
const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        panels.forEach(p => p.classList.toggle("active", p.id === target));
    });
});

// حالت تاریک / روشن

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
});

// داشبورد

const dashboardGrid = document.getElementById("dashboardGrid");

function renderDashboard() {
    dashboardGrid.innerHTML = "";

    const blocks = [
        {
            title: "نمای کلی اخبار تکنولوژی",
            meta: `تعداد خبرهای نمونه: ${sampleNews.length}`,
            tag: "اخبار",
        },
        {
            title: "نمای کلی بازار کریپتو",
            meta: `تعداد ارزهای نمونه: ${sampleCrypto.length}`,
            tag: "کریپتو",
        },
        {
            title: "نمای کلی بازار سهام",
            meta: `تعداد نمادهای نمونه: ${sampleStocks.length}`,
            tag: "سهام",
        },
        {
            title: "نمای کلی نرخ ارز",
            meta: `تعداد جفت‌ارزهای نمونه: ${sampleFx.length}`,
            tag: "ارز",
        },
    ];

    blocks.forEach(b => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-title">${b.title}</div>
            <div class="card-meta">${b.meta}</div>
            <span class="card-tag">${b.tag}</span>
        `;
        dashboardGrid.appendChild(card);
    });
}

// اخبار

const newsList = document.getElementById("newsList");
const newsStatus = document.getElementById("newsStatus");
const newsSearch = document.getElementById("newsSearch");

let currentNews = [...sampleNews];

function renderNews(list) {
    newsList.innerHTML = "";
    list.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-title">${item.title}</div>
            <div class="card-meta">${item.source} • ${item.time}</div>
            <span class="card-tag">تکنولوژی</span>
        `;
        newsList.appendChild(card);
    });
}

newsSearch.addEventListener("input", () => {
    const q = newsSearch.value.trim().toLowerCase();
    const filtered = currentNews.filter(n => n.title.toLowerCase().includes(q));
    renderNews(filtered);
});

function initNews() {
    currentNews = sampleNews;
    renderNews(currentNews);
    newsStatus.textContent = "دادهٔ نمونهٔ پایدار در حال نمایش است.";
}

// کریپتو

const cryptoList = document.getElementById("cryptoList");
const cryptoStatus = document.getElementById("cryptoStatus");
const cryptoSearch = document.getElementById("cryptoSearch");

let currentCrypto = [...sampleCrypto];

function renderCrypto(list) {
    cryptoList.innerHTML = "";
    list.forEach(c => {
        const card = document.createElement("div");
        card.className = "card";
        const changeColor = c.change24h >= 0 ? "var(--accent)" : "var(--accent2)";
        card.innerHTML = `
            <div class="card-title">${c.name} (${c.symbol})</div>
            <div class="card-meta">قیمت تقریبی: ${c.price.toLocaleString()} دلار</div>
            <div class="card-meta" style="color:${changeColor}">تغییر ۲۴ ساعته: ${c.change24h.toFixed(2)}٪</div>
            <span class="card-tag">کریپتو</span>
        `;
        cryptoList.appendChild(card);
    });
}

cryptoSearch.addEventListener("input", () => {
    const q = cryptoSearch.value.trim().toLowerCase();
    const filtered = currentCrypto.filter(c =>
        c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
    );
    renderCrypto(filtered);
});

function initCrypto() {
    currentCrypto = sampleCrypto;
    renderCrypto(currentCrypto);
    cryptoStatus.textContent = "دادهٔ نمونهٔ پایدار در حال نمایش است.";
}

// سهام

const stocksList = document.getElementById("stocksList");
let currentStocks = [...sampleStocks];

function renderStocks(list) {
    stocksList.innerHTML = "";
    list.forEach(s => {
        const card = document.createElement("div");
        card.className = "card";
        const changeColor = s.change24h >= 0 ? "var(--accent)" : "var(--accent2)";
        card.innerHTML = `
            <div class="card-title">${s.name} (${s.symbol})</div>
            <div class="card-meta">قیمت تقریبی: ${s.price.toLocaleString()} دلار</div>
            <div class="card-meta" style="color:${changeColor}">تغییر ۲۴ ساعته: ${s.change24h.toFixed(2)}٪</div>
            <span class="card-tag">سهام</span>
        `;
        stocksList.appendChild(card);
    });
}

function initStocks() {
    currentStocks = sampleStocks;
    renderStocks(currentStocks);
}

// ارز

const fxList = document.getElementById("fxList");
let currentFx = [...sampleFx];

function renderFx(list) {
    fxList.innerHTML = "";
    list.forEach(f => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-title">${f.pair}</div>
            <div class="card-meta">نرخ تقریبی: ${f.rate}</div>
            <span class="card-tag">ارز</span>
        `;
        fxList.appendChild(card);
    });
}

function initFx() {
    currentFx = sampleFx;
    renderFx(currentFx);
}

// تحلیل هوش مصنوعی داخلی

const aiAnalysisBox = document.getElementById("aiAnalysis");

function generateAIAnalysis() {
    const avgCryptoChange =
        sampleCrypto.reduce((sum, c) => sum + c.change24h, 0) / sampleCrypto.length;
    const avgStockChange =
        sampleStocks.reduce((sum, s) => sum + s.change24h, 0) / sampleStocks.length;

    let moodCrypto;
    if (avgCryptoChange > 2) moodCrypto = "بازار کریپتو در وضعیت صعودی و پرریسک مثبت قرار دارد.";
    else if (avgCryptoChange > 0) moodCrypto = "بازار کریپتو کمی مثبت است و نوسان‌ها محدود اما رو به بالا هستند.";
    else if (avgCryptoChange > -2) moodCrypto = "بازار کریپتو خنثی تا کمی منفی است؛ احتیاط منطقی است.";
    else moodCrypto = "بازار کریپتو تحت فشار فروش قابل‌توجه قرار دارد.";

    let moodStocks;
    if (avgStockChange > 2) moodStocks = "بازار سهام نمونه در وضعیت رشد قابل‌توجه است.";
    else if (avgStockChange > 0) moodStocks = "بازار سهام نمونه کمی مثبت است.";
    else if (avgStockChange > -2) moodStocks = "بازار سهام نمونه تقریباً خنثی است.";
    else moodStocks = "بازار سهام نمونه تحت فشار منفی قرار دارد.";

    aiAnalysisBox.textContent =
        "بر اساس داده‌های نمونهٔ کریپتو و سهام، " +
        moodCrypto +
        " همچنین " +
        moodStocks +
        " این تحلیل صرفاً برای درک روند کلی طراحی شده و جایگزین تحقیق عمیق یا مشاورهٔ تخصصی نیست.";
}

// دستیار هوشمند داخلی

const assistantInput = document.getElementById("assistantInput");
const assistantAsk = document.getElementById("assistantAsk");
const assistantAnswer = document.getElementById("assistantAnswer");

assistantAsk.addEventListener("click", () => {
    const q = assistantInput.value.trim();
    if (!q) {
        assistantAnswer.textContent = "لطفاً ابتدا یک سؤال بنویسید.";
        return;
    }

    let reply = "سؤال شما دربارهٔ «" + q + "» ثبت شد. ";

    if (/کریپتو|بیت کوین|اتریوم|ارز دیجیتال/i.test(q)) {
        reply += "برای دید کلی از بازار کریپتو، به بخش «بازار ارز دیجیتال» نگاه کنید؛ " +
            "در آن‌جا قیمت‌ها و تغییرات نمونه نمایش داده می‌شوند و تحلیل کلی در بخش «تحلیل هوش مصنوعی» ارائه شده است.";
    } else if (/سهام|بورس|stock/i.test(q)) {
        reply += "بخش «بازار سهام (نمونه)» چند نماد مهم را نشان می‌دهد؛ " +
            "این داده‌ها برای تمرین و درک ساختار سایت مناسب‌اند، نه برای تصمیم‌گیری مالی واقعی.";
    } else if (/دلار|ارز|نرخ/i.test(q)) {
        reply += "نرخ‌های نمونهٔ ارز در بخش «نرخ ارز» نمایش داده می‌شوند و صرفاً برای دید کلی طراحی شده‌اند.";
    } else if (/هوش مصنوعی|AI|مدل/i.test(q)) {
        reply += "هوش مصنوعی در این سایت برای تحلیل سادهٔ وضعیت بازار و پاسخ‌گویی متنی داخلی استفاده شده است؛ " +
            "بدون اتصال بیرونی و کاملاً پایدار.";
    } else {
        reply += "برای این موضوع، ترکیب بخش‌های «داشبورد»، «اخبار تکنولوژی» و «تحلیل هوش مصنوعی» می‌تواند دید کلی خوبی به شما بدهد.";
    }

    assistantAnswer.textContent = reply;
});

// راه‌اندازی اولیه

renderDashboard();
initNews();
initCrypto();
initStocks();
initFx();
generateAIAnalysis();
