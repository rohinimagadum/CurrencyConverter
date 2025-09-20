var firstCurr = document.querySelector("#currency1");
var secondCurr = document.querySelector("#currency2");
var amountInput = document.querySelector("#amount");
var convertBtn = document.querySelector("#convertBtn");
var result = document.querySelector("#result");

convertBtn.addEventListener("click", async function () {
  var amount = parseFloat(amountInput.value);
  var firstCurrValue = firstCurr.value;
  var secondCurrValue = secondCurr.value;

  if (firstCurrValue === secondCurrValue) {
    result.innerHTML = "Invalid Currency";
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    result.innerHTML = "Invalid Amount";
    return;
  }

  try {
    var exchangeRate = await getExchangeRate(firstCurrValue, secondCurrValue);
    result.innerHTML = `${amount} ${firstCurrValue} = ${(amount * exchangeRate).toFixed(2)} ${secondCurrValue}`;
  } catch (error) {
    result.innerHTML = "Error fetching exchange rate.";
  }
});

async function getExchangeRate(from, to) {
  var url = `https://api.exchangerate-api.com/v4/latest/${from}`;
  try {
    var response = await fetch(url);
    var data = await response.json();
    return data.rates[to];
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw error;
  }
}