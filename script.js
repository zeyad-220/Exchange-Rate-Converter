const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertButton = document.getElementById('convert');
const resultDiv = document.getElementById('result');

const apiKey = '67f259e01c8e29c026c17c40e211bdc1'; // Replace with your API key
const apiUrl = `https://api.exchangerate-api.com/v4/latest/`; // Example API endpoint

// Populate currency dropdowns
async function populateCurrencies() {
    try {
        const response = await fetch(apiUrl + 'USD'); // Fetching rates based on USD
        const data = await response.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        // Set default values
        fromCurrency.value = 'USD';
        toCurrency.value = 'EUR';
    } catch (error) {
        resultDiv.textContent = 'Error loading currencies. Please try again later.';
    }
}

// Perform conversion
async function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amountValue = parseFloat(amount.value);

    if (!amountValue || amountValue <= 0) {
        resultDiv.textContent = 'Please enter a valid amount.';
        return;
    }

    try {
        const response = await fetch(apiUrl + from);
        const data = await response.json();
        const rate = data.rates[to];
        const convertedAmount = (amountValue * rate).toFixed(2);

        resultDiv.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        resultDiv.textContent = 'Error performing conversion. Please try again later.';
    }
}

// Event listeners
convertButton.addEventListener('click', convertCurrency);

// Initialize
populateCurrencies();
