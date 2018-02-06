// $( document ).ready(function() {
    // "use strict";

/*--- HISTORICAL DATA ---------------------------------------------------------------------------------------------------*/

    let sAndP = {
        '1950' : 31.71,
        '1951' : 24.02,
        '1952' : 18.37,
        '1953' : -0.99,
        '1954' : 52.65,
        '1955' : 31.56,
        '1956' : 6.56,
        '1957' : -10.78,
        '1958' : 43.36,
        '1959' : 11.96,
        '1960' : 0.47,
        '1961' : 26.89,
        '1962' : -8.73,
        '1963' : 22.8,
        '1964' : 16.48,
        '1965' : 12.45,
        '1966' : -10.06,
        '1967' : 23.98,
        '1968' : 11.06,
        '1969' : -8.5,
        '1970' : 4.01,
        '1971' : 14.31,
        '1972' : 18.98,
        '1973' : -14.66,
        '1974' : -26.47,
        '1975' : 37.2,
        '1976' : 23.84,
        '1977' : -7.18,
        '1978' : 6.56,
        '1979' : 18.44,
        '1980' : 32.5,
        '1981' : -4.92,
        '1982' : 21.55,
        '1983' : 22.56,
        '1984' : 6.27,
        '1985' : 31.73,
        '1986' : 18.76,
        '1987' : 5.25,
        '1988' : 16.61,
        '1989' : 31.69,
        '1990' : -3.11,
        '1991' : 30.47,
        '1992' : 7.62,
        '1993' : 10.08,
        '1994' : 1.32,
        '1995' : 37.58,
        '1996' : 22.96,
        '1997' : 33.36,
        '1998' : 28.58,
        '1999' : 21.04,
        '2000' : -9.11,
        '2001' : -11.89,
        '2002' : -22.1,
        '2003' : 28.68,
        '2004' : 10.88,
        '2005' : 4.91,
        '2006' : 15.79,
        '2007' : 5.49,
        '2008' : -37,
        '2009' : 26.46,
        '2010' : 15.06,
        '2011' : 2.11,
        '2012' : 16,
        '2013' : 32.39,
        '2014' : 13.69,
        '2015' : 1.38,
        '2016' : 11.96,
        '2017' : 21.83
    }
    let stdy7 = {
        '1950' : 7,
        '1951' : 7,
        '1952' : 7,
        '1953' : 7,
        '1954' : 7,
        '1955' : 7,
        '1956' : 7,
        '1957' : 7,
        '1958' : 7,
        '1959' : 7,
        '1960' : 7,
        '1961' : 7,
        '1962' : 7,
        '1963' : 7,
        '1964' : 7,
        '1965' : 7,
        '1966' : 7,
        '1967' : 7,
        '1968' : 7,
        '1969' : 7,
        '1970' : 7,
        '1971' : 7,
        '1972' : 7,
        '1973' : 7,
        '1974' : 7,
        '1975' : 7,
        '1976' : 7,
        '1977' : 7,
        '1978' : 7,
        '1979' : 7,
        '1980' : 7,
        '1981' : 7,
        '1982' : 7,
        '1983' : 7,
        '1984' : 7,
        '1985' : 7,
        '1986' : 7,
        '1987' : 7,
        '1988' : 7,
        '1989' : 7,
        '1990' : 7,
        '1991' : 7,
        '1992' : 7,
        '1993' : 7,
        '1994' : 7,
        '1995' : 7,
        '1996' : 7,
        '1997' : 7,
        '1998' : 7,
        '1999' : 7,
        '2000' : 7,
        '2001' : 7,
        '2002' : 7,
        '2003' : 7,
        '2004' : 7,
        '2005' : 7,
        '2006' : 7,
        '2007' : 7,
        '2008' : 7,
        '2009' : 7,
        '2010' : 7,
        '2011' : 7,
        '2012' : 7,
        '2013' : 7,
        '2014' : 7,
        '2015' : 7,
        '2016' : 7,
        '2017' : 7,
    }
    let valueOfDollar = {
        '1950' : 1.00,
        '1951' : 1.06,
        '1952' : 1.12,
        '1953' : 1.13,
        '1954' : 1.14,
        '1955' : 1.13,
        '1956' : 1.14,
        '1957' : 1.17,
        '1958' : 1.20,
        '1959' : 1.22,
        '1960' : 1.25,
        '1961' : 1.26,
        '1962' : 1.27,
        '1963' : 1.29,
        '1964' : 1.31,
        '1965' : 1.32,
        '1966' : 1.35,
        '1967' : 1.39,
        '1968' : 1.44,
        '1969' : 1.50,
        '1970' : 1.60,
        '1971' : 1.69,
        '1972' : 1.74,
        '1973' : 1.80,
        '1974' : 1.96,
        '1975' : 2.20,
        '1976' : 2.35,
        '1977' : 2.47,
        '1978' : 2.63,
        '1979' : 2.87,
        '1980' : 3.25,
        '1981' : 3.66,
        '1982' : 3.98,
        '1983' : 4.14,
        '1984' : 4.29,
        '1985' : 4.46,
        '1986' : 4.63,
        '1987' : 4.68,
        '1988' : 4.89,
        '1989' : 5.11,
        '1990' : 5.34,
        '1991' : 5.67,
        '1992' : 5.84,
        '1993' : 6.01,
        '1994' : 6.18,
        '1995' : 6.34,
        '1996' : 6.50,
        '1997' : 6.72,
        '1998' : 6.83,
        '1999' : 6.94,
        '2000' : 7.13,
        '2001' : 7.37,
        '2002' : 7.49,
        '2003' : 7.67,
        '2004' : 7.81,
        '2005' : 8.06,
        '2006' : 8.34,
        '2007' : 8.55,
        '2008' : 8.90,
        '2009' : 8.91,
        '2010' : 9.15,
        '2011' : 9.29,
        '2012' : 9.56,
        '2013' : 9.73,
        '2014' : 9.87,
        '2015' : 9.95,
        '2016' : 10.02,
        '2017' : 10.23
    }

    function adjustForInflation(curAmnt, curYr, compYr) {
        return curAmnt * (valueOfDollar[compYr] / valueOfDollar[curYr]);
    }
    // console.log(adjustForInflation(43000, 1984, 1950));


/* WITH ANNUAL CONTRIBUTIONS */
    // let curAge = 23;
    // let retAge = 50;
    // let curInv = 15000;
    let desLiv = 50000;
    let index = sAndP;

    let minInv = 50000;
    let maxInv = 2000000;
    let invStp = 50000;

    let minYrs = 5;
    let maxYrs = 50;
    let yrsStp = 5;
    // let yrsInRetirement = 30

    // Determine final balance of account starting at strtYr with $initInv, withdrawing $yrlyWithdrwl/yr for numYrs

    let cases = {};

    let inv = minInv;
    for (inv; inv <= maxInv; inv += invStp) {
        let years = minYrs;
        let successByLength = [];
        for (years; years <= maxYrs; years += yrsStp) {
            let successRate = percentHistoricalBalancesAboveZero(inv, years)
            successByLength.push(successRate);
        }
        cases[inv] = successByLength;
    }
    console.log(cases);

    function accountBalances(index, initInv, yrlyWithdrwl, strtYr, numYrs) {
        let yr = strtYr;
        let balances = [];
        let balance = initInv;
        let IAbalance;
        let IAbalances = [];
        for (yr; yr <= (strtYr + numYrs); yr++) {
            balances.push(balance);
            IAbalance = Math.floor(adjustForInflation(balance, yr, strtYr));
            if (IAbalance <= 0) {
                IAbalances.push(0);
            }
            else {
                IAbalances.push(IAbalance);
            }
            let percentChange = index[yr];
            balance = Math.floor((balance - adjustForInflation(yrlyWithdrwl, strtYr, yr)) * (100 + percentChange) / 100);
        }
        return IAbalances;
    }
    function allBalancesAboveZero(balancesArray) {
        let sortedBalances = balancesArray.sort(function(a,b) {
            return a - b;
        });
        if (sortedBalances[0] > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    function percentHistoricalBalancesAboveZero(initInv, numYrs) {
        let cases = [];
        let yr = 1950;
        for (yr; yr <= (2017 - numYrs); yr++) {
            cases.push(accountBalances(index, initInv, desLiv, yr, numYrs));
        }
        let casesAsString = cases.join('');
        let trueCases;
        if (/true/.test(casesAsString)) {
            trueCases = casesAsString.match(/true/g).length;
        }
        else {
            trueCases = 0;
        }
        let totalCases = cases.length;
        let percentage = Math.round((trueCases / totalCases) * 100);
        return cases;
        return percentage;
        // console.log(percentage);
    }
    // percentHistoricalBalancesAboveZero(300000, 50);
    // console.log(accountBalances(500000, desLiv, 1960, yrsInRetirement));



    function finalAccountBalance(initInv, yrlyWithdrwl, strtYr, numYrs) {
        let yr = strtYr;
        let balances = [];
        let balance = initInv;
        for (yr; yr < (strtYr + numYrs); yr++) {
            let percentChange = sAndP[yr];
            balance = (balance - yrlyWithdrwl) * (100 + percentChange) / 100;
            balances.push(balance);
        }
        return balance;
    }
    function minAccountBalance(initInv, yrlyWithdrwl, strtYr, numYrs) {
        let yr = strtYr;
        let balances = [];
        let balance = initInv;
        for (yr; yr < (strtYr + numYrs); yr++) {
            let percentChange = sAndP[yr];
            balance = (balance - yrlyWithdrwl) * (100 + percentChange) / 100;
            balances.push(balance);
        }
        balances.sort(function(a,b) {
            return a - b;
        })
        return balances[0];
    }



/* NO ANNUAL CONTRIBUTIONS */

    // Determine best and worst case scenerios letting money sit for X years
    function worstAndBestCases(investment, numYears) {
        function checkWorst(cur, yr) {
            if (cur < wrst) {
                wrst = cur;
                wrstYr = yr;
            }
        }
        function checkBest(cur, yr) {
            if (cur > bst) {
                bst = cur;
                bstYr = yr;
            }
        }
        let cases, i, bst, wrst, bstYr, wrstYr;
        i = 1950;
        cases = [];
        bst = -Infinity;
        wrst = Infinity;
        bstYr = 1850;
        wrstYr = 1850;
        for (i; i <= (2017 - numYears); i++) {
            let finalBalance = historicalSummary(i, (i + numYears - 1), investment);
            cases.push(finalBalance);
            checkWorst(finalBalance, i);
            checkBest(finalBalance, i);
        }
        let sortedCases = cases.sort(function(a,b) {
            return a - b;
        });
        let numCases = cases.length;
        let avgCase = cases.reduce(function(a, b) {
            return a + b;
        });
        avgCase = Math.floor(avgCase / cases.length);
        function median() {
            if (numCases % 2 === 0) {
                return cases[numCases / 2];
            }
            else {
                return cases[(numCases - 1) / 2];
            }
        }
        let medCase = median();
        // console.log(cases);
        function CAGR(start, final, years) {
            return Math.round((((Math.pow((final / start), (1/years))) - 1) * 10000), 2) / 100;
        }
        let wrstCAGR = CAGR(investment, wrst, numYears);
        let bstCAGR = CAGR(investment, bst, numYears);
        let avgCAGR = CAGR(investment, avgCase, numYears);
        let medCAGR = CAGR(investment, medCase, numYears);

        console.log(`Since 1950, the worst return on a ${investment}$ investment over ${numYears} years would have resulted in ${wrst}$ (${wrstYr}). This equates to an annualized Return of %${wrstCAGR}.
The best return would have resulted in ${bst}$ (${bstYr}), which equates to an annualized return of %${bstCAGR}.
The average return was ${avgCase} for an average annualized return of %${avgCAGR}.
The median return was ${medCase} for a median annualized return of %${medCAGR}.
*None of these values account for inflation`);
    }
    // Determine the amount of $ at endYear if initialBalance was deposited and left untouched at startYear. Also tells the low and high points through time period.
    function historicalSummary(startYear, endYear, initialBalance) {
        function checkMin(cur, yr) {
            if (cur < min) {
                min = cur;
                minYr = yr;
            }
        }
        function checkMax(cur, yr) {
            if (cur > max) {
                max = cur;
                maxYr = yr;
            }
        }
        let balance = initialBalance;
        let min = Infinity;
        let minYr = 1850;
        let max = -Infinity;
        let maxYr = 1850;
        let year = Number(startYear);
        for (year; year <= endYear; year++) {
            let thisChange = sAndP[String(year)];
            balance = Math.floor(balance * ((100 + thisChange) / 100));
            checkMin(balance, year);
            checkMax(balance, year);
            // console.log(balance);
        }
        year--;
        // console.log(`If you had invested ${initialBalance}$ in ${startYear} it would be worth ${balance} by the end of ${year}. The lowest value would have been ${min} at the end of ${minYr}. The highest value would have been ${max} at the end of ${maxYr}`)
        return balance;
    }


    // worstAndBestCases(10000, 20);
    historicalSummary(1955, 1965, 10000);
// });
