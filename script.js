/* Exchange Rate Converter — live cross-rate engine (free endpoint, no API key) */

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const resultValue = document.getElementById('resultValue');
const rateLine = document.getElementById('rateLine');
const updatedLine = document.getElementById('updatedLine');
const swapButton = document.getElementById('swap');
const tickerTrack = document.getElementById('tickerTrack');
const panels = document.querySelectorAll('.panel');

const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
const TICKER_CURRENCIES = ['EUR', 'GBP', 'EGP', 'SAR', 'AED', 'JPY', 'KWD', 'CHF', 'CAD', 'CNY'];

let rates = null; // USD-based rates table; every pair converts through it
let countUpFrame = null;

const fmtAmount = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtRate = new Intl.NumberFormat('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
const fmtTicker = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function crossRate(from, to) {
    if (!rates || !rates[from] || !rates[to]) return null;
    return rates[to] / rates[from];
}

// ---------- count-up animation for the result ----------
function animateResult(target) {
    if (countUpFrame) cancelAnimationFrame(countUpFrame);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        resultValue.textContent = fmtAmount.format(target);
        return;
    }

    const current = parseFloat(resultValue.textContent.replace(/[^0-9.\-]/g, ''));
    const start = Number.isFinite(current) ? current : 0;
    const duration = 650;
    const t0 = performance.now();

    resultValue.classList.remove('flash');
    void resultValue.offsetWidth; // restart the flash animation
    resultValue.classList.add('flash');

    function step(now) {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        resultValue.textContent = fmtAmount.format(start + (target - start) * eased);
        if (p < 1) countUpFrame = requestAnimationFrame(step);
    }
    countUpFrame = requestAnimationFrame(step);
}

// ---------- conversion ----------
function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = parseFloat(amount.value);
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
        resultValue.textContent = '\u2014';
        rateLine.innerHTML = 'Enter an amount above zero.';
        return;
    }
    if (!rates) {
        resultValue.textContent = '\u2014';
        return;
    }

    const rate = crossRate(from, to);
    if (rate == null) {
        resultValue.textContent = '\u2014';
        rateLine.textContent = 'This pair is unavailable right now.';
        return;
    }

    animateResult(amountValue * rate);
    rateLine.innerHTML = `<b>1 ${from}</b> = <b>${fmtRate.format(rate)} ${to}</b>`;
}

// ---------- currency dropdowns ----------
function populateCurrencies(codes) {
    codes.forEach(code => {
        fromCurrency.appendChild(new Option(code, code));
        toCurrency.appendChild(new Option(code, code));
    });
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

// ---------- live ticker ----------
function buildTicker() {
    const items = TICKER_CURRENCIES
        .filter(code => rates[code])
        .map(code => `<span class="ticker-item"><b>USD/${code}</b>${fmtTicker.format(rates[code])}</span>`)
        .join('');
    tickerTrack.innerHTML = items + items; // duplicated for a seamless marquee loop
}

// ---------- load rates ----------
async function loadRates() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('bad response');
        const data = await response.json();
        rates = data.rates;

        populateCurrencies(Object.keys(rates).sort());
        buildTicker();

        if (data.time_last_updated) {
            const d = new Date(data.time_last_updated * 1000);
            updatedLine.textContent = 'Indicative rates from ExchangeRate-API, updated daily. Latest: '
                + d.toUTCString().replace('GMT', 'UTC');
        }
        convertCurrency();
    } catch (error) {
        rateLine.textContent = 'Error loading rates. Please check your connection and try again.';
        resultValue.textContent = '\u2014';
        tickerTrack.innerHTML = '<span class="ticker-item muted">Rates unavailable</span>';
    }
}

// ---------- events ----------
amount.addEventListener('input', convertCurrency);
amount.addEventListener('keydown', e => { if (e.key === 'Enter') convertCurrency(); });
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

swapButton.addEventListener('click', () => {
    const tmp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tmp;

    swapButton.classList.toggle('spun');
    panels[0].classList.remove('sliding-down');
    panels[1].classList.remove('sliding-up');
    panels[0].classList.add('sliding-up');
    panels[1].classList.add('sliding-down');
    panels.forEach(p => p.addEventListener('animationend', () => {
        p.classList.remove('sliding-up', 'sliding-down');
    }, { once: true }));

    convertCurrency();
});

loadRates();
