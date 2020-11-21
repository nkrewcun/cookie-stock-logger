let bankLevel = Game.ObjectsById[5].level;
document.querySelectorAll("#bankHeader > div[id^=bankGood] > div:first-of-type > div:nth-of-type(4)").forEach((bankGood, index) => {
    let restingPriceDiv = bankGood.cloneNode(true);
    restingPriceDiv.firstChild.textContent = 'resting price: ';
    restingPriceDiv.firstElementChild.id = 'bankGood-' + index + '-resting';
    let restingPrice = index * 10 + 9 + bankLevel;
    restingPriceDiv.firstElementChild.innerHTML = '$' + restingPrice;
    bankGood.parentElement.appendChild(restingPriceDiv);

    let differenceDiv = bankGood.cloneNode();
    differenceDiv.id = 'bankGood-' + index + '-difference';
    differenceDiv.innerText = 'difference: ';
    let bankGoodValue = bankGood.firstElementChild.innerText.slice(1);
    let differencePercent = ((bankGoodValue - restingPrice) / restingPrice) * 100;
    differencePercent = Math.round((differencePercent + Number.EPSILON) * 100) / 100;
    let differencePercentSpan = document.createElement('span');
    differencePercentSpan.innerText = differencePercent + '%';
    differencePercentSpan.classList.add('bankSymbolNum');
    if (differencePercent < 0) {
        differencePercentSpan.classList.toggle('bankSymbolUp');
    } else if (differencePercent > 0) {
        differencePercentSpan.classList.toggle('bankSymbolDown');
    }
    differenceDiv.appendChild(differencePercentSpan);
    bankGood.parentElement.appendChild(differenceDiv);
});

let CerealsValueSpan = document.querySelector('#bankGood-0-val');
const observer = new MutationObserver((mutations) => {
    document.querySelectorAll("div[id^='bankGood-'][id$='-difference'] span").forEach((differenceSpan, index) => {
        let restingPrice = document.querySelector('#bankGood-' + index + '-resting').innerText.slice(1);
        let bankGoodValue = document.querySelector('#bankGood-' + index + '-val').innerText.slice(1);
        let differencePercent = ((bankGoodValue - restingPrice) / restingPrice) * 100;
        differencePercent = Math.round((differencePercent + Number.EPSILON) * 100) / 100;
        if (differencePercent < 0) {
            differenceSpan.classList.add('bankSymbolUp');
            differenceSpan.classList.remove('bankSymbolDown');
        } else if (differencePercent > 0) {
            differenceSpan.classList.add('bankSymbolDown');
            differenceSpan.classList.remove('bankSymbolUp');
        }
        differenceSpan.innerText = differencePercent + '%';
    });
});
observer.observe(CerealsValueSpan, {
    attributes: true,
    childList: true,
    characterData: true
});