
let startConditions = {
    'initDebt'      : 0,
    'aggIntRate'    : 4.2,
    'initInv'       : 355137,
    'mrkt'          : markets['sAndP']
    // 355137
}
let timePeriod = {
    // 'startYear'     : 1984,
    'numYrs'        : 20,
    'annDbtRepay'   : 0,
    'annInv'        : 20000,
    'mrkt'          : markets['sAndP']
}

function createCase(startingConditions, thisTimePeriod, startYear) {
    let debt, inv, netWorth, yr, finalYr, netInf, intRate, thisCase, thisMarket, annInv, annRepay;
    debt = startingConditions['initDebt'];
    inv = startingConditions['initInv'];
    netWorth = inv - debt;
    yr = startYear;
    finalYr = yr + thisTimePeriod['numYrs'];
    netInf = 1;
    intRate = startConditions['aggIntRate'];
    thisCase = [];
    thisMarket = thisTimePeriod['mrkt'];
    annInv = thisTimePeriod['annInv'];
    annRepay = timePeriod['annDbtRepay'];
    restartAt = 2018;
    for (yr; yr < finalYr; yr++) {
        if (yr >= restartAt) {
            let yearsSimulated = yr - startYear;
            let yearsLeftToSimulate = thisTimePeriod['numYrs'] - yearsSimulated;
            yr = 1950; // Needs to be restructured to not be hard coded. Will cause issues with anything that doesnt have data at 1950+
            finalYr = yr + yearsLeftToSimulate;
        }
        let annInf = inflation[yr];
        let mrktChng = thisMarket[yr];
        netInf *= (100 + annInf) / 100;
        netInf = Math.round(netInf * 10000) / 10000;
        if (debt != 0) {
            debt = debt * (intRate + 100) / 100;
            debt -= annRepay;
        }
        if (debt <= 0) {
            debt = 0;
        }
        inv = inv * (100 + mrktChng) / 100;
        inv += annInv;
        netWorth = Math.round((inv - debt) * 100) / 100;
        IAnetWorth = Math.round(netWorth / netInf);
        thisCase.push(IAnetWorth);
        // console.log(`net inflation: ${netInf} | annual inflation: ${annInf} | market change: ${mrktChng}`)
    }
    return thisCase;
}

let cases = [];
for (let strtYr = 1950; strtYr <= 2017; strtYr++) {
    cases.push(createCase(startConditions, timePeriod, strtYr));
}
cases = cases.sort(function(a, b) {
    return a[a.length - 1] - b[b.length - 1];
})
function generateAvgCase(allCases) { /* NOT WORKING BUT BERGIE IS HERE SO FUCK IT WE'll BE BACK!!! */
    let net = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    let i = 0;
    let LNG = allCases[0].length;
    for (i; i < LNG; i++) {
        let thisCase = allCases[i];
        for (let j = 0; j < LNG; j++) {
            net[j] += thisCase[i];
        }
    }
    return net;
}
console.log(generateAvgCase(cases));
let bestCaseFinal = cases[cases.length - 1][cases[0].length - 1];
let worstCaseFinal = cases[0][cases[0].length - 1];
// console.log(`In the best historical case, you would have $${bestCaseFinal} by the end. In the worst historical case, you would've had $${worstCaseFinal}`);
// console.log(cases);
// console.log(createCase(startConditions, timePeriod));
