const apiKey = 'a195302504d3e53eb9654e25';  // Substitua pela sua chave da API

const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertButton = document.getElementById('convert');
const resultDisplay = document.getElementById('result');

// Função para obter as moedas disponíveis
async function getCurrencies() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
    const data = await response.json();
    
    if (data.result === 'success') {
        const currencies = data.supported_codes;
        
        currencies.forEach(([code, name]) => {
            const optionFrom = document.createElement('option');
            optionFrom.value = code;
            optionFrom.innerText = `${code} - ${name}`;
            fromCurrency.appendChild(optionFrom);
            
            const optionTo = document.createElement('option');
            optionTo.value = code;
            optionTo.innerText = `${code} - ${name}`;
            toCurrency.appendChild(optionTo);
        });
    }
}

// Função para converter a moeda
async function convertCurrency() {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || !from || !to) {
        alert('Preencha todos os campos!');
        return;
    }

    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
    const data = await response.json();

    if (data.result === 'success') {
        const rate = data.conversion_rates[to];
        const convertedAmount = (amount * rate).toFixed(2);
        resultDisplay.innerText = `Resultado: ${convertedAmount} ${to}`;
    } else {
        resultDisplay.innerText = 'Erro ao converter moeda';
    }
}

// Carregar as moedas ao inicializar
getCurrencies();

// Evento de conversão
convertButton.addEventListener('click', convertCurrency);
