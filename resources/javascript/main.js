// $( document ).ready(function() {
    // "use strict";

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
        avgCase = avgCase / cases.length;
        console.log(cases);
        function CAGR(start, final, years) {
            return Math.round((((Math.pow((final / start), (1/years))) - 1) * 10000), 2) / 100;
        }
        let wrstCAGR = CAGR(investment, wrst, numYears);
        let bstCAGR = CAGR(investment, bst, numYears);
        let avgCAGR = CAGR(investment, avgCase, numYears);

        console.log(`Since 1950, the worst return on a ${investment}$ investment over ${numYears} years would have resulted in ${wrst}$ (${wrstYr}). This equates to an annualized Return of %${wrstCAGR}.
        The best return would have resulted in ${bst}$ (${bstYr}), which equates to an annualized return of %${bstCAGR}.
        The average return was ${avgCase} for an average annualized return of %${avgCAGR}`);
    }

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
    worstAndBestCases(150000, 20);
    // historicalSummary(1955, 1965, 10000);


// });
