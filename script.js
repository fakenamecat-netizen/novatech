// دریافت اخبار تکنولوژی
fetch("https://api.codetabs.com/v1/proxy?quest=https://technewsapi.vercel.app/api/news")
    .then(res => res.json())
    .then(data => {
        const newsBox = document.getElementById("news");
        data.slice(0, 5).forEach(item => {
            newsBox.innerHTML += `<div>${item.title}</div>`;
        });
    });

// دریافت قیمت ارزهای دیجیتال
fetch("https://api.coincap.io/v2/assets")
    .then(res => res.json())
    .then(data => {
        const cryptoBox = document.getElementById("crypto");
        data.data.slice(0, 5).forEach(coin => {
            cryptoBox.innerHTML += `<div>${coin.name}: ${parseFloat(coin.priceUsd).toFixed(2)} دلار</div>`;
        });
    });
