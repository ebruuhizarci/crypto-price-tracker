const coinSelect = document.getElementById("coin");
const refreshBtn = document.getElementById("refresh");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

async function fetchPrice() {
  const coin = coinSelect.value;
  errorDiv.textContent = "";
  resultDiv.textContent = "Yükleniyor...";

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd,try`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("API isteği başarısız oldu");
    }

    const data = await res.json();
    const priceUsd = data[coin].usd;
    const priceTry = data[coin].try;

    resultDiv.textContent = `
      1 ${coin.toUpperCase()} ≈ ${priceUsd} USD | ${priceTry} TRY
    `;
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Sonuç alınamadı.";
    errorDiv.textContent = "Hata: " + err.message;
  }
}

refreshBtn.addEventListener("click", fetchPrice);

// Sayfa açılır açılmaz bir kere çalıştır
fetchPrice();
