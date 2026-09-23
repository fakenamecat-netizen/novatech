// دادهٔ نمونهٔ آفلاین برای مواقعی که API کار نکند
const sampleNews = [
    { title: "رشد چشمگیر هوش مصنوعی در صنعت سلامت", source: "NovaTech", time: "امروز" },
    { title: "سرمایه‌گذاری سنگین روی پردازنده‌های مخصوص AI", source: "NovaTech", time: "امروز" },
    { title: "رقابت شدید بین غول‌های تکنولوژی در حوزهٔ کلود", source: "NovaTech", time: "دیروز" },
];

const sampleCrypto = [
    { name: "Bitcoin", symbol: "BTC", price: 65000, change24h: 2.5 },
    { name: "Ethereum", symbol: "ETH", price: 3200, change24h: -1.2 },
    { name: "Solana", symbol: "SOL", price: 150, change24h: 4.1 },
];

const sampleFx = [
    { pair: "EUR/USD", rate: 1.08 },
    { pair: "USD/JPY", rate: 155.2 },
    { pair: "GBP/USD", rate: 1.26 },
];

// انتخاب پنل‌ها
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

// نمایش اخبار (آنلاین + آفلاین)
const newsList = document.getElementById("newsList");
const newsStatus = document.getElementById("newsStatus");
const newsSearch = document.getElementById("newsSearch");

let currentNews = [];

function renderNews(list) {
    newsList.innerHTML = "";
    list.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-title">${item.title}</div>
            <div class="card-meta">${item.source || "منبع ناشناس"} • ${item.time || ""}</div>
            <span class="card-tag">تکنولوژی</span>
        `;
        newsList.appendChild(card);
    });
}

function loadNews() {
    newsStatus.textContent = "در حال دریافت اخبار زنده...";
    // نمونهٔ یک API عمومی اخبار تکنولوژی (در صورت عدم پاسخ، آفلاین می‌شود)
    fetch("https://api.codetabs.com/v1/proxy?quest=https://technewsapi.vercel.app/api/news")
        .then(res => res.json())
        .then(data => {
            currentNews = data.slice(0, 10).map(n => ({
                title: n.title,
                source: n.source || "TechNews",
                time: "لحظاتی پیش"
            }));
            renderNews(currentNews);
            newsStatus.textContent = "اخبار زنده فعال است.";
        })
        .catch(() => {
            currentNews = sampleNews;
            renderNews(currentNews);
            newsStatus.textContent = "اتصال به منبع اخبار ممکن نشد؛ نمایش دادهٔ نمونه.";
        });
}

newsSearch.addEventListener("input", () => {
    const q = newsSearch.value.trim().toLowerCase();
    const filtered = currentNews.filter(n => n.title.toLowerCase().includes(q));
    renderNews(filtered);
});

// نمایش کریپتو (آنلاین + آفلاین)
const cryptoList = document.getElementById("cryptoList");
const cryptoStatus = document.getElementById("cryptoStatus");
const cryptoSearch = document.getElementById("cryptoSearch");

let currentCrypto = [];

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

function loadCrypto() {
    cryptoStatus.textContent = "در حال دریافت بازار کریپتو...";
    // نمونهٔ API عمومی کریپتو با CORS آزاد 
    fetch("https://api.coincap.io/v2/assets?limit=10")
        .then(res => res.json())
        .then(data => {
            currentCrypto = data.data.map(c => ({
                name: c.name,
                symbol: c.symbol,
                price: parseFloat(c.priceUsd),
                change24h: parseFloat(c.changePercent24Hr)
            }));
            renderCrypto(currentCrypto);
            cryptoStatus.textContent = "دادهٔ زندهٔ کریپتو فعال است.";
        })
        .catch(() => {
            currentCrypto = sampleCrypto;
            renderCrypto(currentCrypto);
            cryptoStatus.textContent = "اتصال به بازار کریپتو ممکن نشد؛ نمایش دادهٔ نمونه.";
        });
}

cryptoSearch.addEventListener("input", () => {
    const q = cryptoSearch.value.trim().toLowerCase();
    const filtered = currentCrypto.filter(c =>
        c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
    );
    renderCrypto(filtered);
});

// نمایش نرخ ارز (آنلاین + آفلاین)
const fxList = document.getElementById("fxList");
const fxStatus = document.getElementById("fxStatus");

let currentFx = [];

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

function loadFx() {
    fxStatus.textContent = "در حال دریافت نرخ ارز...";
    // نمونهٔ API عمومی نرخ ارز با CORS آزاد (مانند Frankfurter) 
    fetch("https://api.frankfurter.app/latest?from=USD&to=EUR,JPY,GBP")
        .then(res => res.json())
        .then(data => {
            currentFx = Object.entries(data.rates).map(([code, rate]) => ({
                pair: `USD/${code}`,
                rate: rate
            }));
            renderFx(currentFx);
            fxStatus.textContent = "نرخ ارز زنده فعال است.";
        })
        .catch(() => {
            currentFx = sampleFx;
            renderFx(currentFx);
            fxStatus.textContent = "اتصال به منبع نرخ ارز ممکن نشد؛ نمایش دادهٔ نمونه.";
        });
}

// تحلیل سادهٔ هوش مصنوعی داخلی بر اساس داده‌ها
const aiAnalysisBox = document.getElementById("aiAnalysis");

function generateAIAnalysis() {
    if (!currentCrypto.length) {
        aiAnalysisBox.textContent =
            "در حال حاضر دادهٔ بازار کریپتو در دسترس نیست؛ اما می‌توانید از بخش اخبار برای دید کلی استفاده کنید.";
        return;
    }

    const avgChange = currentCrypto.reduce((sum, c) => sum + c.change24h, 0) / currentCrypto.length;
    let mood;
    if (avgChange > 2) mood = "بازار کریپتو امروز به‌طور کلی صعودی است و تمایل سرمایه‌گذاران مثبت به‌نظر می‌رسد.";
    else if (avgChange > 0) mood = "بازار کریپتو کمی مثبت است؛ نوسان‌ها محدود اما رو به بالا هستند.";
    else if (avgChange > -2) mood = "بازار در وضعیت خنثی تا کمی منفی است؛ احتیاط در تصمیم‌گیری منطقی است.";
    else mood = "بازار کریپتو امروز فشار فروش قابل‌توجهی دارد و ریسک نوسان بالا است.";

    aiAnalysisBox.textContent =
        "بر اساس میانگین تغییرات ۲۴ ساعتهٔ ارزهای اصلی، " +
        mood +
        " برای درک بهتر فضا، ترکیب اخبار تکنولوژی و وضعیت کریپتو می‌تواند تصویر کامل‌تری از روندهای جهانی ارائه دهد.";
}

// دستیار هوشمند داخلی (بدون اتصال بیرونی)
const assistantInput = document.getElementById("assistantInput");
const assistantAsk = document.getElementById("assistantAsk");
const assistantAnswer = document.getElementById("assistantAnswer");

assistantAsk.addEventListener("click", () => {
    const q = assistantInput.value.trim();
    if (!q) {
        assistantAnswer.textContent = "لطفاً ابتدا یک سؤال بنویسید.";
        return;
    }

    // پاسخ ساده بر اساس نوع سؤال (کاملاً داخلی، بدون ارتباط بیرونی)
    let reply = "سؤال شما دربارهٔ «" + q + "» ثبت شد. ";

    if (/کریپتو|بیت کوین|اتریوم|ارز دیجیتال/i.test(q)) {
        reply += "برای تحلیل بازار کریپتو، به بخش «بازار ارزهای دیجیتال» در بالا نگاه کنید؛ " +
            "در آن‌جا می‌توانید قیمت‌ها، تغییرات ۲۴ ساعته و وضعیت کلی بازار را ببینید. " +
            "همچنین تحلیل خودکار هوش مصنوعی در بخش «تحلیل هوش مصنوعی» بر اساس همین داده‌ها تولید می‌شود.";
    } else if (/دلار|ارز|نرخ/i.test(q)) {
        reply += "نرخ‌های تقریبی ارز در بخش «نرخ ارز و دلار» نمایش داده می‌شوند. " +
            "این داده‌ها برای دید کلی مناسب‌اند، اما برای تصمیم‌های مالی جدی باید از منابع رسمی استفاده کنید.";
    } else if (/هوش مصنوعی|AI|مدل/i.test(q)) {
        reply += "هوش مصنوعی در این سایت برای تحلیل وضعیت بازار و پاسخ‌گویی ساده به سؤالات استفاده می‌شود. " +
            "این تحلیل‌ها کمکی هستند و جایگزین مشاورهٔ تخصصی یا تحقیق عمیق نمی‌شوند.";
    } else {
        reply += "برای این موضوع، می‌توانید از ترکیب بخش «اخبار تکنولوژی» و «تحلیل هوش مصنوعی» استفاده کنید " +
            "تا دید کلی از روندها و تأثیر آن بر بازار و فناوری داشته باشید.";
    }

    assistantAnswer.textContent = reply;
});

// راه‌اندازی اولیه
loadNews();
loadCrypto();
loadFx();

// کمی تأخیر برای تولید تحلیل پس از دریافت کریپتو
setTimeout(generateAIAnalysis, 3000);
