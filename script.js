const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');
const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rateElement = document.getElementById('rate');

const calculate = function(){
    const currencyFirst = currency_one.value;
    const currencySecond = currency_two.value;
    const api = `https://v6.exchangerate-api.com/v6/530d3a39026507447f0c66ed/latest/${currencyFirst}`
    fetch(api).then((res)=>res.json()).then((data)=>{
        const rate = data.conversion_rates[currencySecond];

        rateElement.innerText = `1 ${currencyFirst} = ${rate} ${currencySecond}`
        amount_two.value = (rate * amount_one.value).toFixed(2);
    })
}

const check = ()=>{
    if(amount_one.value<0) amount_one.value = 0;
    calculate();
}

currency_one.addEventListener('change',calculate);
currency_two.addEventListener('change',calculate);
amount_one.addEventListener('input',check);
amount_two.addEventListener('input',calculate);

swap.addEventListener('click',()=>{
    let temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculate();
})

calculate();